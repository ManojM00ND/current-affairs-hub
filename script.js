/* =========================================================
   MERGE — Polity + History + Extra Subjects
   ========================================================= */

window.NOTES = []
  .concat(typeof NOTES !== 'undefined' ? NOTES : [])
  .concat(typeof HISTORY_NOTES !== 'undefined' ? HISTORY_NOTES : [])
  .concat(typeof EXTRA_NOTES !== 'undefined' ? EXTRA_NOTES : []);

window.QUIZ_BANK = Object.assign({},
  typeof QUIZ_BANK !== 'undefined' ? QUIZ_BANK : {},
  typeof HISTORY_QUIZ_BANK !== 'undefined' ? HISTORY_QUIZ_BANK : {},
  typeof EXTRA_QUIZ_BANK !== 'undefined' ? EXTRA_QUIZ_BANK : {}
);

window.CHAPTER_QUIZ_TOPICS = Object.assign({},
  typeof CHAPTER_QUIZ_TOPICS !== 'undefined' ? CHAPTER_QUIZ_TOPICS : {},
  typeof HISTORY_CHAPTER_QUIZ_TOPICS !== 'undefined' ? HISTORY_CHAPTER_QUIZ_TOPICS : {},
  typeof EXTRA_CHAPTER_QUIZ_TOPICS !== 'undefined' ? EXTRA_CHAPTER_QUIZ_TOPICS : {}
);

/* =========================================================
   1. DATA — STATIC ARTICLES, STATES, STATE NEWS
   ========================================================= */

const CATEGORIES = [
  "All", "Polity", "Economy", "Sports", "Awards", "Science",
  "International", "Judiciary", "Schemes",
  "Modern History", "Ancient History", "Medieval History",
  "Geography", "Static GK"
];

const STATES = [
  "All States",
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Odisha",
  "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh",
  "Uttarakhand", "West Bengal"
];

const STATE_NEWS = [
  { id: 101, state: "Maharashtra", title: "Justice Mahesh Chandra Tripathi Sworn in as 50th Chief Justice of Bombay High Court", category: "Judiciary", date: "2026-09-09", readTime: "3 min", summary: "Justice Mahesh Chandra Tripathi took oath as the 50th Chief Justice of the Bombay High Court at Lok Bhavan, Mumbai. Governor Jishnu Dev Varma administered the oath.", body: `<p><b>State:</b> Maharashtra</p><p><b>What happened:</b> Justice Mahesh Chandra Tripathi was sworn in as the <b>50th Chief Justice of the Bombay High Court</b> on <b>September 9, 2026</b>, at Lok Bhavan, Mumbai.</p><p><b>Who administered the oath:</b> Maharashtra Governor <b>Jishnu Dev Varma</b>.</p><div class="keybox"><b>💡 Why this matters:</b> The Bombay High Court covers Maharashtra and Goa.</div>` },
  { id: 102, state: "Gujarat", title: "72nd National Film Awards to Be Held at Ekta Nagar (Kevadia), Gujarat", category: "Awards", date: "2026-09-08", readTime: "2 min", summary: "The 72nd National Film Awards ceremony will be held at Ekta Nagar (Kevadia), Gujarat on September 22, 2026 — the first time in 72 years it is held outside Delhi.", body: `<p><b>State:</b> Gujarat</p><p><b>Where:</b> Ekta Nagar (Kevadia), Gujarat — <b>first time in 72 years outside Delhi</b>.</p><p><b>When:</b> September 22, 2026</p><p><b>Presented by:</b> President Droupadi Murmu</p>` },
  { id: 103, state: "Andhra Pradesh", title: "BRICS Sports Ministers' Meeting Held in Visakhapatnam, Andhra Pradesh", category: "Sports", date: "2026-08-23", readTime: "2 min", summary: "The BRICS Sports Ministers' Meeting was held in Visakhapatnam on August 23, 2026. The BRICS Sports Joint Declaration was adopted by consensus.", body: `<p><b>State:</b> Andhra Pradesh</p><p><b>Where:</b> Visakhapatnam</p><p><b>When:</b> August 23, 2026</p><p><b>Outcome:</b> The <b>BRICS Sports Joint Declaration</b> was adopted by consensus.</p>` },
  { id: 104, state: "Rajasthan", title: "BRICS Sports Manufacturing Conclave Proposed for Udaipur, Rajasthan", category: "Sports", date: "2026-08-23", readTime: "1 min", summary: "As part of the BRICS Sports Joint Declaration, a Sports Manufacturing Conclave is proposed for Udaipur, Rajasthan in November 2026.", body: `<p><b>State:</b> Rajasthan</p><p><b>Proposed Venue:</b> Udaipur, Rajasthan</p><p><b>Proposed Date:</b> November 2026</p>` },
  { id: 105, state: "Gujarat", title: "BRICS Traditional Sports Games 2026 Proposed for Ahmedabad, Gujarat", category: "Sports", date: "2026-08-23", readTime: "1 min", summary: "The BRICS Traditional and Indigenous Sports Games 2026 are proposed to be held in Ahmedabad, Gujarat on October 12–13, 2026.", body: `<p><b>State:</b> Gujarat</p><p><b>Proposed Venue:</b> Ahmedabad, Gujarat</p><p><b>Proposed Date:</b> October 12–13, 2026</p>` },
  { id: 106, state: "Karnataka", title: "GalaxEye, Bengaluru Startup, First Indian to Get US Patent for Satellite Imaging", category: "Science", date: "2026-09-08", readTime: "2 min", summary: "Bengaluru-based startup GalaxEye became the first Indian startup to receive a US patent for satellite imaging technology (OptoSAR capability).", body: `<p><b>State:</b> Karnataka</p><p><b>Who:</b> Bengaluru-based deep-tech startup <b>GalaxEye</b></p><p><b>What:</b> First Indian startup to receive a <b>US patent for satellite imaging technology</b>.</p>` },
  { id: 107, state: "Uttar Pradesh", title: "Allahabad High Court Judge Elevated; Justice Tripathi Moves to Bombay HC", category: "Judiciary", date: "2026-09-09", readTime: "2 min", summary: "Justice Mahesh Chandra Tripathi, previously a judge at the Allahabad High Court (Uttar Pradesh), was elevated as Chief Justice of the Bombay High Court.", body: `<p><b>State:</b> Uttar Pradesh</p><p><b>Who:</b> Justice Mahesh Chandra Tripathi</p><p><b>From:</b> Allahabad High Court</p><p><b>To:</b> Chief Justice, Bombay High Court</p>` },
  { id: 108, state: "Delhi", title: "Supreme Court Quashes NEET-UG Protest FIRs Under Article 142", category: "Judiciary", date: "2026-09-01", readTime: "2 min", summary: "The Supreme Court (New Delhi) invoked Article 142 on September 1, 2026, to quash criminal cases against Gen Z protesters linked to the NEET-UG 2026 question paper leak.", body: `<p><b>State:</b> Delhi (Supreme Court jurisdiction)</p><p><b>What:</b> The Supreme Court invoked <b>Article 142</b> to quash criminal cases.</p><p><b>When:</b> September 1, 2026</p>` },
  { id: 109, state: "Maharashtra", title: "UPI Records 24.5 Billion Transactions in August 2026 — Mumbai-Based NPCI", category: "Economy", date: "2026-09-01", readTime: "2 min", summary: "UPI processed a record 24.5 billion transactions in August 2026. UPI is operated by NPCI, headquartered in Mumbai, Maharashtra.", body: `<p><b>State:</b> Maharashtra (NPCI HQ — Mumbai)</p><p><b>Transactions:</b> <b>24.5 billion</b> in August 2026</p><p><b>Value:</b> <b>₹29.8 lakh crore</b></p>` },
  { id: 110, state: "Kerala", title: "Kerala Tops NITI Aayog's SDG India Index 2024-25", category: "Schemes", date: "2026-07-15", readTime: "2 min", summary: "Kerala retained the top spot in NITI Aayog's SDG India Index with a score of 79, followed by Uttarakhand and Tamil Nadu.", body: `<p><b>State:</b> Kerala</p><p><b>Ranking:</b> 1st in NITI Aayog's SDG India Index 2024-25</p><p><b>Score:</b> 79</p>` }
];

const ARTICLES = [
  { id: 1, title: "Justice Mahesh Chandra Tripathi Sworn in as 50th Chief Justice of Bombay High Court", category: "Judiciary", date: "2026-09-09", readTime: "3 min", summary: "Justice Mahesh Chandra Tripathi took oath as the 50th Chief Justice of the Bombay High Court at Lok Bhavan, Mumbai.", body: `<p>Justice Mahesh Chandra Tripathi was sworn in as the <b>50th Chief Justice of the Bombay High Court</b> on <b>September 9, 2026</b>.</p>` },
  { id: 2, title: "Cabinet Approves ₹29,054 Crore for Khelo India — Target Top-10 at 2036 Olympics", category: "Schemes", date: "2026-08-28", readTime: "2 min", summary: "The Union Cabinet approved ₹29,054 crore for the new phase of the Khelo India Scheme.", body: `<p>The Union Cabinet approved <b>₹29,054 crore</b> for <b>Khelo India Scheme</b>.</p>` },
  { id: 3, title: "India's GDP Grows 7.8% in Q1 FY 2026-27", category: "Economy", date: "2026-08-31", readTime: "2 min", summary: "India recorded 7.8% real GDP growth in Q1 FY 2026-27.", body: `<p><b>Real GDP Growth:</b> <b>7.8%</b> in Q1 FY 2026-27.</p>` },
  { id: 4, title: "UPI Records 24.5 Billion Transactions in August 2026", category: "Economy", date: "2026-09-01", readTime: "2 min", summary: "UPI processed a record 24.5 billion transactions in August 2026, worth ₹29.8 lakh crore.", body: `<p><b>Transactions:</b> <b>24.5 billion</b>, worth <b>₹29.8 lakh crore</b>.</p>` },
  { id: 5, title: "Deepak Dhar Wins 2026 Dirac Medal", category: "Awards", date: "2026-08-15", readTime: "2 min", summary: "Indian theoretical physicist Deepak Dhar won the 2026 Dirac Medal.", body: `<p>Indian physicist <b>Deepak Dhar</b> won the <b>2026 Dirac Medal</b>.</p>` }
];

/* =========================================================
   2. APP LOGIC
   ========================================================= */

const app = document.getElementById('app');
const themeBtn = document.getElementById('themeBtn');
const widthBtn = document.getElementById('widthBtn');

function initTheme() {
  const saved = localStorage.getItem('ca-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  themeBtn.textContent = saved === 'dark' ? '☀️' : '🌙';
}
themeBtn.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ca-theme', next);
  themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
});
initTheme();

function initWidth() {
  const mode = localStorage.getItem('ca-width') || 'wide';
  document.documentElement.setAttribute('data-width', mode);
  widthBtn.textContent = mode === 'wide' ? '↔️' : '⬛';
}
widthBtn.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-width');
  const next = cur === 'wide' ? 'centered' : 'wide';
  document.documentElement.setAttribute('data-width', next);
  localStorage.setItem('ca-width', next);
  widthBtn.textContent = next === 'wide' ? '↔️' : '⬛';
});
initWidth();

function go(hash) { location.hash = hash; }
window.go = go;

function parseRoute() {
  const h = location.hash.replace(/^#/, '') || '/';
  const parts = h.split('/').filter(Boolean);
  return { path: '/' + parts.join('/'), parts };
}

function setActiveNav(path) {
  document.querySelectorAll('.nav-links a').forEach(a => {
    const r = a.getAttribute('data-route');
    const active = (r === '/' && path === '/') || (r !== '/' && path.startsWith(r));
    a.classList.toggle('active', active);
  });
}

function fmtDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}
function highlight(text, term) {
  if (!term) return esc(text);
  const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escaped = esc(text);
  const regex = new RegExp('(' + safeTerm + ')', 'gi');
  return escaped.replace(regex, '<mark>$1</mark>');
}
function getSnippet(bodyText, term, maxLen) {
  maxLen = maxLen || 160;
  if (!term) return bodyText.slice(0, maxLen) + '...';
  const idx = bodyText.toLowerCase().indexOf(term.toLowerCase());
  if (idx === -1) return bodyText.slice(0, maxLen) + '...';
  const start = Math.max(0, idx - 50);
  const end = Math.min(bodyText.length, idx + term.length + 100);
  let snippet = bodyText.slice(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < bodyText.length) snippet = snippet + '...';
  return snippet;
}

/* ============ HOME ============ */
function renderHome() {
  const recentState = STATE_NEWS.slice().sort((a,b) => b.date.localeCompare(a.date)).slice(0, 4);
  const notesCount = (typeof NOTES !== 'undefined') ? NOTES.length : 0;
  const quizTotal = (typeof QUIZ_BANK !== 'undefined')
    ? Object.values(QUIZ_BANK).reduce((s,t) => s + (t.questions||[]).length, 0)
    : 0;

  app.innerHTML = `
    <section class="hero fade">
      <h1>📘 Current Affairs Hub</h1>
      <p>Daily news, state-wise updates, in-depth articles and interactive quizzes — everything you need for SSC, UPSC, Banking and State exams.</p>
      <div class="hero-stats">
        <div class="hero-stat"><b>${notesCount}</b><span>Chapters</span></div>
        <div class="hero-stat"><b>${STATES.length - 1}</b><span>States</span></div>
        <div class="hero-stat"><b>${quizTotal}</b><span>Questions</span></div>
        <div class="hero-stat"><b>8</b><span>Subjects</span></div>
      </div>
    </section>

    ${notesCount ? `
      <div class="sec-head">
        <div class="icon">📖</div>
        <h2>Study Notes</h2>
        <div class="line"></div>
        <button class="btn btn-ghost" onclick="go('#/notes')">View All →</button>
      </div>
      <div class="grid">${NOTES.slice(0, 4).map(noteCard).join('')}</div>
    ` : ''}

    ${quizTotal ? `
      <div class="sec-head" style="margin-top:36px;">
        <div class="icon">📝</div>
        <h2>Daily Quiz</h2>
        <div class="line"></div>
        <button class="btn btn-ghost" onclick="go('#/quiz')">All Quizzes →</button>
      </div>
      <section class="quiz-shell" style="max-width:none; margin-bottom:26px;">
        <div class="quiz-top">
          <h2>🎲 Mixed Quiz — All Subjects</h2>
          <span class="badge">${quizTotal} Questions</span>
        </div>
        <p style="color:var(--text-soft); margin-bottom:16px;">Fresh random questions every time. Answers shuffled.</p>
        <button class="btn btn-primary" onclick="go('#/quiz')">Start Quiz →</button>
      </section>
    ` : ''}

    <div class="sec-head" style="margin-top:36px;">
      <div class="icon">🗺️</div>
      <h2>State Current Affairs</h2>
      <div class="line"></div>
      <button class="btn btn-ghost" onclick="go('#/states')">View All →</button>
    </div>

    <div class="grid">${recentState.map(stateCard).join('')}</div>
  `;
}

function articleCard(a) {
  return `<article class="card fade" onclick="go('#/article/${a.id}')"><span class="cat">${esc(a.category)}</span><h3>${esc(a.title)}</h3><p>${esc(a.summary)}</p><div class="meta"><span>📅 ${fmtDate(a.date)}</span><span>⏱️ ${esc(a.readTime)}</span></div></article>`;
}

function stateCard(a) {
  return `<article class="card state-card fade" onclick="go('#/state-article/${a.id}')"><span class="state-badge">📍 ${esc(a.state)}</span><span class="cat">${esc(a.category)}</span><h3>${esc(a.title)}</h3><p>${esc(a.summary)}</p><div class="meta"><span>📅 ${fmtDate(a.date)}</span><span>⏱️ ${esc(a.readTime)}</span></div></article>`;
}

/* ============ ARTICLES ============ */
let activeCat = 'All';
let searchTerm = '';

function renderArticles() {
  app.innerHTML = `
    <div class="sec-head"><div class="icon">📚</div><h2>All Articles</h2><div class="line"></div></div>
    <div class="searchbar"><span>🔍</span><input type="text" id="searchInput" placeholder="Search articles..." value="${esc(searchTerm)}"></div>
    <div class="chips" id="chipRow">${CATEGORIES.map(c => `<button class="chip ${c===activeCat?'active':''}" data-cat="${c}">${c}</button>`).join('')}</div>
    <div class="grid" id="articleGrid"></div>
  `;
  document.getElementById('searchInput').addEventListener('input', e => { searchTerm = e.target.value; paintArticles(); });
  document.querySelectorAll('#chipRow .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      activeCat = chip.getAttribute('data-cat');
      document.querySelectorAll('#chipRow .chip').forEach(c => c.classList.toggle('active', c === chip));
      paintArticles();
    });
  });
  paintArticles();
}

function paintArticles() {
  const grid = document.getElementById('articleGrid');
  if (!grid) return;
  const term = searchTerm.trim().toLowerCase();
  const list = ARTICLES.filter(a => {
    const catOk = activeCat === 'All' || a.category === activeCat;
    const termOk = !term || a.title.toLowerCase().includes(term) || a.summary.toLowerCase().includes(term);
    return catOk && termOk;
  }).sort((a,b) => b.date.localeCompare(a.date));
  grid.innerHTML = list.length ? list.map(articleCard).join('') : `<div class="empty" style="grid-column:1/-1;"><div class="big">🔍</div><p>No articles found.</p></div>`;
}

/* ============ STUDY NOTES ============ */
function renderNotes() {
  if (typeof NOTES === 'undefined' || !NOTES.length) {
    app.innerHTML = `<div class="empty"><div class="big">📭</div><p>No notes loaded.</p></div>`;
    return;
  }
  const SUBJECTS = [
    { label: '📚 All',              match: () => true },
    { label: '🏛️ Polity',           match: n => n.subject === 'Polity' },
    { label: '🪨 Ancient History',  match: n => n.subject === 'Ancient History' },
    { label: '🕌 Medieval History', match: n => n.subject === 'Medieval History' },
    { label: '🇮🇳 Modern History',   match: n => n.subject === 'Modern History' },
    { label: '🔬 Science',          match: n => n.subject === 'Science' },
    { label: '🌍 Geography',        match: n => n.subject === 'Geography' },
    { label: '💰 Economics',        match: n => n.subject === 'Economics' },
    { label: '📰 Current Affairs',  match: n => n.subject === 'Current Affairs' },
  ];
  app.innerHTML = `
    <div class="sec-head"><div class="icon">📖</div><h2>Study Notes</h2><div class="line"></div><span style="font-size:12px; color:var(--text-soft);">${NOTES.length} chapters total</span></div>
    <p style="color:var(--text-soft); margin-bottom:18px; font-size:14.5px;">Complete, exam-ready chapter notes — colorful, well-structured, and printable as PDF.</p>
    ${SUBJECTS.map(s => {
      const list = NOTES.filter(s.match);
      if (!list.length) return '';
      return `<div style="margin-bottom:32px;"><div class="sec-head"><div class="icon">${s.label.split(' ')[0]}</div><h2>${s.label.split(' ').slice(1).join(' ')}</h2><div class="line"></div><span style="font-size:12px; color:var(--text-soft);">${list.length} chapters</span></div><div class="grid">${list.map(noteCard).join('')}</div></div>`;
    }).join('')}
  `;
}
window.renderNotes = renderNotes;

function noteCard(n) {
  const icon = n.icon || '📘';
  const tags = Array.isArray(n.tags) ? n.tags.slice(0, 3) : [];
  return `<article class="card note-card fade" onclick="go('#/note/${n.id}')"><div class="note-card-head"><div class="note-icon">${icon}</div><div><span class="cat">${esc(n.subject || 'Notes')}</span><span class="chap-no">Ch. ${n.chapterNo || '-'}</span></div></div><h3>${esc(n.title || 'Untitled')}</h3><p>${esc(n.summary || '')}</p><div class="meta"><span>📅 ${fmtDate(n.date || new Date().toISOString().slice(0, 10))}</span><span>⏱️ ${esc(n.readTime || '15 min')}</span></div>${tags.length ? `<div class="note-tags">${tags.map(t => `<span class="note-tag">#${esc(t)}</span>`).join('')}</div>` : ''}</article>`;
}

function renderNote(id) {
  if (typeof NOTES === 'undefined') { app.innerHTML = `<div class="empty"><div class="big">😕</div><p>Notes not loaded.</p></div>`; return; }
  const n = NOTES.find(x => x.id === id);
  if (!n) { app.innerHTML = `<div class="empty"><div class="big">😕</div><p>Note not found.</p></div>`; return; }
  const quizKeys = findQuizKeysForNote(n.id);
  let quizBtn = '';
  if (quizKeys.length === 0) { quizBtn = `<button class="btn btn-ghost" onclick="go('#/quiz')">📝 All Quizzes</button>`; }
  else if (quizKeys.length === 1) { quizBtn = `<button class="btn btn-primary" onclick="startTopicQuiz('${quizKeys[0]}')">📝 Take Chapter Quiz</button>`; }
  else { const labels = ['🟢 Moderate', '🟡 Moderate → Difficult', '🔴 Difficult']; quizBtn = quizKeys.map((key, i) => `<button class="btn btn-primary" onclick="startTopicQuiz('${key}')">${labels[i] || '📝 Quiz ' + (i+1)}</button>`).join(' '); }
  app.innerHTML = `
    <button class="back-btn" onclick="history.back()">← Back</button>
    <article class="article-view note-view fade">
      <span class="cat">${esc(n.subject || 'Notes')} · Chapter ${n.chapterNo || '-'}</span>
      <h1>${esc(n.title)}</h1>
      <div class="meta"><span>📅 ${fmtDate(n.date || new Date().toISOString().slice(0, 10))}</span><span>⏱️ ${esc(n.readTime || '15 min')}</span><span>🏷️ ${esc(n.subject || 'Notes')}</span></div>
      <div class="body note-body">${n.body || ''}</div>
      <div class="note-actions"><button class="btn btn-primary" onclick="printNote('${n.id}')">🖨️ Print / Save as PDF</button>${quizBtn}<button class="btn btn-ghost" onclick="go('#/notes')">📚 All Notes</button></div>
    </article>
  `;
}
window.renderNote = renderNote;

function printNote(id) {
  if (typeof NOTES === 'undefined') return;
  const n = NOTES.find(x => x.id === id);
  if (!n) return;
  const win = window.open('', '_blank');
  if (!win) { showToast('Popup blocked.', 'error'); return; }
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${esc(n.title)}</title><style>body{font-family:Arial;padding:20px;line-height:1.6;}h1{color:#6D28D9;}h3{color:#6D28D9;border-bottom:2px solid #EDE9FE;padding-bottom:4px;}table{width:100%;border-collapse:collapse;margin:12px 0;}th{background:#1E3A8A;color:#fff;padding:8px 12px;text-align:left;}td{padding:8px 12px;border-bottom:1px solid #E5E7EB;}tr:nth-child(even) td{background:#F9FAFB;}.keybox{background:#FEF3C7;border-left:6px solid #F59E0B;padding:14px 18px;border-radius:10px;margin:12px 0;}</style></head><body><h1>📘 ${esc(n.title)}</h1><h2 style="color:#6D28D9;">${esc(n.subject || 'Notes')} · Chapter ${n.chapterNo || '-'}</h2>${n.body || ''}</body></html>`);
  win.document.close();
  win.onload = () => setTimeout(() => { try { win.focus(); win.print(); } catch(e) {} }, 500);
}
window.printNote = printNote;

/* ============ STATES ============ */
let activeState = 'All States';

function renderStates() {
  app.innerHTML = `
    <div class="sec-head"><div class="icon">🗺️</div><h2>State Current Affairs</h2><div class="line"></div></div>
    <div class="chips" id="stateChipRow">${STATES.map(s => `<button class="chip state-chip ${s===activeState?'active':''}" data-state="${s}">${s}</button>`).join('')}</div>
    <div class="results-count" id="stateCount"></div>
    <div class="grid" id="stateGrid"></div>
  `;
  document.querySelectorAll('#stateChipRow .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      activeState = chip.getAttribute('data-state');
      document.querySelectorAll('#stateChipRow .chip').forEach(c => c.classList.toggle('active', c === chip));
      paintStates();
    });
  });
  paintStates();
}

function paintStates() {
  const grid = document.getElementById('stateGrid');
  const count = document.getElementById('stateCount');
  if (!grid) return;
  const list = STATE_NEWS.filter(a => activeState === 'All States' || a.state === activeState).sort((a,b) => b.date.localeCompare(a.date));
  if (count) count.innerHTML = `Showing <b>${list.length}</b> article${list.length !== 1 ? 's' : ''} for <b>${esc(activeState)}</b>`;
  grid.innerHTML = list.length ? list.map(stateCard).join('') : `<div class="empty" style="grid-column:1/-1;"><div class="big">🗺️</div><p>No news for "${esc(activeState)}".</p></div>`;
}

function renderStateArticle(id) {
  const a = STATE_NEWS.find(x => x.id === id);
  if (!a) { app.innerHTML = `<div class="empty"><div class="big">😕</div><p>Not found.</p></div>`; return; }
  app.innerHTML = `<button class="back-btn" onclick="history.back()">← Back</button><article class="article-view fade"><span class="state-badge big">📍 ${esc(a.state)}</span><span class="cat">${esc(a.category)}</span><h1>${esc(a.title)}</h1><div class="meta"><span>📅 ${fmtDate(a.date)}</span><span>⏱️ ${esc(a.readTime)}</span></div><div class="body">${a.body}</div></article>`;
}

function renderArticle(id) {
  const a = ARTICLES.find(x => x.id === id);
  if (!a) { app.innerHTML = `<div class="empty"><div class="big">😕</div><p>Not found.</p></div>`; return; }
  app.innerHTML = `<button class="back-btn" onclick="history.back()">← Back</button><article class="article-view fade"><span class="cat">${esc(a.category)}</span><h1>${esc(a.title)}</h1><div class="meta"><span>📅 ${fmtDate(a.date)}</span><span>⏱️ ${esc(a.readTime)}</span></div><div class="body">${a.body}</div></article>`;
}

/* ============ SEARCH ============ */
let globalSearchTerm = '';
const POPULAR_SEARCHES = ["Khelo India", "Article 142", "UPI", "GDP", "Preamble", "Ambedkar"];

function renderSearch() {
  app.innerHTML = `
    <div class="sec-head"><div class="icon">🔍</div><h2>Search Topics</h2><div class="line"></div></div>
    <div class="search-hero fade">
      <div class="search-big"><span>🔍</span><input type="text" id="bigSearch" placeholder="Type any topic..." value="${esc(globalSearchTerm)}" autofocus><button class="clear-btn" id="clearSearch" style="display:${globalSearchTerm?'grid':'none'}">✕</button></div>
      <div class="popular-searches"><span class="label">Popular:</span>${POPULAR_SEARCHES.map(s => `<button class="popular-chip" data-term="${esc(s)}">${esc(s)}</button>`).join('')}</div>
    </div>
    <div id="searchResults"></div>
  `;
  const input = document.getElementById('bigSearch');
  const clearBtn = document.getElementById('clearSearch');
  input.addEventListener('input', e => { globalSearchTerm = e.target.value; clearBtn.style.display = globalSearchTerm ? 'grid' : 'none'; paintSearchResults(); });
  clearBtn.addEventListener('click', () => { globalSearchTerm = ''; input.value = ''; clearBtn.style.display = 'none'; paintSearchResults(); input.focus(); });
  document.querySelectorAll('.popular-chip').forEach(chip => {
    chip.addEventListener('click', () => { globalSearchTerm = chip.getAttribute('data-term'); input.value = globalSearchTerm; clearBtn.style.display = 'grid'; paintSearchResults(); });
  });
  paintSearchResults();
  setTimeout(() => input.focus(), 50);
}

function paintSearchResults() {
  const container = document.getElementById('searchResults');
  if (!container) return;
  const term = globalSearchTerm.trim().toLowerCase();
  if (!term) { container.innerHTML = `<div class="empty"><div class="big">🔍</div><p>Start typing to search.</p></div>`; return; }
  const notesList = (typeof NOTES !== 'undefined' ? NOTES : []).map(n => ({ id: n.id, title: n.title, category: n.subject || 'Notes', date: n.date, readTime: n.readTime, summary: n.summary, body: n.body, _kind: 'note' }));
  const allItems = [...ARTICLES.map(a => ({ ...a, _kind: 'article' })), ...STATE_NEWS.map(a => ({ ...a, _kind: 'state' })), ...notesList];
  const results = allItems.filter(a => {
    const bodyText = stripHtml(a.body || '').toLowerCase();
    return (a.title || '').toLowerCase().includes(term) || (a.category || '').toLowerCase().includes(term) || (a.summary || '').toLowerCase().includes(term) || bodyText.includes(term);
  }).sort((a,b) => (b.date || '').localeCompare(a.date || ''));
  if (!results.length) { container.innerHTML = `<div class="empty"><div class="big">😕</div><p>No results for "${esc(globalSearchTerm)}".</p></div>`; return; }
  container.innerHTML = `<div class="results-count">Found <b>${results.length}</b> result${results.length > 1 ? 's' : ''}</div>${results.map(a => {
    const bodyText = stripHtml(a.body || '');
    const snippet = getSnippet(bodyText, globalSearchTerm);
    const link = a._kind === 'state' ? `#/state-article/${a.id}` : a._kind === 'note' ? `#/note/${a.id}` : `#/article/${a.id}`;
    return `<div class="search-result fade" onclick="go('${link}')"><span class="cat">${esc(a.category)}</span><h3>${highlight(a.title, globalSearchTerm)}</h3><p>${highlight(a.summary, globalSearchTerm)}</p><div class="snippet">${highlight(snippet, globalSearchTerm)}</div></div>`;
  }).join('')}`;
}

/* =========================================================
   3. QUIZ ENGINE
   ========================================================= */

let quizState = null;

function qShuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleQuestionOptions(q) {
  const correctText = q.options[q.answer];
  const shuffled = qShuffle(q.options);
  return { ...q, options: shuffled, answer: shuffled.indexOf(correctText) };
}

function getAllQuizBankQuestions() {
  if (typeof QUIZ_BANK === 'undefined') return [];
  const all = [];
  Object.entries(QUIZ_BANK).forEach(([topicKey, topic]) => {
    (topic.questions || []).forEach(q => all.push({ ...q, _topic: topicKey, _topicTitle: topic.title }));
  });
  return all;
}

function buildMixedQuiz(count = 15) {
  const pool = getAllQuizBankQuestions();
  if (!pool.length) return null;
  const shuffled = qShuffle(pool).slice(0, count);
  return { id: 'mixed-' + Date.now(), title: '🎲 Mixed Quiz — All Subjects', isMixed: true, questions: shuffled.map(shuffleQuestionOptions) };
}

function buildTopicQuiz(topicKey) {
  if (typeof QUIZ_BANK === 'undefined' || !QUIZ_BANK[topicKey]) return null;
  const topic = QUIZ_BANK[topicKey];
  return { id: 'topic-' + topicKey + '-' + Date.now(), title: (topic.icon || '📝') + ' ' + topic.title, topicKey, level: topic.level || 'moderate', questions: qShuffle(topic.questions).map(shuffleQuestionOptions) };
}

function findQuizKeysForNote(noteId) {
  if (typeof CHAPTER_QUIZ_TOPICS === 'undefined') return [];
  const val = CHAPTER_QUIZ_TOPICS[noteId];
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
}

function renderQuiz() {
  const topics = (typeof QUIZ_BANK !== 'undefined') ? Object.entries(QUIZ_BANK) : [];
  const totalQ = topics.reduce((s, [,t]) => s + (t.questions || []).length, 0);
  const levelColors = {
    'moderate':           { bg: 'linear-gradient(135deg,#10b981,#059669)', label: '🟢 Moderate' },
    'moderate-difficult': { bg: 'linear-gradient(135deg,#f59e0b,#d97706)', label: '🟡 Moderate → Difficult' },
    'difficult':          { bg: 'linear-gradient(135deg,#ef4444,#b91c1c)', label: '🔴 Difficult' }
  };
  const SUBJECTS = [
    { key: 'polity',    label: 'Polity',              icon: '🏛️', color: '#7c3aed', match: k => k.startsWith('polity-'), labelFor: ch => `Chapter ${ch}` },
    { key: 'ancient',   label: 'Ancient History',     icon: '🪨', color: '#b45309', match: k => k.startsWith('history-') && QUIZ_BANK[k] && [1,2,3,4,5,6,7,8].includes(QUIZ_BANK[k].chapterNo), labelFor: ch => `Chapter ${ch}` },
    { key: 'medieval',  label: 'Medieval History',    icon: '🕌', color: '#0891b2', match: k => k.startsWith('history-') && QUIZ_BANK[k] && [9,10,11,12,13].includes(QUIZ_BANK[k].chapterNo), labelFor: ch => `Chapter ${ch}` },
    { key: 'modern',    label: 'Modern History',      icon: '🇮🇳', color: '#dc2626', match: k => k.startsWith('history-') && QUIZ_BANK[k] && [14,15,16,17,18,19].includes(QUIZ_BANK[k].chapterNo), labelFor: ch => `Chapter ${ch}` },
    { key: 'science',   label: 'Science & Technology', icon: '🔬', color: '#0369a1', match: k => k.startsWith('sci-'), labelFor: ch => `Chapter ${ch - 100}` },
    { key: 'geography', label: 'Geography',           icon: '🌍', color: '#059669', match: k => k.startsWith('geo-'), labelFor: ch => `Chapter ${ch - 200}` },
    { key: 'economics', label: 'Economics',           icon: '💰', color: '#d97706', match: k => k.startsWith('eco-'), labelFor: ch => `Chapter ${ch - 300}` },
    { key: 'current',   label: 'Current Affairs',     icon: '📰', color: '#be185d', match: k => k.startsWith('ca-'), labelFor: ch => `Chapter ${ch - 400}` },
  ];
  const bySubject = {};
  SUBJECTS.forEach(s => bySubject[s.key] = {});
  topics.forEach(([key, t]) => {
    for (const s of SUBJECTS) {
      if (s.match(key)) {
        const ch = t.chapterNo || 0;
        if (!bySubject[s.key][ch]) bySubject[s.key][ch] = [];
        bySubject[s.key][ch].push([key, t]);
        break;
      }
    }
  });
  let subjectsHTML = '';
  for (const s of SUBJECTS) {
    const chapters = bySubject[s.key];
    const chapterNums = Object.keys(chapters).map(Number).sort((a,b) => a-b);
    if (!chapterNums.length) continue;
    const totalSubQ = chapterNums.reduce((sum, ch) => sum + chapters[ch].reduce((s2, [,t]) => s2 + (t.questions||[]).length, 0), 0);
    subjectsHTML += `<div class="subject-section fade" style="margin-bottom:36px; border-left:5px solid ${s.color}; padding-left:18px;"><div style="display:flex; align-items:center; gap:12px; margin-bottom:14px; flex-wrap:wrap;"><div style="font-size:28px;">${s.icon}</div><h2 style="margin:0; font-size:22px; color:${s.color};">${s.label}</h2><span style="background:${s.color}; color:#fff; font-size:12px; font-weight:700; padding:4px 12px; border-radius:999px;">${chapterNums.length} chapters · ${totalSubQ} questions</span></div><div style="display:flex; flex-direction:column; gap:14px;">${chapterNums.map(ch => {
      const quizzes = chapters[ch];
      const chQ = quizzes.reduce((sum, [,t]) => sum + (t.questions||[]).length, 0);
      const firstTitle = quizzes[0][1].title.split(' — ')[0];
      return `<div class="chapter-block" style="background:var(--surface-2); border-radius:12px; padding:14px 16px;"><div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;"><h3 style="margin:0; font-size:16px;">${s.icon} ${s.labelFor(ch)} — ${esc(firstTitle)}</h3><span style="font-size:12px; color:var(--text-soft);">${chQ} questions</span></div><div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:10px;">${quizzes.sort((a,b) => { const order = { 'moderate': 0, 'moderate-difficult': 1, 'difficult': 2 }; return (order[a[1].level] ?? 0) - (order[b[1].level] ?? 0); }).map(([key, t]) => {
        const lv = levelColors[t.level] || levelColors['moderate'];
        return `<article class="card fade" onclick="startTopicQuiz('${key}')" style="cursor:pointer; background:${lv.bg}; color:#fff; padding:14px;"><div style="font-size:10.5px; font-weight:800; text-transform:uppercase; letter-spacing:.5px; opacity:.9;">${lv.label}</div><h3 style="color:#fff; margin-top:6px; font-size:14.5px;">${esc(t.title)}</h3><div style="margin-top:10px; font-size:12px; opacity:.95;">${(t.questions||[]).length} questions · Skip enabled</div><div style="margin-top:10px; font-weight:700; font-size:13px;">Start Quiz →</div></article>`;
      }).join('')}</div></div>`;
    }).join('')}</div></div>`;
  }
  app.innerHTML = `
    <div class="sec-head"><div class="icon">📝</div><h2>Daily Quiz</h2><div class="line"></div><span style="font-size:12px; color:var(--text-soft);">${totalQ} questions · 8 sections</span></div>
    <div class="quiz-shell fade" style="max-width:none; margin-bottom:32px;"><div class="quiz-top"><h2>🎲 Mixed Quiz — All Subjects</h2><span class="badge">15 Random Questions</span></div><p style="color:var(--text-soft); margin-bottom:16px;">Fresh random questions across all subjects. Skip any question. Answers shown only at the end.</p><button class="btn btn-primary" onclick="startMixedQuiz()">▶️ Start Mixed Quiz</button></div>
    ${subjectsHTML}
  `;
}
window.renderQuiz = renderQuiz;

function startMixedQuiz() {
  const quiz = buildMixedQuiz(15);
  if (!quiz) { showToast('No questions.', 'error'); return; }
  quizState = { quiz, index: 0, answers: new Array(quiz.questions.length).fill(null), finished: false };
  paintQuiz();
}
window.startMixedQuiz = startMixedQuiz;

function startTopicQuiz(topicKey) {
  const quiz = buildTopicQuiz(topicKey);
  if (!quiz) { showToast('Topic not found.', 'error'); return; }
  quizState = { quiz, index: 0, answers: new Array(quiz.questions.length).fill(null), finished: false };
  paintQuiz();
}
window.startTopicQuiz = startTopicQuiz;

function paintQuiz() {
  const s = quizState;
  const quiz = s.quiz;
  const total = quiz.questions.length;
  if (s.finished) return paintResult();
  const q = quiz.questions[s.index];
  const pct = ((s.index) / total) * 100;
  const answered = s.answers[s.index] !== null;
  app.innerHTML = `
    <div class="sec-head"><div class="icon">📝</div><h2>${esc(quiz.title)}</h2><div class="line"></div><button class="mini-btn" onclick="go('#/quiz')">← All Quizzes</button></div>
    <div class="quiz-shell fade">
      <div class="quiz-top"><h2>📝 ${esc(quiz.title)}</h2><span class="badge">Question ${s.index + 1} / ${total}</span></div>
      <div class="progress"><div style="width:${pct}%"></div></div>
      <div style="font-size:12px; color:var(--text-soft); margin-bottom:10px;">✅ ${s.answers.filter(a => a !== null && a !== 'skip').length} answered · ⏭️ ${s.answers.filter(a => a === 'skip').length} skipped · 📋 ${total} total</div>
      <div class="q-text"><span class="q-num">${s.index + 1}</span>${esc(q.q)}</div>
      <div class="options" id="options">${q.options.map((opt, i) => `<button class="option ${answered && s.answers[s.index] === i ? 'selected' : ''} ${answered ? 'locked' : ''}" data-i="${i}"><span class="letter">${'ABCD'[i]}</span><span>${esc(opt)}</span></button>`).join('')}</div>
      <div class="quiz-nav" style="margin-top:22px; display:flex; gap:10px; flex-wrap:wrap; justify-content:space-between;"><button class="btn btn-ghost" id="prevBtn" ${s.index === 0 ? 'disabled' : ''}>← Previous</button><div style="display:flex; gap:10px; flex-wrap:wrap;"><button class="btn btn-ghost" id="skipBtn">⏭️ Skip</button><button class="btn btn-primary" id="nextBtn">${s.index === total - 1 ? 'Finish ✓' : 'Next →'}</button></div></div>
      <div style="text-align:center; margin-top:16px; font-size:13px; color:var(--text-soft);">💡 Answers are shown only at the end</div>
    </div>
  `;
  document.querySelectorAll('#options .option').forEach(btn => { btn.addEventListener('click', () => { if (answered) return; selectOption(parseInt(btn.getAttribute('data-i'))); }); });
  document.getElementById('prevBtn').addEventListener('click', () => { if (s.index > 0) { s.index--; paintQuiz(); } });
  document.getElementById('skipBtn').addEventListener('click', () => { if (s.answers[s.index] === null) s.answers[s.index] = 'skip'; if (s.index === total - 1) { s.finished = true; paintResult(); } else { s.index++; paintQuiz(); } });
  document.getElementById('nextBtn').addEventListener('click', () => { if (s.index === total - 1) { s.finished = true; paintResult(); } else { s.index++; paintQuiz(); } });
}

function selectOption(i) {
  const s = quizState;
  if (s.answers[s.index] !== null) return;
  s.answers[s.index] = i;
  document.querySelectorAll('#options .option').forEach((btn, idx) => { btn.classList.add('locked'); if (idx === i) btn.classList.add('selected'); });
}

function paintResult() {
  const s = quizState;
  const total = s.quiz.questions.length;
  let score = 0, skippedCount = 0, wrongCount = 0;
  s.quiz.questions.forEach((q, i) => { const a = s.answers[i]; if (a === 'skip' || a === null) skippedCount++; else if (a === q.answer) score++; else wrongCount++; });
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  let msg, color;
  if (pct >= 80) { msg = "🏆 Excellent!"; color = "var(--success)"; }
  else if (pct >= 60) { msg = "👍 Good job!"; color = "var(--primary)"; }
  else if (pct >= 40) { msg = "📖 Not bad."; color = "var(--warning)"; }
  else { msg = "💪 Keep going!"; color = "var(--danger)"; }
  app.innerHTML = `
    <div class="sec-head"><div class="icon">📝</div><h2>Quiz Result</h2><div class="line"></div><button class="mini-btn" onclick="go('#/quiz')">← All Quizzes</button></div>
    <div class="quiz-shell fade">
      <div class="result"><div class="score-ring" style="--pct:${pct}"><span>${pct}%</span></div><h2>Quiz Complete!</h2><p>You scored <b>${score} out of ${total}</b></p><div style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin:14px 0 8px;"><div style="background:var(--surface-2); padding:10px 18px; border-radius:10px; font-weight:700;">✅ Correct: ${score}</div><div style="background:var(--surface-2); padding:10px 18px; border-radius:10px; font-weight:700;">❌ Wrong: ${wrongCount}</div><div style="background:var(--surface-2); padding:10px 18px; border-radius:10px; font-weight:700;">⏭️ Skipped: ${skippedCount}</div></div><div class="msg" style="background:${color}; color:#fff;">${msg}</div></div>
      <div class="sec-head" style="margin-top:28px;"><div class="icon">📋</div><h2>Answer Review</h2><div class="line"></div></div>
      ${s.quiz.questions.map((q, i) => {
        const user = s.answers[i];
        const skipped = user === 'skip' || user === null;
        const ok = !skipped && user === q.answer;
        const statusColor = skipped ? 'var(--warning)' : (ok ? 'var(--success)' : 'var(--danger)');
        const statusIcon = skipped ? '⏭️' : (ok ? '✅' : '❌');
        return `<div style="background:var(--surface-2); border-left:5px solid ${statusColor}; padding:14px 16px; border-radius:10px; margin-bottom:12px;"><div style="font-weight:700; margin-bottom:8px;">${statusIcon} Q${i+1}. ${esc(q.q)}</div><div style="font-size:13.5px; color:var(--text-soft);">${skipped ? `<div><b>Skipped</b></div>` : `<div>Your answer: <b>${esc(q.options[user])}</b></div>`}<div>Correct answer: <b style="color:var(--success)">${esc(q.options[q.answer])}</b></div><div style="margin-top:6px; font-style:italic;">💡 ${esc(q.explain || '')}</div></div></div>`;
      }).join('')}
    </div>
  `;
}

/* ============ ABOUT ============ */
function renderAbout() {
  app.innerHTML = `
    <div class="about-card fade">
      <h2>ℹ️ About Current Affairs Hub</h2>
      <p>Free website for daily current affairs, state-wise news and quizzes.</p>
      <h3 style="margin:20px 0 10px; color:var(--primary);">✨ Features</h3>
      <ul>
        <li>📰 Daily articles</li><li>📖 57 chapters of study notes</li><li>🗺️ State-wise current affairs</li><li>🔍 Powerful search</li><li>📝 171 quiz topics</li><li>⚡ Live auto-fetched news</li><li>🧠 Auto-generated quiz</li><li>🌙 Dark mode</li>
      </ul>
    </div>
  `;
}

/* =========================================================
   4. FEEDBACK SYSTEM
   ========================================================= */

const FEEDBACK_CATEGORIES = ["General Feedback","Bug Report","Feature Request","Content Suggestion","Praise"];
let feedbackRating = 0;

function loadFeedback() { try { return JSON.parse(localStorage.getItem('ca-feedback') || '[]'); } catch { return []; } }
function saveFeedbackItem(item) { const all = loadFeedback(); all.unshift(item); const trimmed = all.slice(0, 50); localStorage.setItem('ca-feedback', JSON.stringify(trimmed)); return trimmed; }
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `${type === 'success' ? '✅' : '⚠️'} ${message}`;
  toast.className = 'toast show' + (type === 'error' ? ' error' : '');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}
window.showToast = showToast;

function renderFeedback() {
  feedbackRating = 0;
  const feedbacks = loadFeedback();
  app.innerHTML = `
    <div class="sec-head"><div class="icon">💬</div><h2>Share Your Feedback</h2><div class="line"></div></div>
    <div class="feedback-shell fade">
      <form id="feedbackForm" novalidate>
        <div class="form-row"><div class="form-group"><label class="form-label">Name *</label><input type="text" id="fbName" class="form-input" maxlength="50"><div class="error-msg" id="errName">Min 2 characters.</div></div><div class="form-group"><label class="form-label">Email *</label><input type="email" id="fbEmail" class="form-input" maxlength="80"><div class="error-msg" id="errEmail">Valid email required.</div></div></div>
        <div class="form-group"><label class="form-label">Category *</label><select id="fbCategory" class="form-select">${FEEDBACK_CATEGORIES.map(c => `<option>${c}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Rating *</label><div class="star-rating" id="starRating">${[1,2,3,4,5].map(n => `<button type="button" class="star" data-star="${n}">★</button>`).join('')}<span class="rating-text" id="ratingText">Tap a star</span></div><div class="error-msg" id="errRating">Please select a rating.</div></div>
        <div class="form-group"><label class="form-label">Message *</label><textarea id="fbMessage" class="form-textarea" maxlength="500"></textarea><div class="error-msg" id="errMessage">Min 10 characters.</div></div>
        <div class="form-actions"><button type="button" class="btn btn-ghost" id="resetBtn">Clear</button><button type="submit" class="btn btn-primary">📩 Submit</button></div>
      </form>
    </div>
    <div class="feedback-list-title"><h2>💬 Recent Feedback</h2><span class="count-badge">${feedbacks.length}</span></div>
    <div class="feedback-list">${feedbacks.length ? feedbacks.map(f => `<div class="feedback-item"><div class="feedback-head"><b>${esc(f.name)}</b><span style="font-size:12px; color:var(--text-soft);">${f.category} · ${f.rating}★</span></div><p>${esc(f.message)}</p></div>`).join('') : `<div class="no-feedback">No feedback yet.</div>`}</div>
  `;
  setupFeedbackForm();
  setupStarRating();
}

function setupStarRating() {
  const container = document.getElementById('starRating');
  if (!container) return;
  const stars = container.querySelectorAll('.star');
  const text = document.getElementById('ratingText');
  const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  stars.forEach(star => {
    const value = parseInt(star.getAttribute('data-star'));
    star.addEventListener('click', () => {
      feedbackRating = value;
      stars.forEach(s => s.classList.toggle('filled', parseInt(s.getAttribute('data-star')) <= value));
      text.textContent = labels[value];
      document.getElementById('errRating').classList.remove('show');
    });
  });
}

function setupFeedbackForm() {
  const form = document.getElementById('feedbackForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('fbName').value.trim();
    const email = document.getElementById('fbEmail').value.trim();
    const category = document.getElementById('fbCategory').value;
    const message = document.getElementById('fbMessage').value.trim();
    let valid = true;
    if (name.length < 2) { document.getElementById('errName').classList.add('show'); valid = false; } else document.getElementById('errName').classList.remove('show');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById('errEmail').classList.add('show'); valid = false; } else document.getElementById('errEmail').classList.remove('show');
    if (feedbackRating < 1) { document.getElementById('errRating').classList.add('show'); valid = false; }
    if (message.length < 10) { document.getElementById('errMessage').classList.add('show'); valid = false; } else document.getElementById('errMessage').classList.remove('show');
    if (!valid) { showToast('Fix errors.', 'error'); return; }
    saveFeedbackItem({ id: Date.now(), name, email, category, rating: feedbackRating, message, date: new Date().toISOString() });
    form.reset();
    feedbackRating = 0;
    document.querySelectorAll('#starRating .star').forEach(s => s.classList.remove('filled'));
    document.getElementById('ratingText').textContent = 'Tap a star';
    renderFeedback();
    showToast('Thanks for your feedback!', 'success');
  });
  document.getElementById('resetBtn')?.addEventListener('click', () => form.reset());
}

/* =========================================================
   5. DOWNLOADS
   ========================================================= */
function renderDownloads() {
  app.innerHTML = `<div class="sec-head"><div class="icon">📄</div><h2>Downloads</h2><div class="line"></div></div><div class="download-shell fade"><h1>📄 PDF Download</h1><p>Use your browser's <b>Print → Save as PDF</b> on any Study Note page to download it as a colorful PDF.</p></div>`;
}

/* =========================================================
   6. AUTO NEWS FETCHER
   ========================================================= */

const AUTO_NEWS_CACHE_KEY = 'ca-auto-news-v1';
const AUTO_NEWS_CACHE_TTL = 30 * 60 * 1000;

const CATEGORY_KEYWORDS = {
  Polity: ['parliament', 'constitution', 'supreme court', 'lok sabha', 'rajya sabha', 'president', 'prime minister', 'bill', 'act', 'amendment', 'article', 'governor', 'election'],
  Economy: ['gdp', 'rbi', 'inflation', 'budget', 'tax', 'stock', 'rupee', 'bank', 'finance', 'revenue', 'trade', 'export', 'import', 'sensex', 'nifty', 'upi'],
  Sports: ['cricket', 'olympic', 'ipl', 'match', 'tournament', 'medal', 'player', 'coach', 'khel', 'hockey', 'football', 'badminton', 'tennis'],
  Science: ['isro', 'nasa', 'satellite', 'vaccine', 'research', 'study', 'discovery', 'space', 'moon', 'mars', 'chandrayaan', 'gaganyaan', 'rocket'],
  Awards: ['award', 'honour', 'padma', 'nobel', 'prize', 'medal', 'khel ratna', 'arjuna', 'bharat ratna', 'oscar'],
  International: ['united nations', 'bilateral', 'summit', 'g20', 'brics', 'foreign', 'treaty', 'diplomat', 'ambassador', 'quad'],
  Schemes: ['scheme', 'yojana', 'mission', 'policy', 'launched', 'initiative', 'welfare'],
  Judiciary: ['court', 'judge', 'verdict', 'justice', 'petition', 'hearing', 'high court', 'tribunal']
};

const STATE_KEYWORDS = {
  'Maharashtra': ['mumbai', 'pune', 'nagpur', 'maharashtra', 'bombay', 'nashik'],
  'Delhi': ['delhi', 'new delhi'],
  'Tamil Nadu': ['chennai', 'tamil nadu', 'madras', 'coimbatore', 'madurai'],
  'Karnataka': ['bengaluru', 'bangalore', 'karnataka', 'mysore', 'mangalore'],
  'Kerala': ['kerala', 'thiruvananthapuram', 'kochi', 'kozhikode'],
  'Gujarat': ['gujarat', 'ahmedabad', 'surat', 'vadodara', 'rajkot', 'gandhinagar'],
  'Rajasthan': ['rajasthan', 'jaipur', 'jodhpur', 'udaipur', 'kota', 'ajmer'],
  'Uttar Pradesh': ['uttar pradesh', 'lucknow', 'kanpur', 'varanasi', 'allahabad', 'prayagraj', 'noida', 'agra'],
  'West Bengal': ['west bengal', 'kolkata', 'calcutta', 'howrah', 'darjeeling'],
  'Andhra Pradesh': ['andhra', 'visakhapatnam', 'vijayawada', 'amaravati', 'tirupati'],
  'Telangana': ['telangana', 'hyderabad', 'warangal'],
  'Madhya Pradesh': ['madhya pradesh', 'bhopal', 'indore', 'gwalior', 'jabalpur'],
  'Bihar': ['bihar', 'patna', 'gaya', 'bhagalpur'],
  'Odisha': ['odisha', 'bhubaneswar', 'cuttack', 'puri'],
  'Punjab': ['punjab', 'chandigarh', 'amritsar', 'ludhiana', 'jalandhar'],
  'Haryana': ['haryana', 'gurugram', 'faridabad', 'karnal', 'hisar'],
  'Assam': ['assam', 'guwahati', 'dispur', 'dibrugarh'],
  'Jharkhand': ['jharkhand', 'ranchi', 'jamshedpur', 'dhanbad'],
  'Chhattisgarh': ['chhattisgarh', 'raipur', 'bhilai', 'bilaspur'],
  'Uttarakhand': ['uttarakhand', 'dehradun', 'haridwar', 'rishikesh'],
  'Himachal Pradesh': ['himachal', 'shimla', 'manali', 'dharamshala'],
  'Goa': ['goa', 'panaji', 'margao'],
  'Manipur': ['manipur', 'imphal']
};

const AUTO_STATE = { articles: [], loading: false, lastUpdated: null, sourceStatus: [], filterCategory: 'All', filterState: 'All States', searchTerm: '' };

function loadAutoCache() { try { const raw = localStorage.getItem(AUTO_NEWS_CACHE_KEY); if (!raw) return null; const data = JSON.parse(raw); if (Date.now() - data.timestamp > AUTO_NEWS_CACHE_TTL) return null; return data; } catch { return null; } }
function saveAutoCache(articles) { try { localStorage.setItem(AUTO_NEWS_CACHE_KEY, JSON.stringify({ timestamp: Date.now(), articles })); } catch (e) { console.warn('Cache save failed:', e); } }

function stripHTML(str) {
  if (!str) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = str;
  return (tmp.textContent || tmp.innerText || '').trim();
}

function categorizeArticle(title, description) {
  const text = (title + ' ' + description).toLowerCase();
  let best = 'general', bestScore = 0;
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    keywords.forEach(kw => { if (text.includes(kw)) score++; });
    if (score > bestScore) { bestScore = score; best = cat; }
  }
  return bestScore > 0 ? best : 'International';
}

function detectState(title, description) {
  const text = (title + ' ' + description).toLowerCase();
  for (const [state, keywords] of Object.entries(STATE_KEYWORDS)) {
    for (const kw of keywords) { if (text.includes(kw)) return state; }
  }
  return null;
}

function estimateReadTime(text) { const words = (text || '').split(/\s+/).length; return Math.max(1, Math.ceil(words / 200)) + ' min'; }

async function fetchAllNews() {
  if (AUTO_STATE.loading) return;
  AUTO_STATE.loading = true;
  AUTO_STATE.sourceStatus = [];
  paintAuto();
  showToast('Fetching latest news from local server…', 'success');
  try {
    const res = await fetch('/api/news', { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    const raw = (data.articles || []);
    const articles = raw.map((item, idx) => {
      const title = stripHTML(item.title || '');
      const description = stripHTML(item.summary || '');
      const link = item.link || '#';
      const pubDate = item.pubDate || '';
      if (!title) return null;
      const category = item.category === 'general' ? categorizeArticle(title, description) : item.category;
      const state = detectState(title, description);
      return {
        id: 'auto-' + idx + '-' + Date.now(),
        title,
        summary: description.slice(0, 240) || 'Click to read full story.',
        body: `<p>${esc(description || title)}</p><p><b>Source:</b> ${esc(item.source || 'Google News')}</p><p><a href="${esc(link)}" target="_blank" rel="noopener">Read full article →</a></p>`,
        category, stateName: state || '',
        date: pubDate ? new Date(pubDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
        readTime: estimateReadTime(description),
        source: item.source || 'Auto', sourceLink: link,
        range: item.range || 'recent', isAuto: true,
        type: state ? 'state' : 'general'
      };
    }).filter(Boolean);
    const seen = new Set(); const unique = [];
    for (const a of articles) { const key = a.title.toLowerCase().slice(0, 60); if (!seen.has(key)) { seen.add(key); unique.push(a); } }
    unique.sort((a, b) => b.date.localeCompare(a.date));
    const bySource = {};
    unique.forEach(a => { bySource[a.source] = (bySource[a.source] || 0) + 1; });
    AUTO_STATE.sourceStatus = Object.entries(bySource).map(([name, count]) => ({ name, status: 'ok', count }));
    AUTO_STATE.articles = unique;
    AUTO_STATE.lastUpdated = Date.now();
    saveAutoCache(unique);
    showToast(`✅ Fetched ${unique.length} articles from ${AUTO_STATE.sourceStatus.length} sources.`, 'success');
  } catch (err) {
    console.error('Fetch error:', err);
    showToast('❌ Fetch failed. Is the Python server running?', 'error');
  } finally {
    AUTO_STATE.loading = false;
    paintAuto();
  }
}

function renderAuto() {
  const cached = loadAutoCache();
  if (cached && !AUTO_STATE.articles.length) { AUTO_STATE.articles = cached.articles; AUTO_STATE.lastUpdated = cached.timestamp; }
  paintAuto();
  if (!AUTO_STATE.articles.length && !AUTO_STATE.loading) { setTimeout(() => fetchAllNews(), 300); }
}

function paintAuto() {
  const s = AUTO_STATE;
  const cats = new Set(s.articles.map(a => a.category));
  const categories = ['All', ...Array.from(cats).sort()];
  const sts = new Set(s.articles.filter(a => a.stateName).map(a => a.stateName));
  const states = ['All States', ...Array.from(sts).sort()];
  const term = s.searchTerm.trim().toLowerCase();
  const filtered = s.articles.filter(a => {
    const catOK = s.filterCategory === 'All' || a.category === s.filterCategory;
    const stOK = s.filterState === 'All States' || a.stateName === s.filterState;
    const termOK = !term || a.title.toLowerCase().includes(term) || a.summary.toLowerCase().includes(term);
    return catOK && stOK && termOK;
  });
  const lastUpd = s.lastUpdated ? new Date(s.lastUpdated).toLocaleString('en-IN') : 'Never';
  app.innerHTML = `
    <div class="sec-head"><div class="icon">⚡</div><h2>Auto-Fetched Current Affairs</h2><div class="line"></div></div>
    <div class="auto-shell fade">
      <div class="auto-head">
        <h1>⚡ Live News Feed</h1>
        <div class="auto-status"><span><span class="dot ${s.loading?'loading':(s.articles.length?'':'error')}"></span>${s.loading ? 'Fetching…' : (s.articles.length ? `${s.articles.length} articles` : 'No data')}</span><span>🕐 Last updated: <b>${lastUpd}</b></span></div>
        <div class="auto-actions">
          <button class="btn btn-primary" id="fetchNowBtn" ${s.loading ? 'disabled' : ''}>${s.loading ? '<span class="loading-spinner"></span>Fetching…' : '🔄 Fetch Now'}</button>
          ${s.articles.length ? `<button class="btn btn-ghost" id="goQuizBtn">🧠 Take Quiz</button>` : ''}
          ${s.articles.length ? `<button class="btn btn-ghost" id="clearCacheBtn">🗑️ Clear Cache</button>` : ''}
        </div>
      </div>
      ${s.sourceStatus.length ? `<div class="source-chips">${s.sourceStatus.map(src => `<span class="source-chip ok">✅ ${esc(src.name)}${src.count ? ' · ' + src.count : ''}</span>`).join('')}</div>` : ''}
      <div class="auto-info-bar"><b>💡 How it works:</b> The Python backend fetches RSS feeds server-side (no CORS issues). Categories and states detected automatically. Cached for 30 minutes.</div>
      ${s.articles.length ? `<div class="searchbar" style="margin-bottom:14px;"><span>🔍</span><input type="text" id="autoSearch" placeholder="Search fetched news…" value="${esc(s.searchTerm)}"></div><div class="chips">${categories.map(c => `<button class="chip ${s.filterCategory===c?'active':''}" data-autocat="${c}">${c}</button>`).join('')}</div>${states.length > 1 ? `<div class="chips">${states.map(c => `<button class="chip ${s.filterState===c?'active':''}" data-autostate="${c}">📍 ${c}</button>`).join('')}</div>` : ''}<div style="font-size:13px;color:var(--text-soft);margin:8px 0 14px;">Showing <b style="color:var(--primary);">${filtered.length}</b> of ${s.articles.length} articles</div>` : ''}
      ${s.loading && !s.articles.length ? `<div class="auto-empty"><div class="big">⏳</div><p>Fetching latest news… please wait.</p></div>` : ''}
      ${!s.loading && !s.articles.length ? `<div class="auto-empty"><div class="big">📭</div><p>No articles fetched yet.</p><p style="font-size:13px;margin-top:8px;color:var(--text-soft);">Make sure the server is running with: <code>python server.py</code></p><button class="btn btn-primary" style="margin-top:14px;" onclick="fetchAllNews()">🔄 Fetch Now</button></div>` : ''}
      ${filtered.length ? `<div class="auto-grid">${filtered.map(autoCard).join('')}</div>` : (s.articles.length ? `<div class="auto-empty"><div class="big">🔍</div><p>No articles match your filters.</p></div>` : '')}
    </div>
  `;
  document.getElementById('fetchNowBtn')?.addEventListener('click', fetchAllNews);
  document.getElementById('goQuizBtn')?.addEventListener('click', () => go('#/auto-quiz'));
  document.getElementById('clearCacheBtn')?.addEventListener('click', () => {
    localStorage.removeItem(AUTO_NEWS_CACHE_KEY);
    AUTO_STATE.articles = []; AUTO_STATE.lastUpdated = null; AUTO_STATE.sourceStatus = [];
    showToast('Cache cleared.', 'success');
    paintAuto();
  });
  const searchInput = document.getElementById('autoSearch');
  if (searchInput) { searchInput.addEventListener('input', e => { AUTO_STATE.searchTerm = e.target.value; paintAuto(); document.getElementById('autoSearch')?.focus(); }); }
  document.querySelectorAll('[data-autocat]').forEach(btn => { btn.addEventListener('click', () => { AUTO_STATE.filterCategory = btn.getAttribute('data-autocat'); paintAuto(); }); });
  document.querySelectorAll('[data-autostate]').forEach(btn => { btn.addEventListener('click', () => { AUTO_STATE.filterState = btn.getAttribute('data-autostate'); paintAuto(); }); });
}

function autoCard(a) {
  const timeAgo = (() => {
    const d = new Date(a.date + 'T00:00:00');
    const diff = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return `${diff}d ago`;
  })();
  return `<article class="auto-card fade"><div class="cat-row"><span class="cat">${esc(a.category)}</span>${a.stateName ? `<span class="state-tag">📍 ${esc(a.stateName)}</span>` : ''}</div><h3>${esc(a.title)}</h3><p>${esc(a.summary)}</p><div class="meta"><span class="source">${esc(a.source || 'Auto')}</span><span>🕐 ${timeAgo}</span><a href="${esc(a.sourceLink || '#')}" target="_blank" rel="noopener" class="read-link">Read →</a></div></article>`;
}

window.fetchAllNews = fetchAllNews;
window.renderAuto = renderAuto;

/* =========================================================
   7. AUTO QUIZ — From live news + 50-Question Misc Test
   ========================================================= */

const AUTO_QUIZ_STORAGE_KEY = 'ca-auto-quiz-v3';

const CORE_TYPES = [
  'National & International Events',
  'Government Schemes & Policies',
  'Sports Achievements',
  'Awards & Honors',
  'Science & Technology',
  'Economy & Banking'
];

const CATEGORY_TO_CORE = {
  'Polity':        'National & International Events',
  'International': 'National & International Events',
  'Judiciary':     'National & International Events',
  'Schemes':       'Government Schemes & Policies',
  'Sports':        'Sports Achievements',
  'Awards':        'Awards & Honors',
  'Science':       'Science & Technology',
  'Economy':       'Economy & Banking'
};

function mapToCore(category) {
  return CATEGORY_TO_CORE[category] || 'National & International Events';
}

const NAME_STOPWORDS = new Set([
  'The','This','That','A','An','And','Or','But','In','On','At','By','For','With','From','To','Of',
  'New','All','More','Is','Are','Was','Were','Be','Been','Being','Has','Have','Had',
  'Will','Would','Shall','Should','Can','Could','May','Might','Must',
  'Its','It','He','She','They','We','You','I','Me','Him','Her','Them','Us',
  'India','Indian','PM','AM','Top','Big','Day','Week','Year','Month','Today','Yesterday','Tomorrow',
  'First','Last','Next','Now','Here','How','Why','What','When','Where','Who','Which','Also','After','Before',
  'Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','One','Says','Said','Told'
]);

/* ============ ✅ FIX 1: TITLE QUALITY FILTER ============ */
const BAD_TITLE_TERMS = [
  'daily current affairs', 'current affairs today', 'current affairs -',
  'gk today', 'gk quiz', 'current affairs quiz', 'current affairs questions',
  'top headlines', 'news headlines', 'daily news', 'news digest', 'daily digest',
  'editorial analysis', 'live updates', 'live blog', 'breaking news live',
  'watch:', 'video:', 'photos:', 'in pictures', '5 things', '10 things',
  'top 10', 'top 5', 'weekly wrap', 'monthly recap', 'upsc', 'ias exam',
  'ssc exam', 'bank exam', 'adda247', 'jagran josh', 'oliveboard',
  'testbook', 'byju', 'unacademy', 'career power'
];

function isGoodHeadline(title) {
  if (!title) return false;
  const t = title.toLowerCase().trim();
  if (t.length < 25 || t.length > 200) return false;
  for (const bad of BAD_TITLE_TERMS) {
    if (t.includes(bad)) return false;
  }
  if ((t.match(/\|/g) || []).length >= 2) return false;
  if ((t.match(/ - /g) || []).length >= 3) return false;
  return true;
}
window.isGoodHeadline = isGoodHeadline;

/* ============ HELPER: Extract Proper Nouns ============ */
function extractProperNouns(text) {
  if (!text) return [];
  const results = [];
  const regex = /\b([A-Z][a-z]{1,}(?:\s+[A-Z][a-z]{1,}){0,3})\b/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    const phrase = m[1].trim();
    if (phrase.length < 4) continue;
    const words = phrase.split(/\s+/);
    if (words.length === 1 && NAME_STOPWORDS.has(phrase)) continue;
    if (words.every(w => NAME_STOPWORDS.has(w))) continue;
    if (!results.includes(phrase)) results.push(phrase);
  }
  return results;
}

function extractPersonFromText(text) {
  if (!text) return null;
  const titlePattern = /\b(?:Justice|Dr\.?|Mr\.?|Mrs\.?|Ms\.?|Shri|Smt\.?|President|Prime\s+Minister|Chief\s+Minister|CM|PM|Governor|CEO|Chairman|Chairperson|Director|Secretary|Minister|Prof\.?|Adv\.?|Acharya|Sadhvi|Swami)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3})/;
  const tm = text.match(titlePattern);
  if (tm) {
    const full = tm[0].trim();
    if (full.length > 4) return full;
  }
  const verbPattern = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\s+(?:Wins?|Won|Sworn|Appointed|Elected|Selected|Named|Honored|Honoured|Awarded|Receives?|Received|Becomes?|Became|Inaugurat\w+|Launched|Announced|Signs?|Signed|Meets?|Met|Visits?|Visited|Said|Says|Addressed|Unveils?|Unveiled)/;
  const vm = text.match(verbPattern);
  if (vm && vm[1]) return vm[1].trim();
  return null;
}

function extractPlaceFromText(text) {
  if (!text) return null;
  const indianStates = ['Maharashtra','Delhi','Karnataka','Kerala','Gujarat','Rajasthan','Punjab',
    'Haryana','Bihar','Odisha','Assam','Jharkhand','Chhattisgarh','Uttarakhand','Goa','Manipur',
    'Telangana','Tamil Nadu','West Bengal','Andhra Pradesh','Madhya Pradesh','Uttar Pradesh',
    'Himachal Pradesh'];
  for (const st of indianStates) {
    if (text.includes(st)) return st;
  }
  const placePattern = /\b(?:in|at|from|near|to|across)\s+([A-Z][a-z]{2,}(?:\s+[A-Z][a-z]{2,})?)\b/;
  const pm = text.match(placePattern);
  if (pm) {
    const place = pm[1].trim();
    if (!NAME_STOPWORDS.has(place)) return place;
  }
  return null;
}

function extractAmountFromText(text) {
  if (!text) return null;
  const patterns = [
    /(?:₹|Rs\.?|INR|\$|USD|EUR)\s*[\d,]+(?:\.\d+)?\s*(?:crore|lakh|billion|million|thousand|trillion)?/i,
    /[\d,]+(?:\.\d+)?\s*(?:crore|lakh|billion|million|thousand|trillion)/i,
    /[\d,]+(?:\.\d+)?\s*(?:%|percent)/i
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) return m[0].trim();
  }
  return null;
}

function extractAwardFromText(text) {
  if (!text) return null;
  const m = text.match(/\b([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+){0,2})\s+(?:Medal|Award|Prize|Honour|Honor|Samman|Puraskar)\b/);
  return m ? m[0].trim() : null;
}

/* =========================================================
   SSC-STYLE QUESTION GENERATORS
   ========================================================= */

function trimTitle(title) {
  if (!title) return '';
  const t = title.trim();
  return t.length > 100 ? t.slice(0, 100) + '…' : t;
}

/* ---------- SSC Type 1: Direct Factual ---------- */
function buildDirectQuestion(article, pools) {
  const person = extractPersonFromText(article.title);
  const place = extractPlaceFromText(article.title);
  const award = extractAwardFromText(article.title);
  const amount = extractAmountFromText(article.title + ' ' + article.summary);

  if (award && person && pools.persons.length >= 4) {
    const distractors = qShuffle(pools.persons.filter(p => p !== person)).slice(0, 3);
    if (distractors.length === 3) {
      const opts = qShuffle([person, ...distractors]);
      return {
        coreType: 'Awards & Honors',
        q: `Who was conferred with the ${award}?`,
        options: opts, answer: opts.indexOf(person),
        explain: `${person} received the ${award}.`
      };
    }
  }

  if (person && pools.persons.length >= 4) {
    const distractors = qShuffle(pools.persons.filter(p => p !== person)).slice(0, 3);
    if (distractors.length === 3) {
      const opts = qShuffle([person, ...distractors]);
      const stems = {
        'Judiciary': `Who has been appointed as the new judge/officer in the following news: "${trimTitle(article.title)}"?`,
        'Sports': `Who is the sportsperson in the following news: "${trimTitle(article.title)}"?`,
        'Polity': `Who is the key personality in the following news: "${trimTitle(article.title)}"?`,
        'Awards': `Who received the honour mentioned in: "${trimTitle(article.title)}"?`,
        'default': `Who is associated with the following news: "${trimTitle(article.title)}"?`
      };
      const q = stems[article.category] || stems['default'];
      return {
        coreType: mapToCore(article.category),
        q, options: opts, answer: opts.indexOf(person),
        explain: `Correct answer: ${person}. Source: ${trimTitle(article.title)}`
      };
    }
  }

  if (place && pools.places.length >= 4) {
    const distractors = qShuffle(pools.places.filter(p => p !== place)).slice(0, 3);
    if (distractors.length === 3) {
      const opts = qShuffle([place, ...distractors]);
      return {
        coreType: mapToCore(article.category),
        q: `In which city/state did the following event take place: "${trimTitle(article.title)}"?`,
        options: opts, answer: opts.indexOf(place),
        explain: `The event took place in ${place}.`
      };
    }
  }

  if (amount && pools.amounts.length >= 4) {
    const distractors = qShuffle(pools.amounts.filter(a => a !== amount)).slice(0, 3);
    if (distractors.length === 3) {
      const opts = qShuffle([amount, ...distractors]);
      return {
        coreType: 'Economy & Banking',
        q: `As per the news "${trimTitle(article.title)}", what is the correct figure?`,
        options: opts, answer: opts.indexOf(amount),
        explain: `Correct figure: ${amount}.`
      };
    }
  }

  return null;
}

/* ---------- ✅ FIX 3: SSC Type 2 — Improved Fill in the Blank ---------- */
function buildFillBlank(article, pools) {
  const title = article.title;
  if (!title || title.length < 30) return null;

  const VERB_STARTERS = ['India', 'PM', 'Govt', 'Government', 'Center', 'Centre', 'New'];

  const candidates = [];
  const regex = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\b/g;
  let m;
  while ((m = regex.exec(title)) !== null) {
    const phrase = m[1];
    if (VERB_STARTERS.includes(phrase.split(' ')[0])) continue;
    if (phrase.split(' ').length < 2) continue;
    if (phrase.length < 10) continue;
    if (NAME_STOPWORDS.has(phrase)) continue;
    candidates.push({ phrase, index: m.index });
  }

  if (!candidates.length) return null;

  candidates.sort((a, b) => b.phrase.length - a.phrase.length);
  const target = candidates[0].phrase;

  const blanked = title.replace(target, '________');
  if (blanked === title) return null;

  const allNouns = (pools.nouns || []).filter(n => {
    if (n === target) return false;
    if (title.includes(n)) return false;
    if (n.split(' ').length < 2) return false;
    if (n.length < 8) return false;
    return true;
  });

  if (allNouns.length < 3) return null;
  const distractors = qShuffle(allNouns).slice(0, 3);
  const opts = qShuffle([target, ...distractors]);

  return {
    coreType: mapToCore(article.category),
    q: `Fill in the blank: "${blanked}"`,
    options: opts, answer: opts.indexOf(target),
    explain: `Complete headline: "${title}"`
  };
}

/* ---------- SSC Type 3: Match the Following ---------- */
function buildMatchQuestion(article, pools) {
  const person = extractPersonFromText(article.title);
  const place = extractPlaceFromText(article.title);

  if (person && place && pools.persons.length >= 3 && pools.places.length >= 3) {
    const persons = [person, ...qShuffle(pools.persons.filter(p => p !== person)).slice(0, 2)];
    const places = [place, ...qShuffle(pools.places.filter(p => p !== place)).slice(0, 2)];
    const opts = qShuffle([
      `${person} — ${place}`,
      `${persons[1]} — ${places[1]}`,
      `${persons[2]} — ${places[2]}`,
      `${persons[1]} — ${places[2]}`
    ]);
    return {
      coreType: 'National & International Events',
      q: `Which of the following pairs is correctly matched according to the news "${trimTitle(article.title)}"?`,
      options: opts, answer: opts.indexOf(`${person} — ${place}`),
      explain: `${person} is associated with ${place}.`
    };
  }
  return null;
}

/* ---------- SSC Type 4: Which is NOT correct ---------- */
function buildNotCorrectQuestion(article, pools) {
  const person = extractPersonFromText(article.title);

  if (person && pools.persons.length >= 4) {
    const wrongPersons = qShuffle(pools.persons.filter(p => p !== person)).slice(0, 3);
    if (wrongPersons.length < 3) return null;

    const correctAnswer = wrongPersons[0];
    const opts = qShuffle([person, ...wrongPersons]);
    return {
      coreType: 'National & International Events',
      q: `According to the news "${trimTitle(article.title)}", who is NOT associated with this event?`,
      options: opts, answer: opts.indexOf(correctAnswer),
      explain: `${person} is associated with this news. The others are not.`
    };
  }
  return null;
}

/* ---------- SSC Type 5: One-liner Fact ---------- */
function buildOneLiner(article, pools) {
  const place = extractPlaceFromText(article.title);
  const amount = extractAmountFromText(article.title + ' ' + article.summary);
  const award = extractAwardFromText(article.title);

  if (award && pools.nouns.length >= 4) {
    const distractors = qShuffle(pools.nouns.filter(n => !award.includes(n))).slice(0, 3);
    if (distractors.length === 3) {
      const opts = qShuffle([award, ...distractors]);
      return {
        coreType: 'Awards & Honors',
        q: `Which award/honour is mentioned in the following news: "${trimTitle(article.title)}"?`,
        options: opts, answer: opts.indexOf(award),
        explain: `The award mentioned is: ${award}.`
      };
    }
  }

  if (place && pools.places.length >= 4) {
    const distractors = qShuffle(pools.places.filter(p => p !== place)).slice(0, 3);
    if (distractors.length === 3) {
      const opts = qShuffle([place, ...distractors]);
      return {
        coreType: mapToCore(article.category),
        q: `The event described in "${trimTitle(article.title)}" is related to which place?`,
        options: opts, answer: opts.indexOf(place),
        explain: `Related place: ${place}.`
      };
    }
  }

  if (amount && pools.amounts.length >= 4) {
    const distractors = qShuffle(pools.amounts.filter(a => a !== amount)).slice(0, 3);
    if (distractors.length === 3) {
      const opts = qShuffle([amount, ...distractors]);
      return {
        coreType: 'Economy & Banking',
        q: `In the context of "${trimTitle(article.title)}", which of the following figures is correct?`,
        options: opts, answer: opts.indexOf(amount),
        explain: `Correct figure: ${amount}.`
      };
    }
  }

  return null;
}

/* ---------- MASTER Builder ---------- */
function buildExamStyleQuestion(article, pools) {
  /* ✅ FIX 2: Skip low-quality titles */
  if (!isGoodHeadline(article.title)) return null;

  const coreType = mapToCore(article.category);

  let builders;
  if (coreType === 'Awards & Honors') {
    builders = [buildDirectQuestion, buildOneLiner, buildFillBlank, buildMatchQuestion];
  } else if (coreType === 'Economy & Banking') {
    builders = [buildDirectQuestion, buildOneLiner, buildFillBlank, buildNotCorrectQuestion];
  } else if (coreType === 'Sports Achievements') {
    builders = [buildDirectQuestion, buildOneLiner, buildMatchQuestion, buildFillBlank];
  } else if (coreType === 'Science & Technology') {
    builders = [buildDirectQuestion, buildOneLiner, buildFillBlank, buildNotCorrectQuestion];
  } else {
    builders = [
      buildDirectQuestion,
      buildOneLiner,
      buildMatchQuestion,
      buildFillBlank,
      buildNotCorrectQuestion
    ];
  }

  for (const fn of qShuffle(builders)) {
    try {
      const q = fn(article, pools);
      if (q && q.answer >= 0 && q.options.length === 4 && q.q && q.q.length > 15) {
        return q;
      }
    } catch (e) {
      // Silent fail, try next builder
    }
  }
  return null;
}

/* ============ Today's Auto Quiz (10 Qs) ============ */
function generateQuizFromNews(force) {
  const today = new Date().toISOString().slice(0, 10);
  if (!force) {
    try {
      const raw = localStorage.getItem(AUTO_QUIZ_STORAGE_KEY);
      if (raw) {
        const cached = JSON.parse(raw);
        if (cached.date === today && cached.questions && cached.questions.length >= 3) return cached;
      }
    } catch (e) {}
  }

  const articles = AUTO_STATE.articles;
  if (!articles || articles.length < 3) return null;

  let pool = articles.filter(a => a.date === today);
  if (pool.length < 10) pool = articles.slice();

  const pools = { persons: [], places: [], amounts: [], nouns: [] };
  articles.forEach(a => {
    const p  = extractPersonFromText(a.title);
    const pl = extractPlaceFromText(a.title);
    const am = extractAmountFromText((a.title || '') + ' ' + (a.summary || ''));
    const nn = extractProperNouns(a.title);
    if (p  && !pools.persons.includes(p))   pools.persons.push(p);
    if (pl && !pools.places.includes(pl))   pools.places.push(pl);
    if (am && !pools.amounts.includes(am))  pools.amounts.push(am);
    nn.forEach(n => { if (!pools.nouns.includes(n)) pools.nouns.push(n); });
  });

  const questions = [];
  const usedIds = new Set();
  for (const article of qShuffle(pool)) {
    if (questions.length >= 10) break;
    if (usedIds.has(article.id)) continue;
    const q = buildExamStyleQuestion(article, pools);
    if (q) { questions.push(q); usedIds.add(article.id); }
  }

  if (questions.length < 3) return null;

  const quiz = {
    id: 'auto-quiz-' + today,
    title: 'Auto Quiz — ' + new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    date: today, isAuto: true, coreTypes: CORE_TYPES, questions
  };

  try { localStorage.setItem(AUTO_QUIZ_STORAGE_KEY, JSON.stringify(quiz)); } catch (e) {}
  return quiz;
}

let autoQuizState = null;

/* ============ Render Auto Quiz Landing ============ */
function renderAutoQuiz() {
  if (!AUTO_STATE.articles.length) {
    const cached = loadAutoCache();
    if (cached) {
      AUTO_STATE.articles = cached.articles;
      AUTO_STATE.lastUpdated = cached.timestamp;
    }
  }

  if (!AUTO_STATE.articles.length) {
    app.innerHTML = `
      <div class="sec-head"><div class="icon">🧠</div><h2>Auto Quiz from Live News</h2><div class="line"></div></div>
      <div class="auto-shell fade">
        <div class="auto-empty">
          <div class="big">📡</div>
          <p>No news articles loaded yet.</p>
          <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:16px;">
            <button class="btn btn-primary" onclick="fetchAllNews().then(renderAutoQuiz)">🔄 Fetch News & Build Quiz</button>
            <button class="btn btn-ghost" onclick="go('#/auto')">⚡ Go to Auto News</button>
          </div>
        </div>
      </div>
    `;
    return;
  }

  const quiz = generateQuizFromNews(false);

  app.innerHTML = `
    <div class="sec-head">
      <div class="icon">🧠</div>
      <h2>Auto Quiz from Live News</h2>
      <div class="line"></div>
      <button class="mini-btn" onclick="go('#/auto')">⚡ View News</button>
    </div>

    <div class="quiz-shell fade" style="max-width:none; margin-bottom:26px; background:linear-gradient(135deg,#4c1d95,#7c3aed,#ec4899); color:#fff;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div>
          <h2 style="color:#fff; margin:0 0 6px;">🎯 50-Question Miscellaneous Test</h2>
          <p style="color:#fff; opacity:.95; margin:0; font-size:14px;">
            Balanced mix across 5 time buckets — perfect for exam revision
          </p>
        </div>
        <span class="badge" style="background:rgba(255,255,255,.25); font-size:13px;">50 Questions</span>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:10px; margin-top:18px;">
        <div style="background:rgba(255,255,255,.15); padding:10px 14px; border-radius:10px;">
          <div style="font-size:12px; opacity:.9;">🔴 Today + Yesterday</div>
          <div style="font-weight:800; font-size:18px;">10 Qs</div>
        </div>
        <div style="background:rgba(255,255,255,.15); padding:10px 14px; border-radius:10px;">
          <div style="font-size:12px; opacity:.9;">🟠 10 days – 7 months</div>
          <div style="font-weight:800; font-size:18px;">10 Qs</div>
        </div>
        <div style="background:rgba(255,255,255,.15); padding:10px 14px; border-radius:10px;">
          <div style="font-size:12px; opacity:.9;">🟡 1 – 5 months</div>
          <div style="font-weight:800; font-size:18px;">10 Qs</div>
        </div>
        <div style="background:rgba(255,255,255,.15); padding:10px 14px; border-radius:10px;">
          <div style="font-size:12px; opacity:.9;">🟢 2 – 8 months</div>
          <div style="font-weight:800; font-size:18px;">10 Qs</div>
        </div>
        <div style="background:rgba(255,255,255,.15); padding:10px 14px; border-radius:10px;">
          <div style="font-size:12px; opacity:.9;">🔵 6 – 12 months</div>
          <div style="font-weight:800; font-size:18px;">10 Qs</div>
        </div>
      </div>

      <button class="btn" style="background:#fff; color:#7c3aed; margin-top:18px; font-weight:800;" onclick="startMiscTest()">
        ▶️ Start 50-Question Test
      </button>
    </div>

    ${quiz ? `
      <div class="quiz-shell fade" style="max-width:none;">
        <div class="quiz-top">
          <h2>🧠 Today's Auto Quiz</h2>
          <span class="badge">${quiz.questions.length} Questions</span>
        </div>
        <p style="color:var(--text-soft); margin-bottom:14px;">Auto-generated from the latest fetched news.</p>
        <button class="btn btn-primary" onclick="startTodayAutoQuiz()">▶️ Start Today's Quiz</button>
      </div>
    ` : `
      <div class="auto-shell fade">
        <div class="auto-empty">
          <div class="big">😕</div>
          <p>Not enough news to generate a topic-wise quiz.</p>
          <button class="btn btn-primary" style="margin-top:16px;" onclick="fetchAllNews().then(renderAutoQuiz)">🔄 Fetch More News</button>
        </div>
      </div>
    `}
  `;
}
window.renderAutoQuiz = renderAutoQuiz;

/* ============ Age Bucket Logic ============ */
function categorizeByAge(article) {
  const d = new Date(article.date + 'T00:00:00');
  const days = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 1)                       return 'recent';
  if (days >= 10 && days <= 210)       return 'mid';
  if (days >= 30 && days <= 150)       return 'month';
  if (days >= 60 && days <= 240)       return 'older';
  if (days >= 180 && days <= 365)      return 'oldest';
  return 'other';
}

function bucketLabel(b) {
  return {
    recent: '🔴 Today/Yesterday',
    mid:    '🟠 10d–7mo',
    month:  '🟡 1–5mo',
    older:  '🟢 2–8mo',
    oldest: '🔵 6–12mo',
  }[b] || '📰 News';
}
window.bucketLabel = bucketLabel;

/* ============ ✅ FIX 4: 50-Question Test Builder ============ */
function startMiscTest() {
  const articles = AUTO_STATE.articles || [];
  if (articles.length < 10) {
    showToast('Not enough news articles. Fetch more first.', 'error');
    return;
  }

  const buckets = { recent: [], mid: [], month: [], older: [], oldest: [] };
  articles.forEach(a => {
    const b = categorizeByAge(a);
    if (buckets[b]) buckets[b].push(a);
  });

  const counts = Object.entries(buckets).map(([k, v]) => `${k}: ${v.length}`).join(', ');
  console.log('[MiscTest] Bucket sizes:', counts);

  const allPool = [...articles].sort(() => Math.random() - 0.5);

  const target = 10;
  const selected = [];
  const order = ['recent', 'mid', 'month', 'older', 'oldest'];
  const usedIds = new Set();

  for (const key of order) {
    let taken = 0;
    for (const a of qShuffle(buckets[key])) {
      if (taken >= target) break;
      if (usedIds.has(a.id)) continue;
      selected.push({ article: a, bucket: key });
      usedIds.add(a.id);
      taken++;
    }
  }

  for (const a of allPool) {
    if (selected.length >= 50) break;
    if (usedIds.has(a.id)) continue;
    const b = categorizeByAge(a);
    selected.push({ article: a, bucket: buckets[b] ? b : 'recent' });
    usedIds.add(a.id);
  }

  if (selected.length < 10) {
    showToast('Not enough unique articles to build the test.', 'error');
    return;
  }

  const pools = { persons: [], places: [], amounts: [], nouns: [] };
  articles.forEach(a => {
    const p  = extractPersonFromText(a.title);
    const pl = extractPlaceFromText(a.title);
    const am = extractAmountFromText((a.title || '') + ' ' + (a.summary || ''));
    const nn = extractProperNouns(a.title);
    if (p  && !pools.persons.includes(p))   pools.persons.push(p);
    if (pl && !pools.places.includes(pl))   pools.places.push(pl);
    if (am && !pools.amounts.includes(am))  pools.amounts.push(am);
    nn.forEach(n => { if (!pools.nouns.includes(n)) pools.nouns.push(n); });
  });

  /* ✅ FIX 4: 3-pass loop to guarantee 50 questions */
  const questions = [];
  const usedQuestions = new Set();

  // Pass 1: Try each selected article once
  for (const { article, bucket } of selected) {
    if (questions.length >= 50) break;
    const q = buildExamStyleQuestion(article, pools);
    if (q && !usedQuestions.has(q.q)) {
      q.bucket = bucket;
      q.articleDate = article.date;
      questions.push(q);
      usedQuestions.add(q.q);
    }
  }

  // Pass 2: Second round with shuffled
  if (questions.length < 50) {
    for (const { article, bucket } of qShuffle(selected)) {
      if (questions.length >= 50) break;
      const q = buildExamStyleQuestion(article, pools);
      if (q && !usedQuestions.has(q.q)) {
        q.bucket = bucket;
        q.articleDate = article.date;
        questions.push(q);
        usedQuestions.add(q.q);
      }
    }
  }

  // Pass 3: Fill remaining from all articles
  if (questions.length < 50) {
    for (const a of qShuffle(articles)) {
      if (questions.length >= 50) break;
      const q = buildExamStyleQuestion(a, pools);
      if (q && !usedQuestions.has(q.q)) {
        q.bucket = categorizeByAge(a);
        q.articleDate = a.date;
        questions.push(q);
        usedQuestions.add(q.q);
      }
    }
  }

  if (questions.length < 5) {
    showToast('Could not generate enough questions. Fetch more news.', 'error');
    return;
  }

  autoQuizState = {
    quiz: {
      id: 'misc-' + Date.now(),
      title: '🎯 Miscellaneous Test — ' + questions.length + ' Questions',
      isMisc: true,
      questions,
    },
    index: 0,
    answers: new Array(questions.length).fill(null),
    finished: false,
  };
  paintAutoQuiz();
}
window.startMiscTest = startMiscTest;

function startTodayAutoQuiz() {
  const quiz = generateQuizFromNews(true);
  if (!quiz) { showToast('Could not generate quiz.', 'error'); return; }
  autoQuizState = {
    quiz, index: 0,
    answers: new Array(quiz.questions.length).fill(null),
    finished: false,
  };
  paintAutoQuiz();
}
window.startTodayAutoQuiz = startTodayAutoQuiz;

/* ============ Paint Auto Quiz ============ */
function paintAutoQuiz() {
  const s = autoQuizState;
  if (!s) return;
  const quiz = s.quiz;
  const total = quiz.questions.length;
  if (s.finished) return paintAutoQuizResult();

  const q = quiz.questions[s.index];
  const pct = (s.index / total) * 100;

  app.innerHTML = `
    <div class="sec-head">
      <div class="icon">🧠</div>
      <h2>Auto Quiz from Live News</h2>
      <div class="line"></div>
      <button class="mini-btn" id="regenQuizBtn">🔄 New Quiz</button>
    </div>
    <div class="quiz-shell fade">
      <div class="quiz-top">
        <h2>🧠 ${esc(quiz.title)}</h2>
        <span class="badge">Question ${s.index + 1} / ${total}</span>
      </div>
      <div class="progress"><div style="width:${pct}%"></div></div>
      <div class="q-text">
        <span class="q-num">${s.index + 1}</span>
        <span class="q-core-type">${esc(q.coreType || 'Current Affairs')}</span>
        ${q.bucket ? `<span class="q-core-type" style="background:#ede9fe; color:#6b21a8; margin-left:6px;">${bucketLabel(q.bucket)}</span>` : ''}
        ${q.articleDate ? `<span class="q-core-type" style="background:#fef3c7; color:#92400e; margin-left:6px;">📅 ${q.articleDate}</span>` : ''}
        ${esc(q.q)}
      </div>
      <div class="options" id="options">
        ${q.options.map((opt, i) => `
          <button class="option" data-i="${i}">
            <span class="letter">${'ABCD'[i]}</span>
            <span>${esc(opt)}</span>
          </button>
        `).join('')}
      </div>
      <div class="explain" id="explain">💡 <b>Explanation:</b> ${esc(q.explain)}</div>
      <div class="quiz-nav">
        <button class="btn btn-ghost" id="prevBtn" ${s.index === 0 ? 'disabled' : ''}>← Previous</button>
        <button class="btn btn-primary" id="nextBtn" disabled>${s.index === total - 1 ? 'Finish ✓' : 'Next →'}</button>
      </div>
    </div>
  `;

  document.getElementById('regenQuizBtn')?.addEventListener('click', () => {
    if (!confirm('Generate a brand-new quiz?')) return;
    generateQuizFromNews(true);
    renderAutoQuiz();
    showToast('New quiz generated!', 'success');
  });

  document.querySelectorAll('#options .option').forEach(btn => {
    btn.addEventListener('click', () => selectAutoQuizOption(parseInt(btn.getAttribute('data-i'))));
  });
  document.getElementById('prevBtn').addEventListener('click', () => {
    if (s.index > 0) { s.index--; paintAutoQuiz(); }
  });
  document.getElementById('nextBtn').addEventListener('click', () => {
    if (s.index === total - 1) { s.finished = true; paintAutoQuizResult(); }
    else { s.index++; paintAutoQuiz(); }
  });

  if (s.answers[s.index] !== null) restoreAutoQuizAnswer(s.answers[s.index]);
}

function selectAutoQuizOption(i) {
  const s = autoQuizState;
  if (s.answers[s.index] !== null) return;
  s.answers[s.index] = i;
  const q = s.quiz.questions[s.index];
  document.querySelectorAll('#options .option').forEach((btn, idx) => {
    btn.classList.add('locked');
    if (idx === q.answer) btn.classList.add('correct');
    else if (idx === i) btn.classList.add('wrong');
  });
  document.getElementById('explain').classList.add('show');
  document.getElementById('nextBtn').disabled = false;
}

function restoreAutoQuizAnswer(i) {
  const s = autoQuizState;
  const q = s.quiz.questions[s.index];
  document.querySelectorAll('#options .option').forEach((btn, idx) => {
    btn.classList.add('locked');
    if (idx === q.answer) btn.classList.add('correct');
    else if (idx === i) btn.classList.add('wrong');
  });
  document.getElementById('explain').classList.add('show');
  document.getElementById('nextBtn').disabled = false;
}

function paintAutoQuizResult() {
  const s = autoQuizState;
  const total = s.quiz.questions.length;
  const score = s.answers.reduce((acc, a, i) => acc + (a === s.quiz.questions[i].answer ? 1 : 0), 0);
  const pct = Math.round((score / total) * 100);

  let msg, color;
  if (pct >= 80) { msg = '🏆 Outstanding!'; color = 'var(--success)'; }
  else if (pct >= 60) { msg = '👍 Solid!'; color = 'var(--primary)'; }
  else if (pct >= 40) { msg = '📖 Review and retry.'; color = 'var(--warning)'; }
  else { msg = '💪 Try again.'; color = 'var(--danger)'; }

  app.innerHTML = `
    <div class="sec-head">
      <div class="icon">🧠</div>
      <h2>Auto Quiz Result</h2>
      <div class="line"></div>
    </div>
    <div class="quiz-shell fade">
      <div class="result">
        <div class="score-ring" style="--pct:${pct}"><span>${pct}%</span></div>
        <h2>Quiz Complete!</h2>
        <p>You scored <b>${score} out of ${total}</b></p>
        <div class="msg" style="background:${color}; color:#fff;">${msg}</div>
        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="renderAutoQuiz()">🔄 New Quiz</button>
          <button class="btn btn-ghost" onclick="go('#/auto')">⚡ Read Live News</button>
        </div>
      </div>
    </div>
  `;
}

/* =========================================================
   ROUTER
   ========================================================= */

function render() {
  const { path, parts } = parseRoute();
  setActiveNav(path);
  window.scrollTo({ top: 0, behavior: 'instant' });

  if (path === '/' || path === '') return renderHome();
  if (path === '/articles') return renderArticles();
  if (path === '/notes') return renderNotes();
  if (parts[0] === 'note' && parts[1]) return renderNote(parts[1]);
  if (path === '/states') return renderStates();
  if (path === '/search') return renderSearch();
  if (parts[0] === 'article' && parts[1]) return renderArticle(parseInt(parts[1]));
  if (parts[0] === 'state-article' && parts[1]) return renderStateArticle(parseInt(parts[1]));
  if (path === '/quiz') return renderQuiz();
  if (path === '/auto') return renderAuto();
  if (path === '/auto-quiz') return renderAutoQuiz();
  if (path === '/downloads') return renderDownloads();
  if (path === '/feedback') return renderFeedback();
  if (path === '/about') return renderAbout();
  renderHome();
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);

render();