
/* ============================================================
   EVENT DATA  -- replace this block with the real college events.
   Fields: id (unique), title, category, date ("YYYY-MM-DD"), time ("HH:MM", 24h),
   venue, description, organiser, capacity (number, 0 = no limit),
   preRegistered (seats already taken outside this portal, usually 0),
   cancellable (true/false), cancelBeforeHours (cancel allowed until this many hours before start).
   The d(n) helper below only keeps the sample dates in the future; use plain "2026-11-14" for real dates.
   ============================================================ */
const d = (n) => { const x = new Date(); x.setDate(x.getDate() + n); return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };
const EVENTS = [
  { id: "k1", title: "Painting and Drawing", category: "Fine Arts", date: "2026-11-02", time: "10:00", venue: "Seminar Hall", organiser: "Cultural Committee", coord: "yoga", capacity: 30, preRegistered: 0, cancellable: true, cancelBeforeHours: 24, description: "College level round. Subject is given at the venue. Bring your own colours and brushes." },
  { id: "k2", title: "Lyrics Writing with Tune", category: "Fine Arts", date: "2026-11-02", time: "14:00", venue: "Tamil Department Hall", organiser: "Dept. of Tamil", coord: "chitra", capacity: 20, preRegistered: 0, cancellable: true, cancelBeforeHours: 24, description: "Write lyrics on the given subject and present them with a tune. Tamil or English." },
  { id: "k3", title: "Poetry Writing", category: "Literature", date: "2026-11-03", time: "10:00", venue: "Tamil Department Hall", organiser: "Dept. of Tamil", coord: "chitra", capacity: 40, preRegistered: 0, cancellable: true, cancelBeforeHours: 24, description: "College level round. Write a poem on the given subject. Time: 1 hour." },
  { id: "k4", title: "Short Story Writing", category: "Literature", date: "2026-11-03", time: "11:30", venue: "Seminar Hall", organiser: "Dept. of Tamil", coord: "chitra", capacity: 40, preRegistered: 0, cancellable: true, cancelBeforeHours: 24, description: "Write a short story on the given subject. Tamil or English. Not more than 2 pages." },
  { id: "k5", title: "Essay Writing", category: "Literature", date: "2026-11-03", time: "14:00", venue: "Library Reading Hall", organiser: "Dept. of English", coord: "sara", capacity: 40, preRegistered: 0, cancellable: true, cancelBeforeHours: 12, description: "Write an essay on the given topic. Time: 75 minutes." },
  { id: "k6", title: "Solo Singing", category: "Music", date: "2026-11-04", time: "10:00", venue: "College Auditorium", organiser: "Cultural Committee", coord: "nag", capacity: 25, preRegistered: 0, cancellable: true, cancelBeforeHours: 24, description: "Film or classical song. Up to 4 minutes. Bring your own track if needed." },
  { id: "k7", title: "Instrumental Music", category: "Music", date: "2026-11-04", time: "13:30", venue: "College Auditorium", organiser: "Cultural Committee", coord: "ram", capacity: 15, preRegistered: 0, cancellable: true, cancelBeforeHours: 24, description: "Solo performance on any instrument. Bring your own instrument. Up to 5 minutes." },
  { id: "k8", title: "Group Music: Western and Traditional", category: "Music", date: "2026-11-04", time: "15:00", venue: "College Auditorium", organiser: "Cultural Committee", coord: "raj", capacity: 12, preRegistered: 0, cancellable: true, cancelBeforeHours: 24, description: "Team of 3 to 6 students. Western or traditional music. The team leader registers once." },
  { id: "k9", title: "Folk Dance and Traditional Arts", category: "Performing Arts", date: "2026-11-05", time: "10:00", venue: "Open Stage", organiser: "Cultural Committee", coord: "jothi", capacity: 30, preRegistered: 0, cancellable: true, cancelBeforeHours: 24, description: "Karagattam, oyilattam, parai and other folk arts. Solo or group. Traditional dress." },
  { id: "k10", title: "Drama", category: "Performing Arts", date: "2026-11-05", time: "14:00", venue: "College Auditorium", organiser: "Cultural Committee", coord: "subbu", capacity: 20, preRegistered: 0, cancellable: true, cancelBeforeHours: 24, description: "Stage play up to 10 minutes. Team of up to 8 students. The team brings its own props." },
  { id: "k11", title: "Oratorical Contest", category: "Speech & Debate", date: "2026-11-06", time: "10:00", venue: "Seminar Hall", organiser: "Dept. of Tamil", coord: "chitra", capacity: 40, preRegistered: 0, cancellable: true, cancelBeforeHours: 12, description: "Speak for 5 minutes in Tamil or English. The topic is given 10 minutes before your turn." },
  { id: "k12", title: "Budget Battle", category: "Speech & Debate", date: "2026-11-06", time: "13:00", venue: "Commerce Department", organiser: "Dept. of Commerce", coord: "deva", capacity: 24, preRegistered: 0, cancellable: true, cancelBeforeHours: 24, description: "Debate on the Union or State budget. Team of 2 students." },
  { id: "k13", title: "Stand-up Comedy", category: "Expression", date: "2026-11-06", time: "15:00", venue: "College Auditorium", organiser: "Cultural Committee", coord: "suba", capacity: 15, preRegistered: 0, cancellable: true, cancelBeforeHours: 12, description: "3 minute stand-up act in Tamil or English. The coordinator checks the content before the show." },
  { id: "k14", title: "Monologue", category: "Expression", date: "2026-11-06", time: "16:00", venue: "College Auditorium", organiser: "Dept. of English", coord: "sara", capacity: 15, preRegistered: 0, cancellable: true, cancelBeforeHours: 12, description: "Solo acting piece up to 4 minutes. Own script or adapted script." },
  { id: "k15", title: "Eco Creative Project Display", category: "Eco Arts", date: "2026-11-07", time: "10:00", venue: "Main Block Corridor", organiser: "Dept. of Mathematics", coord: "boo", capacity: 20, preRegistered: 0, cancellable: true, cancelBeforeHours: 24, description: "Show a model, poster or craft on an environment theme. Reused or natural material preferred. Set up by 9:30 AM." },
  { id: "k16", title: "Treasure Hunt", category: "Innovation", date: "2026-11-07", time: "11:00", venue: "College Campus", organiser: "Dept. of Computer Science", coord: "chen", capacity: 60, preRegistered: 0, cancellable: true, cancelBeforeHours: 12, description: "Team of 4 students. Clues are placed around the campus." },
  { id: "k17", title: "Tech-Creative Showcase", category: "Innovation", date: "2026-11-07", time: "13:00", venue: "Computer Science Lab", organiser: "Dept. of Computer Science", coord: "chen", capacity: 25, preRegistered: 0, cancellable: true, cancelBeforeHours: 24, description: "Show an animation, web page, app idea or mini game you made. 5 minutes for each entry." },
  { id: "k18", title: "Silambam and Martial Arts Show", category: "Innovation", date: "2026-11-07", time: "15:00", venue: "College Ground", organiser: "Physical Education", coord: "sara", capacity: 12, preRegistered: 0, cancellable: true, cancelBeforeHours: 12, description: "Silambam or other martial arts display. Solo or pair. Safety gear is checked before the show." }
];
const DEPARTMENTS = ["B.Sc Computer Science", "B.A Tamil", "B.A English", "B.Com", "B.Sc Mathematics"];
const MAX_EVENTS = 3;
const STAFF = [
  { id: "chitra", name: "Dr. K. Chitrarasu", dept: "Tamil", role: "Assistant Professor & Head", hod: true, qual: "M.A., M.Phil., Ph.D.", mobile: "8610960719", email: "cibichittu@gmail.com" },
  { id: "boo", name: "Dr. J. Boobalan", dept: "Maths", role: "Assistant Professor & Head", hod: true, qual: "M.Sc., M.Phil., Ph.D., M.Sc.(C.S)", mobile: "9443408229", email: "jboobalan@hotmail.com" },
  { id: "chen", name: "Mr. D. Chenthil Kumar", dept: "Computer Science", role: "Assistant Professor & Head", hod: true, qual: "M.Sc. (C.S)., M.Phil., B.Ed (C.S)", mobile: "9629428508", email: "ckchenthil@gmail.com" },
  { id: "deva", name: "Dr. M. Devanathan", dept: "Commerce", role: "Assistant Professor & Head", hod: true, qual: "B.E., M.B.A., M.Phil., Ph.D.", mobile: "9994711748", email: "dr.m.devanathan@gmail.com" },
  { id: "sara", name: "Dr. R. Saravanan", dept: "English", role: "Director of Physical Education & Head (i/c)", hod: true, qual: "M.P.E.S., M.Phil., Ph.D., M.Sc.(Yoga), M.Sc.(Sports Journalism)", mobile: "9786791911", email: "sunmay81@gmail.com" },
  { id: "nag", name: "Mr. B. Nagarajan", dept: "Computer Science", role: "Assistant Professor", qual: "B.Com., P.G.D.C.A., M.Sc(IT)., M.Phil.", mobile: "9843188150", email: "thilaknaga@gmail.com" },
  { id: "raj", name: "Dr. N. Rajkumar", dept: "Computer Science", role: "Assistant Professor", qual: "M.C.A., M.Phil., Ph.D.", mobile: "9994197734", email: "raju.prg@gmail.com" },
  { id: "ram", name: "Mr. R. Ramachandran", dept: "Computer Science", role: "Assistant Professor", qual: "M.C.A., M.Phil.", mobile: "9842121181", email: "rammcablack@gmail.com" },
  { id: "suba", name: "Dr. N. Subalakshmi", dept: "Computer Science", role: "Assistant Professor", qual: "M.C.A., M.Phil., Ph.D", mobile: "9790327569", email: "subhaabi12@gmail.com" },
  { id: "yoga", name: "Mrs. K. Yogalakshmi", dept: "Commerce", role: "Assistant Professor", qual: "B.E, M.B.A", mobile: "7708685813", email: "yogakalyanam76@gmail.com" },
  { id: "subbu", name: "Dr. S. Subbulakshmi", dept: "Commerce", role: "Assistant Professor", qual: "MBA., M.Phil., Ph.D", mobile: "9788082974", email: "subbumohan23@gmail.com" },
  { id: "jothi", name: "Dr. G. Jothi", dept: "Commerce", role: "Assistant Professor", qual: "BE., MBA., MPhil., PhD.", mobile: "9566432397", email: "jothijayvee@gmail.com" },
  { id: "nata", name: "Dr. N.O. Natarajan", dept: "Library", role: "Assistant Professor cum Librarian", qual: "B.Sc., B.L.I.S., M.L.I.S., M.Phil., Ph.D.", mobile: "9443665636", email: "nondlis.au@gmail.com" }
];
const OFFICE = [["Thiru P.M. Arivazhagan", "Superintendent"], ["Thiru S. Balaji", "Assistant"], ["Thiru G. Vengatajalapathi", "Assistant"], ["Thiru R. Dharmaraj", "Junior Assistant (Selection Grade)"], ["Thiru B. Sankar", "Junior Assistant"], ["Tmt. V. C. Rajalakshmi", "Assistant Programmer"], ["Thiru S. Saravanan", "Assistant Programmer"], ["Thiru K. Venkatesan", "Typist"], ["Thiru S. Senthilmurugan", "Office Assistant"], ["Thiru B. Vivekanandan", "Office Assistant"]];
/* ============================================================ */

const KEY = "campusEvents.registrations.v1", EMAILKEY = "campusEvents.email.v1";
let mem = { regs: [], email: "" };
function load(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } }
function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
let regs = load(KEY, mem.regs);
/* ---------- backend (Supabase). Set the URL and key in config.js. Without it the app keeps data in Local Storage. ---------- */
const BE = window.KKT_BACKEND && window.KKT_BACKEND.url ? window.KKT_BACKEND : null;
let online = false, counts = {};
async function rpc(name, args) {
  const r = await fetch(BE.url + "/rest/v1/rpc/" + name, { method: "POST", headers: { apikey: BE.key, "Content-Type": "application/json" }, body: JSON.stringify(args || {}) });
  if (!r.ok) throw new Error("http " + r.status);
  return r.json();
}
const SERVER_ERR = {
  duplicate: "Already registered for this event with this email or register number.",
  limit: "You can register for up to 3 events. Cancel one to add another.",
  closed: "Registration is closed for this event.",
  no_event: "This event was not found.",
  invalid_name: "Enter your full name.", invalid_email: "Enter a valid email, like name@example.com.", invalid_roll: "Enter your register number.", invalid_fields: "Select your department and year."
};
let myEmail = load(EMAILKEY, "");
const S = { q: "", cat: "All", dateMode: "any", dateVal: "", view: "events", openId: null, sort: "soon" };
const FAVKEY = "campusEvents.fav.v1", THEMEKEY = "campusEvents.theme.v1";
let fav = load(FAVKEY, []);
const CATCOL = { "Fine Arts": "#a83a2a", Literature: "#1f5fa8", Music: "#6b3fb5", "Performing Arts": "#d6336c", "Speech & Debate": "#8a5a00", Expression: "#0b7f86", "Eco Arts": "#1d7a45", Innovation: "#3b4cc0" };
const cc = (c) => CATCOL[c] || "#0f4c4a";
let cdT;

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const start = (ev) => new Date(ev.date + "T" + ev.time + ":00");
const fmtDay = (ev) => start(ev).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
const fmtTime = (ev) => start(ev).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
const taken = (ev) => (online && counts[ev.id] !== undefined) ? counts[ev.id] : ev.preRegistered + regs.filter((r) => r.eventId === ev.id).length;
const left = (ev) => (ev.capacity > 0 ? Math.max(0, ev.capacity - taken(ev)) : Infinity);
const isFull = (ev) => ev.capacity > 0 && left(ev) === 0;
const started = (ev) => start(ev) <= new Date();
const canCancel = (ev) => ev.cancellable && start(ev) - new Date() > ev.cancelBeforeHours * 3600000;
const evById = (id) => EVENTS.find((e) => e.id === id);
const normEmail = (e) => e.trim().toLowerCase();
const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());

function toast(msg) { const t = $("toast"); t.textContent = msg; t.hidden = false; clearTimeout(toast.h); toast.h = setTimeout(() => (t.hidden = true), 2600); }

function seatInfo(ev) {
  if (ev.capacity === 0) return { pill: '<span class="pill ok">Open entry</span>', bar: "", line: taken(ev) + " registered" };
  const l = left(ev), pct = Math.min(100, Math.round((taken(ev) / ev.capacity) * 100));
  const cls = l === 0 ? "full" : l <= Math.max(3, ev.capacity * 0.15) ? "few" : "";
  const pill = l === 0 ? '<span class="pill full">Full</span>' : cls === "few" ? '<span class="pill few">' + l + ' left</span>' : '<span class="pill ok">Open</span>';
  return { pill, bar: '<div class="seatbar" aria-hidden="true"><i class="' + cls + '" style="width:' + pct + '%"></i></div>', line: taken(ev) + " / " + ev.capacity + " seats" };
}

function inDateFilter(ev) {
  const t = start(ev), now = new Date(), sod = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (S.dateMode === "today") return ev.date === d(0);
  if (S.dateMode === "week") return t >= now && t < new Date(sod.getTime() + 7 * 86400000);
  if (S.dateMode === "month") return t.getMonth() === now.getMonth() && t.getFullYear() === now.getFullYear();
  if (S.dateMode === "pick") return !S.dateVal || ev.date === S.dateVal;
  return true;
}

function renderCats() {
  const cats = ["All"].concat([...new Set(EVENTS.map((e) => e.category))]).concat(["__saved"]);
  $("cats").innerHTML = cats.map((c) => '<button type="button" class="chip" aria-pressed="' + (S.cat === c) + '" data-cat="' + esc(c) + '">' + (c === "__saved" ? "Saved (" + fav.length + ")" : esc(c)) + "</button>").join("");
}

function renderEvents() {
  const q = S.q.trim().toLowerCase();
  const list = EVENTS.filter((e) => !started(e) || S.dateMode === "pick")
    .filter((e) => (S.cat === "All" || (S.cat === "__saved" ? fav.includes(e.id) : e.category === S.cat)) && (!q || e.title.toLowerCase().includes(q)) && inDateFilter(e))
    .sort((a, b) => S.sort === "left" ? (Math.min(left(b), 9999) - Math.min(left(a), 9999)) || (start(a) - start(b)) : S.sort === "popular" ? (taken(b) - taken(a)) || (start(a) - start(b)) : start(a) - start(b));
  $("countLine").textContent = list.length + (list.length === 1 ? " event" : " events");
  if (!list.length) { $("eventList").innerHTML = '<li class="empty">No events match. Clear the search or pick another date.</li>'; return; }
  $("eventList").innerHTML = list.map((ev, i) => {
    const t = start(ev), s = seatInfo(ev), mine = myEmail && regs.some((r) => r.eventId === ev.id && r.email === normEmail(myEmail));
    return '<li class="evli" style="--i:' + Math.min(i, 8) + ';--cc:' + cc(ev.category) + '"><button type="button" class="card" data-open="' + esc(ev.id) + '">' +
      '<div class="stub"><b>' + t.getDate() + "</b><small>" + t.toLocaleDateString("en-IN", { month: "short" }) + "</small></div>" +
      "<div><h3>" + esc(ev.title) + '</h3><div class="meta"><span>' + esc(fmtTime(ev)) + "</span><span>" + esc(ev.venue) + "</span></div>" +
      '<div class="meta" style="margin-top:6px"><span class="pill cat">' + esc(ev.category) + "</span>" + s.pill + (mine ? '<span class="pill" style="background:var(--good);color:#fff">Registered</span>' : "") + "</div>" +
      s.bar + '<div class="seatline"><span>' + esc(s.line) + "</span></div></div></button>" + heartBtn(ev.id) + "</li>";
  }).join("");
}

function myRegs() { const e = normEmail(myEmail || ""); return e ? regs.filter((r) => r.email === e).sort((a, b) => { const A = evById(a.eventId), B = evById(b.eventId); return (A && B) ? start(A) - start(B) : 0; }) : []; }

function renderMine() {
  $("myEmail").value = myEmail;
  const box = $("myList");
  if (!myEmail || !emailOk(myEmail)) { box.innerHTML = '<div class="empty">Enter the email you used to register to see your events.</div>'; return; }
  const rows = myRegs();
  if (!rows.length) { box.innerHTML = '<div class="empty">No registrations for this email yet. Open Events and tap one to register.</div>'; return; }
  box.innerHTML = rows.map((r) => {
    const ev = evById(r.eventId); if (!ev) return "";
    const t = start(ev), ok = canCancel(ev);
    const why = !ev.cancellable ? "Cancellation not allowed for this event." : started(ev) ? "Event already started." : ok ? "" : "Cancellation closed " + ev.cancelBeforeHours + " h before start.";
    return '<div class="card"><div class="stub"><b>' + t.getDate() + "</b><small>" + t.toLocaleDateString("en-IN", { month: "short" }) + "</small></div><div>" +
      "<h3>" + esc(ev.title) + '</h3><div class="meta"><span>' + esc(fmtDay(ev)) + ", " + esc(fmtTime(ev)) + "</span><span>" + esc(ev.venue) + "</span></div>" +
      '<div class="meta" style="margin-top:6px"><span>' + esc(r.name) + " &middot; " + esc(r.roll) + "</span></div>" +
      '<div class="actions"><button class="btn" data-ticket="' + esc(r.id) + '">View ticket</button><button class="btn ghost" data-open="' + esc(ev.id) + '">Details</button>' +
      (ok ? '<button class="btn danger" data-cancel="' + esc(r.id) + '">Cancel registration</button>' : '<span class="meta" style="align-self:center">' + esc(why) + "</span>") +
      "</div></div></div>";
  }).join("");
}

function updateBadge() { $("mineCount").textContent = myRegs().length; if (typeof renderInsights === "function" && $("insights")) renderInsights(); }

const dayKey = (dt) => dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
function playIn(anim) {
  if (!anim || RM) return;
  const root = $("insights");
  root.classList.add("enter"); clearTimeout(playIn.h); playIn.h = setTimeout(() => root.classList.remove("enter"), 1300);
  root.querySelectorAll(".track i").forEach((i) => { const w = i.style.width; i.style.width = "0"; requestAnimationFrame(() => requestAnimationFrame(() => { i.style.width = w; })); });
  const ring = root.querySelector(".ring circle:nth-of-type(2)");
  if (ring) { const da = ring.getAttribute("stroke-dasharray"); ring.style.transition = "none"; ring.style.strokeDasharray = "0 999"; void ring.getBoundingClientRect(); ring.style.transition = "stroke-dasharray 1.1s cubic-bezier(.2,.8,.2,1)"; ring.style.strokeDasharray = da; }
  root.querySelectorAll(".kpi b").forEach((b) => { const n = +b.textContent, t0 = performance.now(); const step = (t) => { const p = Math.min(1, (t - t0) / 900); b.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); }; b.textContent = "0"; requestAnimationFrame(step); });
}
function bump() { const l = $("eventList"); l.classList.remove("enter"); void l.offsetWidth; l.classList.add("enter"); clearTimeout(bump.h); bump.h = setTimeout(() => l.classList.remove("enter"), 1500); }
function confetti() {
  if (RM) return;
  const cv = document.createElement("canvas"); cv.width = innerWidth; cv.height = innerHeight;
  cv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:60";
  document.body.appendChild(cv); const g = cv.getContext("2d"), cs = getComputedStyle(document.documentElement);
  const cols = ["--primary", "--accent", "--good", "--bad"].map((k) => cs.getPropertyValue(k).trim() || "#e0a01b");
  const ps = Array.from({ length: 110 }, () => ({ x: innerWidth * (0.2 + Math.random() * 0.6), y: innerHeight * 0.35, vx: (Math.random() - 0.5) * 9, vy: -4 - Math.random() * 8, s: 5 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: cols[Math.floor(Math.random() * cols.length)] }));
  const t0 = performance.now();
  (function f(t) {
    g.clearRect(0, 0, cv.width, cv.height); const k = t - t0;
    ps.forEach((p) => { p.vy += 0.28; p.x += p.vx; p.y += p.vy; p.r += p.vr; g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.globalAlpha = Math.max(0, 1 - k / 2200); g.fillStyle = p.c; g.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); g.restore(); });
    if (k < 2200) requestAnimationFrame(f); else cv.remove();
  })(t0);
}
function renderInsights(anim) {
  const up = EVENTS.filter((e) => !started(e)).sort((a, b) => start(a) - start(b));
  const nx = $("nextUp");
  if (up.length) {
    const ms = start(up[0]) - new Date(), dd = Math.floor(ms / 86400000), hh = Math.floor((ms % 86400000) / 3600000);
    const when = dd > 0 ? "in " + dd + (dd === 1 ? " day " : " days ") + hh + " h" : hh > 0 ? "in " + hh + " h" : "starting soon";
    nx.innerHTML = '<div class="next"><div><small>Next up, ' + esc(when) + "</small><b>" + esc(up[0].title) + '</b><span class="when">' + esc(fmtDay(up[0])) + ", " + esc(fmtTime(up[0])) + " &middot; " + esc(up[0].venue) + '</span></div><button type="button" data-open="' + esc(up[0].id) + '">View event</button></div>';
  } else nx.innerHTML = "";
  const tkh = up.map((e) => '<span><i style="background:' + cc(e.category) + '"></i>' + esc(e.title) + " &middot; " + esc(start(e).toLocaleDateString("en-IN", { day: "numeric", month: "short" })) + "</span>").join("");
  if (renderInsights.tk !== tkh) { renderInsights.tk = tkh; $("ticker").innerHTML = up.length ? '<div class="ticker-in"><div class="tk-set">' + tkh + '</div><div class="tk-set" aria-hidden="true">' + tkh + "</div></div>" : ""; }

  const capEv = up.filter((e) => e.capacity > 0);
  const cap = capEv.reduce((a, e) => a + e.capacity, 0), tk = capEv.reduce((a, e) => a + taken(e), 0), pct = cap ? Math.round((tk / cap) * 100) : 0;
  const C = 2 * Math.PI * 42;
  const ring = '<svg class="ring" viewBox="0 0 110 110" role="img" aria-label="' + pct + ' percent of seats filled"><circle cx="55" cy="55" r="42" fill="none" stroke="var(--chip)" stroke-width="12"/><circle cx="55" cy="55" r="42" fill="none" stroke="var(--primary)" stroke-width="12" stroke-linecap="round" stroke-dasharray="' + ((C * pct) / 100).toFixed(1) + " " + C.toFixed(1) + '" transform="rotate(-90 55 55)"/><text x="55" y="56" text-anchor="middle" class="rn">' + pct + '%</text><text x="55" y="72" text-anchor="middle" class="rl">filled</text></svg>';
  const kp = [[up.length, "Upcoming events"], [tk, "Seats taken"], [Math.max(0, cap - tk), "Seats left"], [myRegs().length, "Your events"]];
  const cats = {}; up.forEach((e) => (cats[e.category] = (cats[e.category] || 0) + taken(e)));
  const ce = Object.entries(cats).sort((a, b) => b[1] - a[1]), mx = Math.max(1, ...ce.map((x) => x[1]));
  const now = new Date(), byDay = {}; up.forEach((e) => (byDay[e.date] = (byDay[e.date] || 0) + 1));
  let days = "";
  for (let i = 0; i < 14; i++) {
    const dt = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i), k = dayKey(dt), n = byDay[k] || 0;
    days += '<button type="button" class="day' + (n ? " has" : "") + '"' + (n ? ' data-day="' + k + '"' : " disabled") + ' aria-label="' + esc(dt.toDateString()) + ", " + n + ' events"><small>' + dt.toLocaleDateString("en-IN", { weekday: "short" }).slice(0, 3) + "</small><b>" + dt.getDate() + '</b><span class="dots">' + "<i></i>".repeat(Math.min(n, 3)) + "</span></button>";
  }
  const fill = up.map((e) => {
    if (e.capacity === 0) return '<button type="button" class="hb" data-open="' + esc(e.id) + '"><span class="nm">' + esc(e.title) + '</span><div class="track"><i class="open" style="width:100%"></i></div><span class="val">open</span></button>';
    const p = Math.round((taken(e) / e.capacity) * 100), l = left(e), cls = l === 0 ? "full" : l <= Math.max(3, e.capacity * 0.15) ? "few" : "";
    return '<button type="button" class="hb" data-open="' + esc(e.id) + '"><span class="nm">' + esc(e.title) + '</span><div class="track"><i class="' + cls + '" style="width:' + p + '%"></i></div><span class="val">' + p + "%</span></button>";
  }).join("");
  $("insights").innerHTML =
    '<section class="panel"><h3>At a glance</h3><div class="kpis">' + kp.map((x) => '<div class="kpi"><b>' + x[0] + "</b><span>" + x[1] + "</span></div>").join("") + "</div></section>" +
    '<section class="panel"><h3>Seats filled</h3><div class="ringrow">' + ring + '<p class="ringtxt">' + tk + " of " + cap + " seats taken across events with a seat limit.</p></div></section>" +
    '<section class="panel"><h3>Next 14 days</h3><div class="days">' + days + '</div><p class="hint">Tap a highlighted day to filter events.</p></section>' +
    '<section class="panel"><h3>Registrations by category</h3>' + (ce.map((x) => '<div class="hb"><span class="nm">' + esc(x[0]) + '</span><div class="track"><i style="width:' + (x[1] / mx) * 100 + '%;background:' + cc(x[0]) + '"></i></div><span class="val">' + x[1] + "</span></div>").join("") || '<p class="hint">No upcoming events.</p>') + "</section>" +
    '<section class="panel"><h3>Seat fill by event</h3>' + (fill || '<p class="hint">No upcoming events.</p>') + '<p class="hint">Amber means few seats left. Red means full.</p></section>';
  playIn(anim);
}

function setView(v) {
  if (v === "insights" && matchMedia("(min-width: 960px)").matches) v = "events";
  S.view = v; document.body.dataset.view = v;
  $("eventsView").hidden = v !== "events"; $("mineView").hidden = v !== "mine"; $("staffView").hidden = v !== "staff";
  $("tab-events").setAttribute("aria-selected", v === "events"); $("tab-mine").setAttribute("aria-selected", v === "mine"); $("tab-insights").setAttribute("aria-selected", v === "insights"); $("tab-staff").setAttribute("aria-selected", v === "staff");
  renderInsights(true);
  try { history.replaceState(null, "", "#" + v); } catch (e) {}
  if (v === "mine") renderMine(); else if (v === "staff") renderStaff(); else { renderEvents(); bump(); }
}

/* ---------- detail sheet ---------- */
function openSheet(id) {
  S.openId = id; document.body.style.overflow = "hidden";
  drawSheet();
}
function closeSheet() { clearInterval(cdT); S.openId = null; $("sheetRoot").innerHTML = ""; document.body.style.overflow = ""; renderEvents(); renderMine(); updateBadge(); }

function drawSheet(msg) {
  const ev = evById(S.openId); if (!ev) return;
  const s = seatInfo(ev), mineReg = myEmail ? regs.find((r) => r.eventId === ev.id && r.email === normEmail(myEmail)) : null;
  let action;
  if (mineReg) {
    const ok = canCancel(ev);
    action = '<div class="notice good"><b>You are registered</b> as ' + esc(mineReg.name) + " (" + esc(mineReg.email) + ").</div>" +
      '<button type="button" class="btn block" data-ticket="' + esc(mineReg.id) + '">View my ticket</button>' +
      (ok ? '<button class="btn danger block" id="cancelBtn" data-cancel="' + esc(mineReg.id) + '">Cancel my registration</button>'
          : '<p class="meta">' + (!ev.cancellable ? "This event does not allow cancellation." : started(ev) ? "Event already started." : "Cancellation closed " + ev.cancelBeforeHours + " hours before start.") + "</p>");
  } else if (started(ev)) {
    action = '<div class="notice bad">Registration closed. This event has started.</div>';
  } else if (isFull(ev)) {
    action = '<div class="notice bad"><b>Event is full.</b> All ' + ev.capacity + " seats are taken. Registration is closed.</div>";
  } else {
    action = '<form class="formbox" id="regForm" novalidate><h3>Register</h3>' +
      '<div class="field"><label for="f-name">Full name</label><input class="input" id="f-name" autocomplete="name"><div class="err" data-err="name"></div></div>' +
      '<div class="field"><label for="f-email">Email</label><input class="input" id="f-email" type="email" inputmode="email" autocomplete="email" value="' + esc(myEmail) + '"><div class="err" data-err="email"></div></div>' +
      '<div class="field"><label for="f-roll">Register number</label><input class="input" id="f-roll" autocomplete="off"><div class="err" data-err="roll"></div></div>' +
      '<div class="row2 stack"><div class="field"><label for="f-dept">Department</label><select class="input" id="f-dept"><option value="">Select</option>' + DEPARTMENTS.map((x) => "<option>" + esc(x) + "</option>").join("") + '</select><div class="err" data-err="dept"></div></div>' +
      '<div class="field"><label for="f-year">Year</label><select class="input" id="f-year"><option value="">Select</option><option>I</option><option>II</option><option>III</option></select><div class="err" data-err="year"></div></div></div>' +
      '<div class="err" id="formErr" role="alert"></div>' +
      '<button class="btn block" type="submit">Confirm registration</button></form>';
  }
  $("sheetRoot").innerHTML = '<div class="sheet-back" id="back"><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sh-title">' +
    '<div class="sheet-top"><div class="meta"><span class="pill cat" style="--cc:' + cc(ev.category) + '">' + esc(ev.category) + "</span>" + s.pill + '</div><button class="close" id="closeBtn" aria-label="Close">&times;</button></div>' +
    '<h2 id="sh-title">' + esc(ev.title) + "</h2>" +
    '<dl class="facts"><dt>Date</dt><dd>' + esc(fmtDay(ev)) + "</dd><dt>Time</dt><dd>" + esc(fmtTime(ev)) + "</dd><dt>Venue</dt><dd>" + esc(ev.venue) + "</dd><dt>Organiser</dt><dd>" + esc(ev.organiser) + coordRow(ev) +
    "</dd><dt>Seats</dt><dd>" + esc(s.line) + (ev.capacity > 0 ? " (" + left(ev) + " left)" : "") + "</dd><dt>Cancel</dt><dd>" + (ev.cancellable ? "Until " + ev.cancelBeforeHours + " hours before start" : "Not allowed") + "</dd></dl>" +
    '<p class="desc">' + esc(ev.description) + "</p>" + cdHtml(ev) + shareRow(ev) + (msg ? '<div class="notice good" role="status" style="margin-bottom:12px">' + esc(msg) + "</div>" : "") + action + "</div></div>";
  $("closeBtn").focus(); startCd(ev);
}

function submitReg(e) {
  e.preventDefault();
  const ev = evById(S.openId), v = (id) => $(id).value.trim();
  const data = { name: v("f-name"), email: v("f-email"), roll: v("f-roll"), dept: v("f-dept"), year: v("f-year") };
  const errs = {};
  if (data.name.length < 2) errs.name = "Enter your full name.";
  if (!data.email) errs.email = "Enter your email."; else if (!emailOk(data.email)) errs.email = "Enter a valid email, like name@example.com.";
  if (!data.roll) errs.roll = "Enter your register number.";
  if (!data.dept) errs.dept = "Select your department.";
  if (!data.year) errs.year = "Select your year.";
  document.querySelectorAll("[data-err]").forEach((n) => (n.textContent = errs[n.dataset.err] || ""));
  ["name", "email", "roll", "dept", "year"].forEach((k) => $("f-" + k).setAttribute("aria-invalid", errs[k] ? "true" : "false"));
  $("formErr").textContent = "";
  const first = Object.keys(errs)[0]; if (first) { $("f-" + first).focus(); return; }
  const em = normEmail(data.email);
  if (regs.some((r) => r.eventId === ev.id && (r.email === em || r.roll.toLowerCase() === data.roll.toLowerCase()))) { $("formErr").textContent = "Already registered for this event with this email or register number."; return; }
  if (regs.filter((r) => r.email === em).length >= MAX_EVENTS) { $("formErr").textContent = "You can register for up to " + MAX_EVENTS + " events. Cancel one to add another."; return; }
  if (isFull(ev)) { drawSheet(); return; }
  if (started(ev)) { drawSheet(); return; }
  if (online) { serverRegister(ev, data, em); return; }
  regs.push({ id: "r" + Date.now() + Math.floor(Math.random() * 1000), eventId: ev.id, name: data.name, email: em, roll: data.roll, dept: data.dept, year: data.year, at: new Date().toISOString() });
  save(KEY, regs); myEmail = em; save(EMAILKEY, myEmail);
  toast("Registered for " + ev.title); confetti();
  drawSheet("Registration confirmed. Find it under My registrations.");
  updateBadge();
}

async function serverRegister(ev, data, em) {
  const btn = document.querySelector("#regForm button[type=submit]"); if (btn) btn.disabled = true;
  try {
    const res = await rpc("kkt_register_event", { p_event_id: ev.id, p_name: data.name, p_email: em, p_roll: data.roll, p_dept: data.dept, p_year: data.year });
    if (!res.ok) {
      await refresh();
      if (res.error === "full") { drawSheet(); return; }
      $("formErr").textContent = SERVER_ERR[res.error] || "Could not register. Try again.";
      if (btn) btn.disabled = false; return;
    }
    myEmail = em; save(EMAILKEY, myEmail);
    await refresh();
    toast("Registered for " + ev.title); confetti();
    drawSheet("Registration confirmed. Find it under My registrations.");
  } catch (e) {
    $("formErr").textContent = "No connection. Check your internet and try again.";
    if (btn) btn.disabled = false;
  }
}
async function serverCancel(id) {
  const r = regs.find((x) => x.id === id); if (!r) return;
  try {
    const res = await rpc("kkt_cancel_registration", { p_id: id, p_email: r.email });
    await refresh();
    if (!res.ok) { toast(res.error === "too_late" || res.error === "not_allowed" ? "Cancellation is closed for this event." : "Could not cancel. Try again."); return; }
    toast("Registration cancelled");
    if (S.openId) drawSheet("Registration cancelled.");
  } catch (e) { toast("No connection. Try again."); }
}
async function refresh() {
  if (!online) return;
  try {
    const c = await rpc("kkt_get_event_counts"); counts = {}; c.forEach((x) => { counts[x.event_id] = x.taken; });
    if (myEmail && emailOk(myEmail)) {
      const rows = await rpc("kkt_my_registrations", { p_email: myEmail }), em = normEmail(myEmail);
      regs = rows.map((r) => ({ id: r.id, eventId: r.event_id, name: r.name, email: em, roll: r.roll, dept: r.dept, year: r.year, at: r.created_at }));
    } else regs = [];
  } catch (e) {}
  renderEvents(); updateBadge(); if (S.view === "mine") renderMine();
}
async function syncBackend() {
  if (!BE) return;
  try {
    const c = await rpc("kkt_get_event_counts");
    if (!Array.isArray(c) || !c.length) return;
    online = true; regs = [];
    $("storeNote").textContent = "Your registrations are saved online.";
    setInterval(() => { if (!document.hidden) refresh(); }, 20000);
    await refresh();
  } catch (e) {}
}

let pendingCancel = null;
function cancelReg(id, btn) {
  const r = regs.find((x) => x.id === id); if (!r) return;
  const ev = evById(r.eventId);
  if (!canCancel(ev)) { toast("Cancellation is closed for this event."); return; }
  if (pendingCancel !== id) {
    pendingCancel = id; btn.textContent = "Tap again to confirm"; btn.className = "btn dangerfill" + (btn.classList.contains("block") ? " block" : "");
    setTimeout(() => { if (pendingCancel === id) { pendingCancel = null; if (btn.isConnected) { btn.textContent = "Cancel registration"; btn.className = "btn danger" + (btn.id === "cancelBtn" ? " block" : ""); } } }, 4000);
    return;
  }
  pendingCancel = null;
  if (online) { serverCancel(id); return; }
  regs = regs.filter((x) => x.id !== id); save(KEY, regs);
  toast("Registration cancelled");
  if (S.openId) drawSheet("Registration cancelled.");
  renderMine(); renderEvents(); updateBadge();
}

/* ---------- wiring ---------- */
document.addEventListener("click", (e) => {
  const tkf = e.target.closest("#tk"); if (tkf) { tkf.classList.toggle("flip"); return; }
  if (e.target.id === "tkBack") { closeTicket(); return; }
  const t = e.target.closest("button,[data-open]"); if (!t) { if (e.target.id === "back") closeSheet(); return; }
  if (t.dataset.view) setView(t.dataset.view);
  else if (t.dataset.sdept !== undefined) { sDept = t.dataset.sdept; renderStaff(); }
  else if (t.dataset.ctext) copyText(t.dataset.ctext);
  else if (t.dataset.fav) toggleFav(t.dataset.fav, t);
  else if (t.dataset.ticket) openTicket(t.dataset.ticket);
  else if (t.dataset.copy) copyDetails(t.dataset.copy);
  else if (t.id === "tkClose") closeTicket();
  else if (t.id === "themeBtn") toggleTheme();
  else if (t.id === "toTop") window.scrollTo({ top: 0, behavior: "smooth" });
  else if (t.dataset.day) { S.dateMode = "pick"; S.dateVal = t.dataset.day; $("dateMode").value = "pick"; $("datePickField").hidden = false; $("dateVal").value = S.dateVal; setView("events"); window.scrollTo({ top: 0, behavior: "smooth" }); }
  else if (t.dataset.cat) { S.cat = t.dataset.cat; renderCats(); renderEvents(); bump(); }
  else if (t.dataset.cancel) cancelReg(t.dataset.cancel, t);
  else if (t.dataset.open) openSheet(t.dataset.open);
  else if (t.id === "closeBtn") closeSheet();
});
document.addEventListener("submit", (e) => { if (e.target.id === "regForm") submitReg(e); });
document.addEventListener("pointermove", (e) => {
  if (e.pointerType === "touch" || RM) return;
  const rig = $("rig"); if (rig) { rig.style.setProperty("--px", ((e.clientX / innerWidth - 0.5) * 2).toFixed(2)); rig.style.setProperty("--py", ((e.clientY / innerHeight - 0.5) * 2).toFixed(2)); }
  const c = e.target.closest && e.target.closest("button.card");
  if (c) { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; c.style.setProperty("--ry", ((x - 0.5) * 10).toFixed(1) + "deg"); c.style.setProperty("--rx", ((0.5 - y) * 8).toFixed(1) + "deg"); c.style.setProperty("--gx", (x * 100).toFixed(0) + "%"); c.style.setProperty("--gy", (y * 100).toFixed(0) + "%"); }
});
document.addEventListener("pointerout", (e) => {
  const c = e.target.closest && e.target.closest("button.card");
  if (c && !c.contains(e.relatedTarget)) { c.style.removeProperty("--rx"); c.style.removeProperty("--ry"); }
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { if ($("tkBack")) closeTicket(); else if (S.openId) closeSheet(); } else if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !S.openId) { e.preventDefault(); setView("events"); $("q").focus(); } });
$("q").addEventListener("input", (e) => { S.q = e.target.value; renderEvents(); });
$("dateMode").addEventListener("change", (e) => { S.dateMode = e.target.value; $("datePickField").hidden = S.dateMode !== "pick"; renderEvents(); });
$("dateVal").addEventListener("change", (e) => { S.dateVal = e.target.value; renderEvents(); });
let emT; $("myEmail").addEventListener("input", (e) => { myEmail = e.target.value.trim(); save(EMAILKEY, myEmail); updateBadge(); renderMine(); if (online && emailOk(myEmail)) { clearTimeout(emT); emT = setTimeout(refresh, 400); } });
window.addEventListener("hashchange", () => { const h = location.hash.slice(1); if ((h === "events" || h === "mine" || h === "insights" || h === "staff") && h !== S.view) setView(h); });

const LOGO = document.querySelector(".logo").src;
const DEPCOL = { "Computer Science": "#1f5fa8", Tamil: "#a83a2a", English: "#6b3fb5", Commerce: "#8a5a00", Maths: "#0f4c4a", Library: "#5a4a8a" };
let sDept = "All", sQ = "";
const staffById = (id) => STAFF.find((x) => x.id === id);
function coordRow(ev) {
  const c = ev.coord && staffById(ev.coord); if (!c) return "";
  return '</dd><dt>Coordinator</dt><dd>' + esc(c.name) + '<br><span class="sub">' + esc(c.mobile) + " &middot; " + esc(c.email) + "</span>";
}
const initials = (n) => { const t = n.replace(/^(Dr\.|Mr\.|Mrs\.|Tmt\.|Thiru)\s*/, "").split(/[\s.]+/).filter(Boolean); return (t[0][0] + (t.length > 1 ? t[t.length - 1][0] : "")).toUpperCase(); };
function copyText(t) { try { navigator.clipboard.writeText(t).then(() => toast("Copied"), () => toast("Copy not available here")); } catch (e) { toast("Copy not available here"); } }
function renderStaff() {
  const chips = ["All"].concat([...new Set(STAFF.map((x) => x.dept))]);
  $("sdepts").innerHTML = chips.map((c) => '<button type="button" class="chip" aria-pressed="' + (sDept === c) + '" data-sdept="' + esc(c) + '">' + esc(c) + "</button>").join("");
  const q = sQ.trim().toLowerCase();
  const list = STAFF.filter((x) => (sDept === "All" || x.dept === sDept) && (!q || (x.name + " " + x.dept + " " + x.role).toLowerCase().includes(q))).sort((a, b) => (b.hod ? 1 : 0) - (a.hod ? 1 : 0));
  $("staffList").innerHTML = list.length ? list.map((x, i) => '<li class="scard" style="--cc:' + (DEPCOL[x.dept] || "#0f4c4a") + ';--i:' + Math.min(i, 8) + '"><div class="av" aria-hidden="true">' + initials(x.name) + '</div><div class="sbody"><h3>' + esc(x.name) + '</h3><div class="meta"><span class="pill cat">' + esc(x.dept) + "</span>" + (x.hod ? '<span class="pill few">Head of Dept.</span>' : "") + '</div><p class="role">' + esc(x.role) + '</p><p class="qual">' + esc(x.qual) + '</p><div class="crow"><span class="mono">' + esc(x.mobile) + '</span><button type="button" class="mini" data-ctext="' + esc(x.mobile) + '">Copy</button></div><div class="crow"><span class="mono">' + esc(x.email) + '</span><button type="button" class="mini" data-ctext="' + esc(x.email) + '">Copy</button></div></div></li>').join("") : '<li class="empty">No staff match.</li>';
  $("office").innerHTML = OFFICE.map((o) => "<li><b>" + esc(o[0]) + "</b><span>" + esc(o[1]) + "</span></li>").join("");
}
$("sq").addEventListener("input", (e) => { sQ = e.target.value; renderStaff(); });

/* ---------- round 3 features ---------- */
const HEART = '<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
const heartBtn = (id) => '<button type="button" class="heart" data-fav="' + esc(id) + '" aria-pressed="' + fav.includes(id) + '" aria-label="Save event">' + HEART + "</button>";
function toggleFav(id, btn) {
  const on = !fav.includes(id); fav = on ? fav.concat(id) : fav.filter((x) => x !== id); save(FAVKEY, fav);
  btn.setAttribute("aria-pressed", on);
  if (!RM) { btn.classList.remove("pop"); void btn.offsetWidth; btn.classList.add("pop"); }
  toast(on ? "Saved to your list" : "Removed from saved");
  const chip = document.querySelector('[data-cat="__saved"]'); if (chip) chip.textContent = "Saved (" + fav.length + ")";
  if (S.cat === "__saved") renderEvents();
}
const pad2 = (n) => String(n).padStart(2, "0");
function gcalUrl(ev) {
  const s = start(ev), e = new Date(s.getTime() + 2 * 3600000), f = (x) => x.getFullYear() + pad2(x.getMonth() + 1) + pad2(x.getDate()) + "T" + pad2(x.getHours()) + pad2(x.getMinutes()) + "00";
  return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(ev.title) + "&dates=" + f(s) + "/" + f(e) + "&details=" + encodeURIComponent(ev.description) + "&location=" + encodeURIComponent(ev.venue) + "&ctz=Asia%2FKolkata";
}
function shareRow(ev) { return '<div class="sharerow"><a class="btn ghost" href="' + esc(gcalUrl(ev)) + '" target="_blank" rel="noopener">Add to Google Calendar</a><button type="button" class="btn ghost" data-copy="' + esc(ev.id) + '">Copy details</button></div>'; }
function copyDetails(id) {
  const ev = evById(id); if (!ev) return;
  const txt = ev.title + "\n" + fmtDay(ev) + ", " + fmtTime(ev) + "\n" + ev.venue + "\n" + ev.description;
  try { navigator.clipboard.writeText(txt).then(() => toast("Event details copied"), () => toast("Copy not available here")); } catch (e) { toast("Copy not available here"); }
}
function cdHtml(ev) {
  if (started(ev)) return "";
  return '<div class="cd" id="cd" role="timer" aria-label="Time until start">' + [["d", "days"], ["h", "hours"], ["m", "mins"], ["s", "secs"]].map((u) => '<div><b data-u="' + u[0] + '">00</b><small>' + u[1] + "</small></div>").join("") + "</div>";
}
function startCd(ev) {
  clearInterval(cdT); const el = $("cd"); if (!el) return;
  const tick = () => {
    const ms = Math.max(0, start(ev) - new Date()), v = { d: Math.floor(ms / 864e5), h: Math.floor((ms % 864e5) / 36e5), m: Math.floor((ms % 36e5) / 6e4), s: Math.floor((ms % 6e4) / 1e3) };
    Object.keys(v).forEach((k) => { const b = el.querySelector('[data-u="' + k + '"]'); if (!b) return; const t = pad2(v[k]); if (b.textContent !== t) { b.textContent = t; if (!RM) { b.classList.remove("tick"); void b.offsetWidth; b.classList.add("tick"); } } });
  };
  tick(); cdT = setInterval(tick, 1000);
}
function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function codeSvg(seed) {
  let h = hash(seed), r = ""; const n = 9;
  for (let y = 0; y < n; y++) for (let x = 0; x < 5; x++) { h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0; if ((h >>> 7) & 1) { r += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>'; if (x !== n - 1 - x) r += '<rect x="' + (n - 1 - x) + '" y="' + y + '" width="1" height="1"/>'; } }
  return '<svg viewBox="0 0 9 9" shape-rendering="crispEdges" aria-hidden="true">' + r + "</svg>";
}
function openTicket(id) {
  const r = regs.find((x) => x.id === id); if (!r) return; const ev = evById(r.eventId); if (!ev) return;
  const code = "CE-" + hash(r.id).toString(36).toUpperCase().slice(0, 6);
  $("ticketRoot").innerHTML = '<div class="tk-back" id="tkBack"><div class="tk-wrap"><button type="button" class="close tk-close" id="tkClose" aria-label="Close ticket">&times;</button><div class="tk-float"><div class="tk" id="tk" tabindex="0" role="button" aria-label="Flip ticket" style="--cc:' + cc(ev.category) + '">' +
    '<div class="tk-face tk-front"><img class="tk-logo" src="' + LOGO + '" alt=""><div><small>Admit one &middot; ' + esc(ev.category) + "</small><h3>" + esc(ev.title) + '</h3></div><div class="tk-meta"><span>' + esc(fmtDay(ev)) + "</span><span>" + esc(fmtTime(ev)) + " &middot; " + esc(ev.venue) + "</span></div><div><b>" + esc(r.name) + '</b><span class="tk-sub">' + esc(r.roll) + " &middot; " + esc(r.dept) + ", Year " + esc(r.year) + '</span><i class="code"></i></div></div>' +
    '<div class="tk-face tk-rear"><small>Entry code</small>' + codeSvg(r.id) + "<b>" + code + '</b><span class="tk-sub">Show this at the venue. Tap to flip back.</span></div></div></div><p class="hint" style="text-align:center;color:#fff">Tap the ticket to flip it</p></div></div>';
  document.body.style.overflow = "hidden"; $("tkClose").focus();
}
function closeTicket() { $("ticketRoot").innerHTML = ""; document.body.style.overflow = S.openId ? "hidden" : ""; }

const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
let netColor = () => {};
const curTheme = () => document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
function paintTheme() { const dark = curTheme() === "dark"; $("themeBtn").innerHTML = dark ? SUN : MOON; $("themeBtn").setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme"); }
function toggleTheme() {
  const n = curTheme() === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = n; save(THEMEKEY, n); paintTheme(); netColor();
  if (!RM && $("themeBtn").animate) $("themeBtn").animate([{ transform: "rotate(0)" }, { transform: "rotate(360deg)" }], { duration: 500, easing: "ease-out" });
}
{ const sv = load(THEMEKEY, "dark"); document.documentElement.dataset.theme = sv === "light" ? "light" : "dark"; paintTheme(); }

function initNet() {
  const cv = $("net"), g = cv.getContext("2d"); let W = 0, H = 0, pts = [], col = "#0f4c4a", run = true, raf = 0;
  const color = () => { col = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "#0f4c4a"; if (RM) draw(); };
  const size = () => {
    const r = cv.parentElement.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0);
    pts = Array.from({ length: Math.min(60, Math.round((W * H) / 9000)) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 }));
    if (RM) draw();
  };
  function draw() {
    g.clearRect(0, 0, W, H); g.fillStyle = col; g.strokeStyle = col;
    pts.forEach((p) => { if (!RM) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; } g.globalAlpha = 0.5; g.beginPath(); g.arc(p.x, p.y, 1.8, 0, 6.283); g.fill(); });
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy); if (d < 100) { g.globalAlpha = (1 - d / 100) * 0.28; g.beginPath(); g.moveTo(pts[i].x, pts[i].y); g.lineTo(pts[j].x, pts[j].y); g.stroke(); } }
  }
  function loop() { cancelAnimationFrame(raf); if (RM || !run || document.hidden) return; draw(); raf = requestAnimationFrame(loop); }
  color(); size(); loop();
  new IntersectionObserver((es) => { run = es[0].isIntersecting; loop(); }).observe(cv.parentElement);
  document.addEventListener("visibilitychange", loop);
  let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { size(); loop(); }, 150); });
  return color;
}
try { netColor = initNet(); } catch (e) {}

const TAGS = ["Kalloori Kalai Thiruvizha 2026", "கல்லூரி கலைத் திருவிழா 2026", "Up to 3 events for each student", "College level round"]; let ti = 0;
setInterval(() => { const el = $("tag"); if (!el || document.hidden) return; el.classList.add("out"); setTimeout(() => { ti = (ti + 1) % TAGS.length; el.textContent = TAGS[ti]; el.classList.remove("out"); }, 350); }, 3200);

$("sort").addEventListener("change", (e) => { S.sort = e.target.value; renderEvents(); bump(); });
document.addEventListener("pointerdown", (e) => {
  if (RM) return; const b = e.target.closest && e.target.closest(".btn,.chip,.close,.day"); if (!b || b.disabled) return;
  const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height) * 2, sp = document.createElement("span"); sp.className = "ripple";
  sp.style.cssText = "width:" + s + "px;height:" + s + "px;left:" + (e.clientX - r.left - s / 2) + "px;top:" + (e.clientY - r.top - s / 2) + "px"; b.appendChild(sp); setTimeout(() => sp.remove(), 650);
});
let spT = false;
addEventListener("pointermove", (e) => { if (e.pointerType === "touch" || spT) return; spT = true; requestAnimationFrame(() => { spT = false; const s = $("spot"); s.style.setProperty("--mx", e.clientX + "px"); s.style.setProperty("--my", e.clientY + "px"); }); });
let scT = false;
addEventListener("scroll", () => { if (scT) return; scT = true; requestAnimationFrame(() => { scT = false; const h = document.documentElement.scrollHeight - innerHeight; $("progress").style.transform = "scaleX(" + (h > 0 ? Math.min(1, scrollY / h) : 0) + ")"; $("toTop").classList.toggle("show", scrollY > 600); }); }, { passive: true });

renderCats(); updateBadge();
setView(location.hash === "#mine" ? "mine" : location.hash === "#insights" ? "insights" : "events");
matchMedia("(min-width: 960px)").addEventListener("change", () => setView(S.view));
syncBackend();
