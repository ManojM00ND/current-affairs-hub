"""
build_history.py — Builds history_notes.js, history_quizzes.js, history_chapter_quizzes.js
Run: python build_history.py
"""

import os
import re
import json
import random

from history_parsers import (
    find_source_files,
    parse_ancient,
    parse_medieval,
    parse_modern,
)

BASE = os.path.dirname(os.path.abspath(__file__))

# ------------------------------------------------------------------
# CHAPTER METADATA
# ------------------------------------------------------------------

CHAPTER_META = {
    1:  {"title": "Pre-Historic India",           "icon": "🪨", "subject": "Ancient History", "read": "14 min", "tags": ["Pre-History","Palaeolithic","Neolithic"]},
    2:  {"title": "Indus Valley Civilization",    "icon": "🏛️", "subject": "Ancient History", "read": "18 min", "tags": ["IVC","Harappa","Mohenjo-Daro"]},
    3:  {"title": "Vedic Period",                 "icon": "📜", "subject": "Ancient History", "read": "16 min", "tags": ["Vedas","Rigveda","Varna"]},
    4:  {"title": "Buddhism and Jainism",         "icon": "☸️", "subject": "Ancient History", "read": "18 min", "tags": ["Buddha","Mahavira","Heterodox"]},
    5:  {"title": "Mauryan Empire",               "icon": "👑", "subject": "Ancient History", "read": "18 min", "tags": ["Chandragupta","Ashoka","Kalinga"]},
    6:  {"title": "Post-Mauryan Period",          "icon": "⚔️", "subject": "Ancient History", "read": "16 min", "tags": ["Shunga","Kushana","Satavahana"]},
    7:  {"title": "Gupta Empire",                 "icon": "🌟", "subject": "Ancient History", "read": "18 min", "tags": ["Golden Age","Samudragupta","Kalidasa"]},
    8:  {"title": "Post-Gupta Period",            "icon": "🏯", "subject": "Ancient History", "read": "14 min", "tags": ["Harshavardhana","Chalukya","Pallava"]},
    9:  {"title": "Delhi Sultanate",              "icon": "🕌", "subject": "Medieval History", "read": "18 min", "tags": ["Slave","Khilji","Tughlaq","Lodi"]},
    10: {"title": "Mughal Empire",                "icon": "👑", "subject": "Medieval History", "read": "18 min", "tags": ["Babur","Akbar","Aurangzeb"]},
    11: {"title": "Maratha Empire",               "icon": "🐎", "subject": "Medieval History", "read": "16 min", "tags": ["Shivaji","Peshwa","Panipat"]},
    12: {"title": "Vijayanagara Empire",          "icon": "🏛️", "subject": "Medieval History", "read": "14 min", "tags": ["Harihara","Krishnadevaraya","Talikota"]},
    13: {"title": "Bhakti and Sufi Movements",    "icon": "🕉️", "subject": "Medieval History", "read": "14 min", "tags": ["Kabir","Nanak","Chishti"]},
    14: {"title": "Advent of Europeans",          "icon": "⛵", "subject": "Modern History", "read": "16 min", "tags": ["Portuguese","Dutch","French","British"]},
    15: {"title": "British Rule in India",        "icon": "🏛️", "subject": "Modern History", "read": "18 min", "tags": ["Plassey","Buxar","Dalhousie"]},
    16: {"title": "Revolt of 1857",               "icon": "⚔️", "subject": "Modern History", "read": "16 min", "tags": ["Mangal Pandey","Rani Lakshmibai","1857"]},
    17: {"title": "Freedom Struggle",             "icon": "🇮🇳", "subject": "Modern History", "read": "18 min", "tags": ["INC","Gandhi","Quit India"]},
    18: {"title": "Social Reformers",             "icon": "🌟", "subject": "Modern History", "read": "16 min", "tags": ["Ram Mohan Roy","Vidyasagar","Ambedkar"]},
    19: {"title": "Partition & Independence",     "icon": "🕊️", "subject": "Modern History", "read": "14 min", "tags": ["Mountbatten","Radcliffe","1947"]},
}

CHAPTER_SLUGS = {
    1:"prehistoric", 2:"ivc", 3:"vedic", 4:"buddhism-jainism",
    5:"mauryan", 6:"post-mauryan", 7:"gupta", 8:"post-gupta",
    9:"delhi-sultanate", 10:"mughal", 11:"maratha", 12:"vijayanagara", 13:"bhakti-sufi",
    14:"advent-europeans", 15:"british-rule", 16:"revolt-1857", 17:"freedom-struggle",
    18:"social-reformers", 19:"partition-independence"
}

# ------------------------------------------------------------------
# HTML CLEANERS
# ------------------------------------------------------------------

def escape(s):
    return (s.replace("&", "&amp;")
             .replace("<", "&lt;")
             .replace(">", "&gt;")
             .replace('"', "&quot;"))


def txt_to_html(text):
    lines = text.split("\n")
    out = []
    in_table = False
    table_rows = []

    def flush_table():
        nonlocal in_table, table_rows
        if not table_rows:
            return
        html_rows = []
        for i, row in enumerate(table_rows):
            tag = "th" if i == 0 else "td"
            cells = [c.strip() for c in row]
            html_rows.append("<tr>" + "".join(f"<{tag}>{c}</{tag}>" for c in cells) + "</tr>")
        out.append("<table>" + "".join(html_rows) + "</table>")
        in_table = False
        table_rows = []

    for raw in lines:
        line = raw.rstrip()
        if not line.strip():
            if in_table:
                flush_table()
            continue

        if "\t" in line and line.count("\t") >= 1:
            cells = line.split("\t")
            if len(cells) >= 2:
                in_table = True
                table_rows.append(cells)
                continue
        else:
            if in_table:
                flush_table()

        if re.match(r"^Part\s+\d+", line) or re.match(r"^CHAPTER\s+\d+", line, re.I):
            out.append(f"<h3>{escape(line)}</h3>")
        elif line.strip().startswith("Simple Understanding"):
            out.append("<div class='keybox'><b>💡 Simple Understanding:</b></div>")
        elif line.strip() in ("Remember:", "Summary", "Important Facts for SSC"):
            out.append(f"<h4>{escape(line)}</h4>")
        elif re.match(r"^\d+\.\s", line):
            out.append(f"<li>{escape(line[line.index('.')+1:].strip())}</li>")
        elif line.startswith("- ") or line.startswith("• "):
            out.append(f"<li>{escape(line[2:].strip())}</li>")
        elif line.startswith("Q") and ":" in line:
            out.append(f"<p><b>{escape(line)}</b></p>")
        elif line.startswith("Answer:"):
            out.append(f"<p><b>{escape(line)}</b></p>")
        else:
            out.append(f"<p>{escape(line)}</p>")

    if in_table:
        flush_table()

    result = "\n".join(out)
    result = re.sub(r"(<li>.*?</li>\n?)+", lambda m: "<ul>" + m.group(0) + "</ul>", result, flags=re.DOTALL)
    return result


def pdf_text_to_html(text):
    text = re.sub(r"={3,}\s*Page\s*\d+\s*={3,}", "", text)
    text = re.sub(r"\n\d+\s*\n", "\n", text)
    lines = text.split("\n")
    out = []
    in_table = False
    table_rows = []

    def flush_table():
        nonlocal in_table, table_rows
        if not table_rows:
            return
        html_rows = []
        for i, row in enumerate(table_rows):
            tag = "th" if i == 0 else "td"
            html_rows.append("<tr>" + "".join(f"<{tag}>{escape(c.strip())}</{tag}>" for c in row) + "</tr>")
        out.append("<table>" + "".join(html_rows) + "</table>")
        in_table = False
        table_rows = []

    for raw in lines:
        line = raw.rstrip()
        if not line.strip():
            if in_table:
                flush_table()
            continue

        if "|" in line:
            cells = [c.strip() for c in line.split("|")]
            in_table = True
            table_rows.append(cells)
            continue
        else:
            if in_table:
                flush_table()

        if line.startswith("## "):
            out.append(f"<h3>{escape(line[3:].strip())}</h3>")
        elif line.startswith("# "):
            out.append(f"<h3>{escape(line[2:].strip())}</h3>")
        elif re.match(r"^Part\s+\d+", line):
            out.append(f"<h3>{escape(line)}</h3>")
        elif line.strip().startswith("Simple Explanation"):
            out.append("<div class='keybox'><b>💡 Simple Explanation:</b></div>")
        elif line.strip() in ("Why Important?", "Why is this important?"):
            out.append("<h4>🎯 Why Important?</h4>")
        elif line.strip().startswith("- "):
            out.append(f"<li>{escape(line[2:].strip())}</li>")
        elif line.strip().startswith("• "):
            out.append(f"<li>{escape(line[2:].strip())}</li>")
        elif line.startswith("Q") and "." in line:
            out.append(f"<p><b>{escape(line)}</b></p>")
        elif line.startswith("Answer:"):
            out.append(f"<p><b>{escape(line)}</b></p>")
        else:
            out.append(f"<p>{escape(line)}</p>")

    if in_table:
        flush_table()

    result = "\n".join(out)
    result = re.sub(r"(<li>.*?</li>\n?)+", lambda m: "<ul>" + m.group(0) + "</ul>", result, flags=re.DOTALL)
    return result


def html_to_clean(html):
    html = re.sub(r'<div\s+class="page-footer">.*?</div>', '', html, flags=re.DOTALL)
    html = re.sub(r"<script.*?</script>", "", html, flags=re.DOTALL)
    html = re.sub(r'<div\s+class="page"[^>]*>', '', html)
    return html.strip()

# ------------------------------------------------------------------
# AUTO QUIZ GENERATOR
# ------------------------------------------------------------------

def generate_questions_from_html(html, max_q=90, seed=0):
    """Extract facts from cleaned HTML and produce MCQs."""
    rng = random.Random(seed)

    # Convert HTML to plain text line by line
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

    # -------- Pass 1: Table rows (Fact | Detail) --------
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
        if fact.lower() in ("fact", "detail", "feature", "item", "name", "year", "cause", "reason"):
            continue
        q = f"What is associated with: {fact}?"
        facts.append(("table", q, detail, f"{fact} → {detail}"))
        pools.setdefault("table", []).append(detail)

    # -------- Pass 2: Q&A pairs (Q1: ... Answer: ...) --------
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
                if len(answer) >= 2 and len(answer) <= 120:
                    facts.append(("qa", question, answer, f"{question} → {answer}"))
                    pools.setdefault("qa", []).append(answer)
                i += 2
                continue
        i += 1

    # -------- Pass 3: Sentence-based patterns --------
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
        {"regex": r"([A-Z][a-zA-Z]{1,}(?:\s+[A-Z][a-zA-Z]{1,}){0,3})\s+(?:was|were)\s+born\s+in\s+([^.\n]{3,60})",
         "q": "Where/when was {1} born?", "a": "{2}"},
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

    # -------- Dedupe --------
    seen = set()
    unique = []
    for kind, q, a, source in facts:
        key = (q, a)
        if key in seen:
            continue
        seen.add(key)
        unique.append((kind, q, a, source))

    # -------- Build MCQs --------
    all_answers = list(dict.fromkeys(f[2] for f in unique))
    questions = []

    for kind, q, correct, source in unique:
        if len(questions) >= max_q:
            break
        # Prefer same-kind pool; fall back to global pool
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
# BUILDERS
# ------------------------------------------------------------------

def build_notes(base):
    files = find_source_files(base)
    print("Source files found:")
    for k, v in files.items():
        print(f"  {k:10s} <- {v}")

    all_chapters = {}

    if files["ancient"]:
        try:
            anc = parse_ancient(os.path.join(base, files["ancient"]))
            all_chapters.update(anc)
            print(f"[ok] Ancient  : {len(anc)} chapters")
        except Exception as e:
            print(f"[fail] Ancient parse: {e}")

    if files["medieval"]:
        try:
            med = parse_medieval(os.path.join(base, files["medieval"]))
            all_chapters.update(med)
            print(f"[ok] Medieval : {len(med)} chapters")
        except Exception as e:
            print(f"[fail] Medieval parse: {e}")

    if files["modern"]:
        try:
            mod = parse_modern(os.path.join(base, files["modern"]))
            all_chapters.update(mod)
            print(f"[ok] Modern   : {len(mod)} chapters")
        except Exception as e:
            print(f"[fail] Modern parse: {e}")

    print()

    entries = []
    for n in sorted(all_chapters.keys()):
        meta = CHAPTER_META.get(n)
        if not meta:
            continue
        raw = all_chapters[n]

        if n <= 8:
            body = txt_to_html(raw["body"])
        elif n <= 13:
            body = pdf_text_to_html(raw["body"])
        else:
            body = html_to_clean(raw["body"])

        entries.append({
            "id": f"history-ch{n}",
            "subject": meta["subject"],
            "chapterNo": n,
            "title": meta["title"],
            "date": "2026-09-16",
            "readTime": meta["read"],
            "icon": meta["icon"],
            "tags": meta["tags"],
            "summary": f"Complete exam-ready guide to {meta['title']}.",
            "body": body
        })
        print(f"[ok] Ch{n:>2}: {len(body):,} chars")

    js = "/* HISTORY_NOTES.JS — auto-generated by build_history.py */\n\n"
    js += "const HISTORY_NOTES = " + json.dumps(entries, ensure_ascii=False, indent=2) + ";\n"

    out = os.path.join(base, "history_notes.js")
    with open(out, "w", encoding="utf-8") as f:
        f.write(js)
    print(f"\nOK Wrote {out} ({len(entries)} chapters)\n")


def build_quizzes(base):
    try:
        with open(os.path.join(base, "history_notes.js"), "r", encoding="utf-8") as f:
            js = f.read()
        m = re.search(r"const HISTORY_NOTES = (\[.*?\]);", js, re.DOTALL)
        notes = json.loads(m.group(1)) if m else []
    except Exception as e:
        print(f"[warn] Could not read history_notes.js: {e}")
        notes = []

    if not notes:
        print("[skip] No notes to generate quizzes from.")
        return

    obj = {}
    for note in notes:
        ch = note["chapterNo"]
        meta = CHAPTER_META.get(ch, {})
        slug = CHAPTER_SLUGS.get(ch)
        if not slug:
            continue

        all_qs = generate_questions_from_html(note["body"], max_q=90, seed=ch)
        if len(all_qs) < 3:
            print(f"[skip] Ch{ch}: only {len(all_qs)} questions")
            continue

        third = max(1, len(all_qs) // 3)
        levels = [
            ("moderate",           all_qs[:third]),
            ("moderate-difficult", all_qs[third:2*third]),
            ("difficult",          all_qs[2*third:]),
        ]

        for level, qs in levels:
            key = f"history-{slug}-{level}"
            obj[key] = {
                "title": f"{meta['title']} — {level.replace('-',' ').title()}",
                "subject": meta["subject"],
                "icon": "🟢" if level == "moderate" else ("🟡" if level == "moderate-difficult" else "🔴"),
                "chapterNo": ch,
                "level": level,
                "isAuto": True,
                "questions": qs
            }

        print(f"[auto] Ch{ch:>2} ({meta['title'][:30]}): {len(all_qs)} questions → 3 levels")

    js = "/* HISTORY_QUIZZES.JS — auto-generated by build_history.py */\n\n"
    js += "const HISTORY_QUIZ_BANK = " + json.dumps(obj, ensure_ascii=False, indent=2) + ";\n"

    out = os.path.join(base, "history_quizzes.js")
    with open(out, "w", encoding="utf-8") as f:
        f.write(js)

    total_q = sum(len(v["questions"]) for v in obj.values())
    print(f"\nOK Wrote {out} ({len(obj)} topics, {total_q} questions)\n")


def build_chapter_links(base):
    obj = {}
    for n, slug in CHAPTER_SLUGS.items():
        obj[f"history-ch{n}"] = [
            f"history-{slug}-moderate",
            f"history-{slug}-moderate-difficult",
            f"history-{slug}-difficult",
        ]

    js = "/* HISTORY_CHAPTER_QUIZZES.JS — auto-generated by build_history.py */\n\n"
    js += "const HISTORY_CHAPTER_QUIZ_TOPICS = " + json.dumps(obj, ensure_ascii=False, indent=2) + ";\n"

    out = os.path.join(base, "history_chapter_quizzes.js")
    with open(out, "w", encoding="utf-8") as f:
        f.write(js)
    print(f"OK Wrote {out} ({len(obj)} chapter->quiz links)\n")


if __name__ == "__main__":
    print("=" * 60)
    print("  Building history notes + quizzes")
    print("=" * 60)
    build_notes(BASE)
    build_quizzes(BASE)
    build_chapter_links(BASE)
    print("=" * 60)
    print("  DONE")
    print("=" * 60)