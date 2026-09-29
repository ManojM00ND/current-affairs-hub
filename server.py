import http.server
import socketserver
import json
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
import os

PORT = 8000

# ============================================================
# NEWS SOURCES — Multiple date ranges
# ============================================================
NEWS_SOURCES = [
    # ===== RECENT (Today + Yesterday) =====
    {"name": "GNews-India-Today",     "url": "https://news.google.com/rss/search?q=india+current+affairs+when:1d&hl=en-IN&gl=IN&ceid=IN:en", "category": "general", "range": "recent"},
    {"name": "GNews-Politics-Today",  "url": "https://news.google.com/rss/search?q=india+parliament+policy+when:1d&hl=en-IN&gl=IN&ceid=IN:en", "category": "Polity", "range": "recent"},
    {"name": "GNews-Economy-Today",   "url": "https://news.google.com/rss/search?q=india+economy+gdp+rbi+when:1d&hl=en-IN&gl=IN&ceid=IN:en", "category": "Economy", "range": "recent"},
    {"name": "GNews-Sports-Today",    "url": "https://news.google.com/rss/search?q=india+sports+cricket+olympics+when:1d&hl=en-IN&gl=IN&ceid=IN:en", "category": "Sports", "range": "recent"},
    {"name": "GNews-Science-Today",   "url": "https://news.google.com/rss/search?q=india+isro+science+technology+when:1d&hl=en-IN&gl=IN&ceid=IN:en", "category": "Science", "range": "recent"},

    # ===== LAST WEEK =====
    {"name": "GNews-India-Week",      "url": "https://news.google.com/rss/search?q=india+current+affairs+when:7d&hl=en-IN&gl=IN&ceid=IN:en", "category": "general", "range": "recent"},
    {"name": "GNews-Awards-Week",     "url": "https://news.google.com/rss/search?q=india+award+padma+honour+when:7d&hl=en-IN&gl=IN&ceid=IN:en", "category": "Awards", "range": "recent"},

    # ===== LAST MONTH =====
    {"name": "GNews-India-Month",     "url": "https://news.google.com/rss/search?q=india+current+affairs+when:30d&hl=en-IN&gl=IN&ceid=IN:en", "category": "general", "range": "month"},
    {"name": "GNews-Polity-Month",    "url": "https://news.google.com/rss/search?q=india+parliament+bill+act+when:30d&hl=en-IN&gl=IN&ceid=IN:en", "category": "Polity", "range": "month"},
    {"name": "GNews-Economy-Month",   "url": "https://news.google.com/rss/search?q=india+economy+budget+rbi+when:30d&hl=en-IN&gl=IN&ceid=IN:en", "category": "Economy", "range": "month"},
    {"name": "GNews-Sports-Month",    "url": "https://news.google.com/rss/search?q=india+sports+medal+when:30d&hl=en-IN&gl=IN&ceid=IN:en", "category": "Sports", "range": "month"},

    # ===== LAST 3 MONTHS =====
    {"name": "GNews-India-3M",        "url": "https://news.google.com/rss/search?q=india+current+affairs+when:90d&hl=en-IN&gl=IN&ceid=IN:en", "category": "general", "range": "mid"},
    {"name": "GNews-Polity-3M",       "url": "https://news.google.com/rss/search?q=india+supreme+court+policy+when:90d&hl=en-IN&gl=IN&ceid=IN:en", "category": "Polity", "range": "mid"},

    # ===== LAST 6 MONTHS =====
    {"name": "GNews-India-6M",        "url": "https://news.google.com/rss/search?q=india+current+affairs+when:180d&hl=en-IN&gl=IN&ceid=IN:en", "category": "general", "range": "older"},
    {"name": "GNews-Polity-6M",       "url": "https://news.google.com/rss/search?q=india+supreme+court+policy+when:180d&hl=en-IN&gl=IN&ceid=IN:en", "category": "Polity", "range": "older"},
    {"name": "GNews-Awards-6M",       "url": "https://news.google.com/rss/search?q=india+award+padma+nobel+when:180d&hl=en-IN&gl=IN&ceid=IN:en", "category": "Awards", "range": "older"},
    {"name": "GNews-Science-6M",      "url": "https://news.google.com/rss/search?q=india+isro+space+mission+when:180d&hl=en-IN&gl=IN&ceid=IN:en", "category": "Science", "range": "older"},

    # ===== LAST 12 MONTHS =====
    {"name": "GNews-India-12M",       "url": "https://news.google.com/rss/search?q=india+current+affairs+when:365d&hl=en-IN&gl=IN&ceid=IN:en", "category": "general", "range": "oldest"},
    {"name": "GNews-Polity-12M",      "url": "https://news.google.com/rss/search?q=india+parliament+election+when:365d&hl=en-IN&gl=IN&ceid=IN:en", "category": "Polity", "range": "oldest"},
    {"name": "GNews-Economy-12M",     "url": "https://news.google.com/rss/search?q=india+gdp+budget+when:365d&hl=en-IN&gl=IN&ceid=IN:en", "category": "Economy", "range": "oldest"},
    {"name": "GNews-Sports-12M",      "url": "https://news.google.com/rss/search?q=india+sports+olympics+when:365d&hl=en-IN&gl=IN&ceid=IN:en", "category": "Sports", "range": "oldest"},
    {"name": "GNews-Awards-12M",      "url": "https://news.google.com/rss/search?q=india+award+honour+when:365d&hl=en-IN&gl=IN&ceid=IN:en", "category": "Awards", "range": "oldest"},

    # ===== PIB (Government Official) =====
    {"name": "PIB-India",             "url": "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3", "category": "Polity", "range": "recent"},
    {"name": "PIB-Press-Releases",    "url": "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=1", "category": "Schemes", "range": "month"},
]

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# ============================================================
# TITLE FILTER — Skip aggregator/digest/vague articles
# ============================================================
BAD_TITLE_PATTERNS = [
    "daily current affairs",
    "current affairs today",
    "current affairs -",
    "gk today",
    "gk quiz",
    "current affairs quiz",
    "current affairs questions",
    "current affairs update",
    "top headlines",
    "news headlines",
    "daily news",
    "news digest",
    "daily digest",
    "today's news",
    "todays news",
    "editorial analysis",
    "opinion:",
    "explainer:",
    "live updates",
    "live blog",
    "as it happened",
    "breaking news live",
    "watch:",
    "video:",
    "photos:",
    "in pictures",
    "5 things",
    "10 things",
    "top 10",
    "top 5",
    "weekly wrap",
    "monthly recap",
    "month in review",
    "year in review",
    "upsc",
    "ias exam",
    "ssc exam",
    "bank exam",
    "railway exam",
    "adda247",
    "jagran josh",
    "oliveboard",
    "testbook",
    "byju",
    "unacademy",
    "career power",
]


def is_good_title(title):
    """Return True only if the title looks like a specific news headline."""
    if not title:
        return False
    t = title.lower().strip()

    for bad in BAD_TITLE_PATTERNS:
        if bad in t:
            return False

    if len(t) < 25 or len(t) > 200:
        return False

    if t.count('|') >= 2 or t.count(' - ') >= 3:
        return False

    if not any(word[0].isupper() for word in title.split() if len(word) > 3):
        return False

    return True


def fetch_rss(source):
    try:
        req = urllib.request.Request(source["url"], headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=20) as resp:
            xml_bytes = resp.read()

        root = ET.fromstring(xml_bytes)
        items = root.findall(".//item")[:15]
        articles = []

        for item in items:
            title = (item.findtext("title") or "").strip()
            desc = (item.findtext("description") or "").strip()
            link = (item.findtext("link") or "").strip()
            pub = (item.findtext("pubDate") or "").strip()

            if not title:
                continue

            if not is_good_title(title):
                continue

            articles.append({
                "title": title,
                "summary": desc[:240] if desc else "Click to read full story.",
                "link": link or "#",
                "pubDate": pub,
                "source": source["name"],
                "category": source["category"],
                "range": source.get("range", "recent"),
            })

        print("  [OK] " + source["name"] + ": " + str(len(articles)) + " articles")
        return articles

    except Exception as e:
        print("  [FAIL] " + source["name"] + ": " + str(e))
        return []


class Handler(http.server.SimpleHTTPRequestHandler):

    def do_GET(self):
        print("[request] " + self.path)

        if self.path.startswith("/api/news"):
            print("[api/news] fetching all sources...")
            all_articles = []
            with ThreadPoolExecutor(max_workers=len(NEWS_SOURCES)) as pool:
                for result in pool.map(fetch_rss, NEWS_SOURCES):
                    all_articles.extend(result)

            payload = json.dumps({"articles": all_articles}).encode("utf-8")

            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(payload)
            print("[api/news] done: " + str(len(all_articles)) + " total articles")
            return

        super().do_GET()


class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with ThreadingHTTPServer(("", PORT), Handler) as httpd:
        print("=" * 60)
        print("  Current Affairs Hub is running!")
        print("  ->  http://localhost:8000")
        print("=" * 60)
        print("  Serving files from: " + os.getcwd())
        print("  RSS sources loaded: " + str(len(NEWS_SOURCES)))
        print()
        print("  Press Ctrl+C to stop")
        print("=" * 60)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Server stopped.")