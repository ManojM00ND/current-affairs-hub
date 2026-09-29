"""
history_parsers.py — Parsers for Ancient, Medieval, Modern source files.
"""

import os
import re


def find_source_files(base):
    """Find all history source files in base folder."""
    files = {"ancient": None, "medieval": None, "modern": None}
    for fname in os.listdir(base):
        low = fname.lower()
        if "ancient" in low and low.endswith(".txt"):
            files["ancient"] = fname
        elif "medieval" in low and (low.endswith(".txt") or low.endswith(".pdf.txt")):
            files["medieval"] = fname
        elif "moder" in low and low.endswith(".html"):
            files["modern"] = fname
    return files


def parse_ancient(path):
    """Split the Ancient India txt into 8 chapters."""
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        text = f.read()
    parts = re.split(r"\n(?=CHAPTER\s+\d+\s*:)", text, flags=re.IGNORECASE)
    chapters = {}
    for part in parts:
        m = re.match(r"CHAPTER\s+(\d+)\s*:\s*(.+)", part, re.IGNORECASE)
        if not m:
            continue
        ch_num = int(m.group(1))
        ch_title = m.group(2).strip().split("\n")[0]
        body = part[m.end():].strip()
        if 1 <= ch_num <= 8:
            chapters[ch_num] = {"title": ch_title, "body": body}
    return chapters


def parse_medieval(path):
    """Split the Medieval India text into 5 chapters."""
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        text = f.read()
    text = re.sub(r"={3,}\s*Page\s*\d+\s*={3,}", "\n", text)
    parts = re.split(r"\n(?=#\s+[A-Z])", text)
    chapters = {}
    mapping = {
        "Delhi Sultanate": 9,
        "Mughal Empire": 10,
        "Maratha": 11,
        "Vijayanagara": 12,
        "Bhakti": 13,
    }
    for part in parts:
        m = re.match(r"#\s+(.+)", part)
        if not m:
            continue
        title = m.group(1).strip()
        body = part[m.end():].strip()
        if len(body) < 200:
            continue
        for key, num in mapping.items():
            if key.lower() in title.lower():
                chapters[num] = {"title": title, "body": body}
                break
    return chapters


def parse_modern(path):
    """Split the Modern India HTML into 6 chapters."""
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()

    # Find all positions of "MODERN INDIA — CHAPTER N" markers
    marker_pattern = re.compile(
        r"MODERN\s+INDIA\s*[—–\-]\s*CHAPTER\s+(\d+)",
        re.IGNORECASE
    )
    markers = []
    for m in marker_pattern.finditer(html):
        markers.append((int(m.group(1)), m.start(), m.end()))

    if not markers:
        return {}

    # Sort by position in the file
    markers.sort(key=lambda x: x[1])

    chapters = {}
    for i, (ch_num, start, end) in enumerate(markers):
        if i + 1 < len(markers):
            body_end = markers[i + 1][1]
        else:
            body_end = len(html)
        body = html[end:body_end].strip()
        target = 13 + ch_num
        if 14 <= target <= 19 and len(body) > 100:
            chapters[target] = {"title": f"Chapter {ch_num}", "body": body}

    return chapters