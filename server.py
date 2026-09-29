import http.server
import socketserver
import json
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
import os

PORT = 8000

NEWS_SOURCES = [
    {"name": "Google News - India",          "url": "https://news.google.com/rss/search?q=india+current+affairs+when:1d&hl=en-IN&gl=IN&ceid=IN:en", "category": "general"},
    {"name": "Google News - Politics",       "url": "https://news.google.com/rss/search?q=india+parliament+policy+when:1d&hl=en-IN&gl=IN&ceid=IN:en",   "category": "Polity"},
    {"name": "Google News - Economy",        "url": "https://news.google.com/rss/search?q=india+economy+gdp+rbi+budget+when:1d&hl=en-IN&gl=IN&ceid=IN:en","category": "Economy"},
    {"name": "Google News - Sports",         "url": "https://news.google.com/rss/search?q=india+sports+cricket+olympics+when:1d&hl=en-IN&gl=IN&ceid=IN:en","category": "Sports"},
    {"name": "Google News - Science & Tech", "url": "https://news.google.com/rss/search?q=india+isro+science+technology+when:1d&hl=en-IN&gl=IN&ceid=IN:en","category": "Science"},
    {"name": "Google News - Awards",         "url": "https://news.google.com/rss/search?q=india+award+padma+honour+when:7d&hl=en-IN&gl=IN&ceid=IN:en",   "category": "Awards"},
    {"name": "PIB India",                    "url": "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3",                                          "category": "Polity"},
]

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"


def fetch_rss(source):
    try:
        req = urllib.request.Request(source["url"], headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=15) as resp:
            xml_bytes = resp.read()

        root = ET.fromstring(xml_bytes)
        items = root.findall(".//item")[:15]
        articles = []

        for item in items:
            title = (item.findtext("title") or "").strip()
            desc  = (item.findtext("description") or "").strip()
            link  = (item.findtext("link") or "").strip()
            pub   = (item.findtext("pubDate") or "").strip()

            if not title:
                continue

            articles.append({
                "title":    title,
                "summary":  desc[:240] if desc else "Click to read full story.",
                "link":     link or "#",
                "pubDate":  pub,
                "source":   source["name"],
                "category": source["category"],
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
        port = int(os.environ.get("PORT", 8000))
    with ThreadingHTTPServer(("0.0.0.0", port), Handler) as httpd:
        print("=" * 60)
        print("  Current Affairs Hub is running!")
                print("  ->  http://localhost:" + str(port))
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