"""
extra_parsers.py — Parsers for Science, Geography, Economics, Current Affairs HTML files.
"""

import os
import re


def find_extra_files(base):
    """Find extra subject files in base folder."""
    files = {}
    for fname in os.listdir(base):
        low = fname.lower()
        if "science" in low and low.endswith(".html"):
            files["science"] = fname
        elif "geography" in low and low.endswith(".html"):
            files["geography"] = fname
        elif "economic" in low and low.endswith(".html"):
            files["economics"] = fname
        elif "currentaffairs" in low and low.endswith(".html"):
            files["currentaffairs"] = fname
        elif "current affairs" in low and low.endswith(".html"):
            files["currentaffairs"] = fname
    return files


def parse_sections(path):
    """
    Split an HTML file into sections using <div class="section-header"> or 
    <div class="page-header"> markers as chapter boundaries.
    Returns a dict: {chapter_num: {"title": str, "body": str}}
    """
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()

    # Split into pages first (each .page div is a physical page)
    page_pattern = re.compile(
        r'<div\s+class="page"[^>]*>(.*?)(?=<div\s+class="page"|</body>)',
        re.DOTALL
    )
    pages = page_pattern.findall(html)

    if not pages:
        # Fallback: treat whole file as one chapter
        return {1: {"title": "Chapter 1", "body": html}}

    # Group pages by section-header titles
    chapters = {}
    ch_num = 0
    current_title = None
    current_body = []

    for page in pages:
        # Find a section-header in this page
        sec_match = re.search(
            r'<div\s+class="section-header">\s*(.*?)\s*</div>',
            page, re.DOTALL
        )

        if sec_match:
            # Clean HTML from title
            title_html = sec_match.group(1)
            title = re.sub(r"<[^>]+>", "", title_html).strip()
            title = re.sub(r"^SECTION\s+\d+\s*[—\-]\s*", "", title, flags=re.IGNORECASE)

            # Start new chapter
            if current_body:
                chapters[ch_num] = {
                    "title": current_title or f"Chapter {ch_num}",
                    "body": "\n".join(current_body)
                }
            ch_num += 1
            current_title = title or f"Chapter {ch_num}"
            current_body = [page]
        else:
            if current_title is None:
                # First page without section-header: use as chapter 1
                ch_num = 1
                current_title = _guess_title(page) or "Introduction"
            current_body.append(page)

    if current_body:
        chapters[ch_num] = {
            "title": current_title or f"Chapter {ch_num}",
            "body": "\n".join(current_body)
        }

    return chapters


def _guess_title(page_html):
    """Try to find a hero h1 in the page."""
    m = re.search(r'<div\s+class="hero[^"]*">.*?<h1[^>]*>(.*?)</h1>', page_html, re.DOTALL)
    if m:
        return re.sub(r"<[^>]+>", "", m.group(1)).strip()
    return None


def html_to_clean(html):
    """Strip outer page divs, scripts, footers."""
    html = re.sub(r'<div\s+class="page-footer">.*?</div>', '', html, flags=re.DOTALL)
    html = re.sub(r'<div\s+class="page-header">.*?</div>', '', html, flags=re.DOTALL)
    html = re.sub(r"<script.*?</script>", "", html, flags=re.DOTALL)
    html = re.sub(r'<div\s+class="page"[^>]*>', '', html)
    html = re.sub(r'<div\s+class="page::before">.*?</div>', '', html, flags=re.DOTALL)
    return html.strip()