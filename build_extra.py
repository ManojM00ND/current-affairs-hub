"""
build_extra.py — Builds extra_notes.js, extra_quizzes.js, extra_chapter_quizzes.js
Covers: Science, Geography, Economics, Current Affairs

Run: python build_extra.py
"""

import os
import re
import json
import random

from extra_parsers import find_extra_files, parse_sections, html_to_clean

BASE = os.path.dirname(os.path.abspath(__file__))

# ------------------------------------------------------------------
# SUBJECT METADATA
# ------------------------------------------------------------------

SUBJECT_META = {
    "science": {
        "subject": "Science",
        "icon_prefix": "🔬",
        "chapter_offset": 100,   # to avoid clashing with history/polity IDs
        "slug": "sci",
    },
    "geography": {
        "subject": "Geography",
        "icon_prefix": "🌍",
        "chapter_offset": 200,
        "slug": "geo",
    },
    "economics": {
        "subject": "Economics",
        "icon_prefix": "💰",
        "chapter_offset": 300,
        "slug": "eco",
    },
    "currentaffairs": {
        "subject": "Current Affairs",
        "icon_prefix": "📰",
        "chapter_offset": 400,
        "slug": "ca",
    },
}

ICONS_BY_KEYWORD = {
    "biology": "🧬", "cell": "🔬", "human": "🫀", "vitamin": "💊", "disease": "🦠",
    "physics": "⚛️", "light": "💡", "sound": "🔊", "electricity": "⚡", "si unit": "📏",
    "chemistry": "🧪", "compound": "⚗️", "acid": "🧫", "gas": "💨",
    "computer": "💻", "keyboard": "⌨️", "file": "📁",
    "universe": "🌌", "solar": "☀️", "planet": "🪐", "moon": "🌙", "earth": "🌍",
    "india": "🇮🇳", "river": "🏞️", "soil": "🪨", "park": "🐅", "dam": "🌊", "mineral": "⛏️",
    "crop": "🌾", "world": "🌏", "continent": "🗺️", "ocean": "🌊",
    "basic": "📘", "national income": "📊", "banking": "🏦", "monetary": "💵",
    "planning": "📋", "budget": "📑", "reform": "🔄",
    "appointment": "👤", "award": "🏆", "sport": "🏅", "day": "📅", "book": "📚",
    "month": "🗓️", "summary": "📌",
}


def pick_icon(title, prefix):
    t = title.lower()
    for kw, icon in ICONS_BY_KEYWORD.items():
        if kw in t:
            return icon
    return prefix


# ------------------------------------------------------------------
# AUTO QUIZ GENERATOR (same logic as history)
# ------------------------------------------------------------------

def generate_questions_from_html(html, max_q=90, seed=0):
    rng = random.Random(seed)

    text = re.sub(r"<br\s*/?>", "\n", html)
    text = re.sub(r"</(p|li|h\d|div)>", ".\n", text)
    text = re.sub(r"</tr>", "\n", text)
    text = re.sub(r"<t[dh][^>]*>", " | ", text)
    text = re.sub(r"</t[dh]>", "", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"&nbsp;", " ", text)
    text = re.sub(r"&amp;", "&", text)
    text = re.sub(r"&lt;", "<", text)
    text = re.sub(r"&gt;", ">", text)
    text = re.sub(r"&#39;", "'", text)
    text = re.sub(r"&quot;", '"', text)
    text = re.sub(r"[ \t]+", " ", text)

    lines = [l.strip() for l in text.split("\n")]
    lines = [l for l in lines if l]

    facts = []
    pools = {}

    # Table rows
    for line in lines:
        if line.count("|") < 1:
            continue
        parts = [p.strip() for p in line.split("|") if p.strip()]
        if len(parts) < 2:
            continue
        fact = parts[0]
        detail = parts[1]
        if len(fact) < 4 or len(fact) > 90:
            continue
        if len(detail) < 2 or len(detail) > 120:
            continue
        if fact.lower() in ("fact", "detail", "feature", "item", "name", "year", "cause", "reason", "term", "meaning"):
            continue
        q = f"What is associated with: {fact}?"
        facts.append(("table", q, detail, f"{fact} → {detail}"))
        pools.setdefault("table", []).append(detail)

    # Q&A pairs
    i = 0
    while i < len(lines):
        line = lines[i]
        m = re.match(r"^Q\d*\s*[.:]?\s*(.{10,200}\?)", line)
        if m and i + 1 < len(lines):
            question = m.group(1).strip()
            nextline = lines[i + 1]
            am = re.match(r"^Answer\s*[.:]?\s*(.{2,120})", nextline, re.IGNORECASE)
            if am:
                answer = am.group(1).strip().rstrip(".")
                if 2 <= len(answer) <= 120:
                    facts.append(("qa", question, answer, f"{question} → {answer}"))
                    pools.setdefault("qa", []).append(answer)
                i += 2
                continue
        i += 1

    # Sentence patterns
    full_text = " ".join(lines)
    sentence_patterns = [
        {"regex": r"([A-Z][a-zA-Z]{1,}(?:\s+[A-Z][a-zA-Z]{1,}){0,3})\s+was\s+the\s+([^.\n]{5,100})",
         "q": "Who/what was {1}?", "a": "{2}"},
        {"regex": r"([A-Z][a-zA-Z]{1,}(?:\s+[A-Z][a-zA-Z]{1,}){0,3})\s+founded\s+([^.\n]{5,100})",
         "q": "Who founded {2}?", "a": "{1}"},
        {"regex": r"([A-Z][a-zA-Z]{1,}(?:\s+[A-Z][a-zA-Z]{1,}){0,3})\s+wrote\s+([^.\n]{3,80})",
         "q": "Who wrote {2}?", "a": "{1}"},
        {"regex": r"([A-Z][a-zA-Z]{1,}(?:\s+[A-Z][a-zA-Z]{1,}){0,3})\s+(?:was|were)\s+(?:called|known as)\s+([^.\n]{5,80})",
         "q": "Who was called {2}?", "a": "{1}"},
    ]
    for sent in re.split(r"(?<=[.!?])\s+", full_text):
        sent = sent.strip()
        if len(sent) < 25 or len(sent) > 350:
            continue
        for pat in sentence_patterns:
            m = re.search(pat["regex"], sent)
            if not m:
                continue
            try:
                groups = m.groups()
                q = pat["q"].format(*groups)
                a = pat["a"].format(*groups)
                if len(q) < 15 or len(a) < 2 or len(a) > 120:
                    continue
                facts.append(("sentence", q, a, sent))
                pools.setdefault("sentence", []).append(a)
            except (IndexError, KeyError):
                continue

    seen = set()
    unique = []
    for kind, q, a, source in facts:
        key = (q, a)
        if key in seen:
            continue
        seen.add(key)
        unique.append((kind, q, a, source))

    all_answers = list(dict.fromkeys(f[2] for f in unique))
    questions = []

    for kind, q, correct, source in unique:
        if len(questions) >= max_q:
            break
        pool = [x for x in pools.get(kind, []) if x != correct]
        if len(pool) < 3:
            pool = [a for a in all_answers if a != correct]
        if len(pool) < 3:
            continue
        distractors = rng.sample(pool, 3)
        options = [correct] + distractors
        rng.shuffle(options)
        questions.append({
            "q": q,
            "options": options,
            "answer": options.index(correct),
            "explain": source[:200]
        })

    return questions


# ------------------------------------------------------------------
# BUILD
# ------------------------------------------------------------------

def build_extra_notes():
    files = find_extra_files(BASE)
    print("Extra source files found:")
    for k, v in files.items():
        print(f"  {k:15s} <- {v}")
    print()

    all_entries = []

    for key in ("science", "geography", "economics", "currentaffairs"):
        if key not in files:
            print(f"[skip] {key}: no file found")
            continue

        meta = SUBJECT_META[key]
        path = os.path.join(BASE, files[key])

        try:
            chapters = parse_sections(path)
        except Exception as e:
            print(f"[fail] {key} parse: {e}")
            continue

        print(f"[ok] {key.capitalize()}: {len(chapters)} chapters")

        for ch_num, ch in sorted(chapters.items()):
            body = html_to_clean(ch["body"])
            title = ch["title"]
            offset = meta["chapter_offset"] + ch_num

            icon = pick_icon(title, meta["icon_prefix"])

            all_entries.append({
                "id": f"{meta['slug']}-ch{offset}",
                "subject": meta["subject"],
                "chapterNo": offset,
                "title": title,
                "date": "2026-09-16",
                "readTime": "15 min",
                "icon": icon,
                "tags": [meta["subject"], title[:30]],
                "summary": f"Complete exam-ready guide to {title}.",
                "body": body,
            })
            print(f"     Ch{offset:>3} ({title[:40]}): {len(body):,} chars")
        print()

    js = "/* EXTRA_NOTES.JS — auto-generated by build_extra.py */\n\n"
    js += "const EXTRA_NOTES = " + json.dumps(all_entries, ensure_ascii=False, indent=2) + ";\n"

    out = os.path.join(BASE, "extra_notes.js")
    with open(out, "w", encoding="utf-8") as f:
        f.write(js)
    print(f"OK Wrote {out} ({len(all_entries)} chapters)\n")


def build_extra_quizzes():
    try:
        with open(os.path.join(BASE, "extra_notes.js"), "r", encoding="utf-8") as f:
            js = f.read()
        m = re.search(r"const EXTRA_NOTES = (\[.*?\]);", js, re.DOTALL)
        notes = json.loads(m.group(1)) if m else []
    except Exception as e:
        print(f"[warn] Could not read extra_notes.js: {e}")
        return

    if not notes:
        print("[skip] No extra notes.")
        return

    obj = {}

    for note in notes:
        slug = note["id"].split("-")[0]
        ch_num = note["chapterNo"]
        meta = SUBJECT_META[{
            "sci": "science", "geo": "geography",
            "eco": "economics", "ca": "currentaffairs"
        }.get(slug, "science")]

        all_qs = generate_questions_from_html(note["body"], max_q=90, seed=ch_num)
        if len(all_qs) < 3:
            print(f"[skip] {note['id']}: only {len(all_qs)} questions")
            continue

        third = max(1, len(all_qs) // 3)
        levels = [
            ("moderate", all_qs[:third]),
            ("moderate-difficult", all_qs[third:2*third]),
            ("difficult", all_qs[2*third:]),
        ]

        for level, qs in levels:
            key = f"{slug}-ch{ch_num}-{level}"
            obj[key] = {
                "title": f"{note['title']} — {level.replace('-',' ').title()}",
                "subject": note["subject"],
                "icon": "🟢" if level == "moderate" else ("🟡" if level == "moderate-difficult" else "🔴"),
                "chapterNo": ch_num,
                "level": level,
                "isAuto": True,
                "questions": qs
            }

        print(f"[auto] {note['id']}: {len(all_qs)} questions → 3 levels")

    js = "/* EXTRA_QUIZZES.JS — auto-generated by build_extra.py */\n\n"
    js += "const EXTRA_QUIZ_BANK = " + json.dumps(obj, ensure_ascii=False, indent=2) + ";\n"

    out = os.path.join(BASE, "extra_quizzes.js")
    with open(out, "w", encoding="utf-8") as f:
        f.write(js)

    total_q = sum(len(v["questions"]) for v in obj.values())
    print(f"\nOK Wrote {out} ({len(obj)} topics, {total_q} questions)\n")


def build_extra_chapter_links():
    try:
        with open(os.path.join(BASE, "extra_notes.js"), "r", encoding="utf-8") as f:
            js = f.read()
        m = re.search(r"const EXTRA_NOTES = (\[.*?\]);", js, re.DOTALL)
        notes = json.loads(m.group(1)) if m else []
    except Exception:
        notes = []

    obj = {}
    for note in notes:
        slug = note["id"].split("-")[0]
        ch_num = note["chapterNo"]
        obj[note["id"]] = [
            f"{slug}-ch{ch_num}-moderate",
            f"{slug}-ch{ch_num}-moderate-difficult",
            f"{slug}-ch{ch_num}-difficult",
        ]

    js = "/* EXTRA_CHAPTER_QUIZZES.JS — auto-generated by build_extra.py */\n\n"
    js += "const EXTRA_CHAPTER_QUIZ_TOPICS = " + json.dumps(obj, ensure_ascii=False, indent=2) + ";\n"

    out = os.path.join(BASE, "extra_chapter_quizzes.js")
    with open(out, "w", encoding="utf-8") as f:
        f.write(js)
    print(f"OK Wrote {out} ({len(obj)} chapter->quiz links)\n")


if __name__ == "__main__":
    print("=" * 60)
    print("  Building extra notes + quizzes")
    print("  (Science, Geography, Economics, Current Affairs)")
    print("=" * 60)
    build_extra_notes()
    build_extra_quizzes()
    build_extra_chapter_links()
    print("=" * 60)
    print("  DONE")
    print("=" * 60)