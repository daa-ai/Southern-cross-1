// js/data.js

// ── Notifications ───────────────────────────────────────────────
function getNotifications(userEmail) {
    return JSON.parse(localStorage.getItem("notifs_" + userEmail)) || [];
}

function addNotification(toEmail, title, body, type = "info") {
    const notifs = getNotifications(toEmail);
    notifs.unshift({ id: Date.now(), title, body, type, read: false, time: new Date().toISOString() });
    localStorage.setItem("notifs_" + toEmail, JSON.stringify(notifs));
}

function markAllRead(userEmail) {
    const notifs = getNotifications(userEmail).map(n => ({ ...n, read: true }));
    localStorage.setItem("notifs_" + userEmail, JSON.stringify(notifs));
}

function unreadCount(userEmail) {
    return getNotifications(userEmail).filter(n => !n.read).length;
}

// ── Announcements ───────────────────────────────────────────────
function getAnnouncements() {
    return JSON.parse(localStorage.getItem("announcements")) || [
        { id: 1, title: "Welcome Back!", body: "Term 2 begins on January 15th. All students must report by 7:30 AM.", author: "Admin", target: "all", time: "2024-01-10T08:00:00Z" },
        { id: 2, title: "Mid-Term Exams", body: "Mid-term exams are scheduled for January 20-24. Timetables will be shared soon.", author: "Admin", target: "all", time: "2024-01-12T09:00:00Z" },
        { id: 3, title: "Staff Meeting", body: "All teachers are required to attend the staff meeting on Friday at 4 PM.", author: "Admin", target: "teacher", time: "2024-01-13T10:00:00Z" }
    ];
}

function saveAnnouncements(list) {
    localStorage.setItem("announcements", JSON.stringify(list));
}

// ── Fees ────────────────────────────────────────────────────────
function getFees() {
    return JSON.parse(localStorage.getItem("fees")) || [
        { studentIndex: 0, term: "Term 1", amount: 15000, paid: 15000, dueDate: "2024-01-31", status: "Paid" },
        { studentIndex: 1, term: "Term 1", amount: 15000, paid: 0,     dueDate: "2024-01-31", status: "Unpaid" },
        { studentIndex: 2, term: "Term 1", amount: 15000, paid: 7500,  dueDate: "2024-01-31", status: "Partial" },
        { studentIndex: 3, term: "Term 1", amount: 15000, paid: 15000, dueDate: "2024-01-31", status: "Paid" },
        { studentIndex: 4, term: "Term 1", amount: 15000, paid: 0,     dueDate: "2024-01-31", status: "Unpaid" },
        { studentIndex: 5, term: "Term 1", amount: 15000, paid: 15000, dueDate: "2024-01-31", status: "Paid" }
    ];
}

function saveFees(list) { localStorage.setItem("fees", JSON.stringify(list)); }

// ── Timetable ───────────────────────────────────────────────────
function getTimetable() {
    return JSON.parse(localStorage.getItem("timetable")) || {
        "Monday":    ["Mathematics", "English",     "Science",     "History",     "Geography", "P.E."],
        "Tuesday":   ["English",     "Mathematics", "Kiswahili",   "Science",     "Art",       "Music"],
        "Wednesday": ["Science",     "History",     "Mathematics", "English",     "P.E.",      "Kiswahili"],
        "Thursday":  ["History",     "Science",     "English",     "Mathematics", "Music",     "Art"],
        "Friday":    ["Geography",   "Kiswahili",   "History",     "P.E.",        "English",   "Mathematics"]
    };
}

function saveTimetable(tt) { localStorage.setItem("timetable", JSON.stringify(tt)); }

const PERIODS  = ["7:30-8:30", "8:30-9:30", "9:30-10:30", "10:30-11:30", "11:30-12:30", "1:30-2:30"];
const DAYS     = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const SUBJECTS = ["Mathematics", "English", "Science", "History", "Geography", "Kiswahili", "P.E.", "Art", "Music", "CRE", "Free"];

// ── Subjects management ─────────────────────────────────────────
function getSubjects() {
    return JSON.parse(localStorage.getItem("subjects")) || [
        { id: 1,  name: "Mathematics", code: "MATH", teacher: "Mr. Johnson" },
        { id: 2,  name: "English",     code: "ENG",  teacher: "Ms. Brown" },
        { id: 3,  name: "Science",     code: "SCI",  teacher: "Mr. Patel" },
        { id: 4,  name: "History",     code: "HIST", teacher: "" },
        { id: 5,  name: "Geography",   code: "GEO",  teacher: "" },
        { id: 6,  name: "Kiswahili",   code: "KIS",  teacher: "" },
        { id: 7,  name: "P.E.",        code: "PE",   teacher: "" },
        { id: 8,  name: "Art",         code: "ART",  teacher: "" },
        { id: 9,  name: "Music",       code: "MUS",  teacher: "" },
        { id: 10, name: "CRE",         code: "CRE",  teacher: "" }
    ];
}
function saveSubjects(list) { localStorage.setItem("subjects", JSON.stringify(list)); }

// ── Classes management ──────────────────────────────────────────
function getClasses() {
    return JSON.parse(localStorage.getItem("classes")) || [
        { id: 1, name: "Form 1A", form: "Form 1", stream: "A", classTeacher: "Mr. Johnson" },
        { id: 2, name: "Form 1B", form: "Form 1", stream: "B", classTeacher: "Ms. Brown" },
        { id: 3, name: "Form 2A", form: "Form 2", stream: "A", classTeacher: "Mr. Patel" },
        { id: 4, name: "Form 2B", form: "Form 2", stream: "B", classTeacher: "" },
        { id: 5, name: "Form 3A", form: "Form 3", stream: "A", classTeacher: "" },
        { id: 6, name: "Form 4A", form: "Form 4", stream: "A", classTeacher: "" }
    ];
}
function saveClasses(list) { localStorage.setItem("classes", JSON.stringify(list)); }

// ── Events calendar ─────────────────────────────────────────────
function getEvents() {
    return JSON.parse(localStorage.getItem("events")) || [
        { id: 1, title: "Term 2 Begins",  date: "2024-01-15", type: "holiday", desc: "All students report by 7:30 AM" },
        { id: 2, title: "Mid-Term Exams", date: "2024-01-20", type: "exam",    desc: "Mid-term examinations begin" },
        { id: 3, title: "Sports Day",     date: "2024-02-10", type: "event",   desc: "Annual inter-house sports competition" },
        { id: 4, title: "End of Term",    date: "2024-03-29", type: "holiday", desc: "Last day of Term 2" }
    ];
}
function saveEvents(list) { localStorage.setItem("events", JSON.stringify(list)); }

// ── Parent-Student linking ──────────────────────────────────────
function getParentStudentLinks() {
    return JSON.parse(localStorage.getItem("parentLinks")) || {};
}
function linkParentToStudent(parentEmail, studentIndex) {
    const links = getParentStudentLinks();
    links[parentEmail] = Number(studentIndex);
    localStorage.setItem("parentLinks", JSON.stringify(links));
}
function getLinkedStudentIndex(parentEmail) {
    const links = getParentStudentLinks();
    return links[parentEmail] !== undefined ? links[parentEmail] : 0;
}

// ── Exam Results ────────────────────────────────────────────────
function getExamResults() {
    return JSON.parse(localStorage.getItem("examResults")) || [];
}

function saveExamResults(list) { localStorage.setItem("examResults", JSON.stringify(list)); }

function calcGPA(scores) {
    const valid = scores.filter(s => s !== null && s !== "");
    if (!valid.length) return null;
    const avg = valid.reduce((a, b) => a + Number(b), 0) / valid.length;
    if (avg >= 90) return "4.0";
    if (avg >= 80) return "3.5";
    if (avg >= 70) return "3.0";
    if (avg >= 60) return "2.5";
    if (avg >= 50) return "2.0";
    return "1.0";
}

// ── Messages ────────────────────────────────────────────────────
function getConversationKey(emailA, emailB) {
    return "chat_" + [emailA, emailB].sort().join("__");
}

function getMessages(emailA, emailB) {
    return JSON.parse(localStorage.getItem(getConversationKey(emailA, emailB))) || [];
}

function sendMessage(fromEmail, toEmail, text) {
    const key = getConversationKey(fromEmail, toEmail);
    const msgs = getMessages(fromEmail, toEmail);
    msgs.push({ from: fromEmail, text, time: new Date().toISOString(), read: false });
    localStorage.setItem(key, JSON.stringify(msgs));
    const sender = (JSON.parse(localStorage.getItem("users")) || []).find(u => u.email === fromEmail);
    if (sender) addNotification(toEmail, "New message from " + sender.name, text.substring(0, 60), "message");
}

function getUnreadMessages(myEmail) {
    let count = 0;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.forEach(u => {
        if (u.email === myEmail) return;
        const msgs = getMessages(myEmail, u.email);
        count += msgs.filter(m => m.from !== myEmail && !m.read).length;
    });
    return count;
}

function markMessagesRead(myEmail, otherEmail) {
    const key = getConversationKey(myEmail, otherEmail);
    const msgs = getMessages(myEmail, otherEmail).map(m =>
        m.from === otherEmail ? { ...m, read: true } : m
    );
    localStorage.setItem(key, JSON.stringify(msgs));
}

function getLastMessage(emailA, emailB) {
    const msgs = getMessages(emailA, emailB);
    return msgs.length ? msgs[msgs.length - 1] : null;
}

// ── Pagination helper ───────────────────────────────────────────
function paginate(items, page, perPage) {
    const total = items.length;
    const pages = Math.max(1, Math.ceil(total / perPage));
    const p = Math.min(Math.max(1, page), pages);
    const slice = items.slice((p - 1) * perPage, p * perPage);
    return { items: slice, page: p, pages, total };
}

function renderPagination(containerId, page, pages, total, perPage, onPage) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const start = (page - 1) * perPage + 1;
    const end   = Math.min(page * perPage, total);
    let html = `<span class="pagination-info">Showing ${start}-${end} of ${total}</span>`;
    html += `<button onclick="${onPage}(${page - 1})" ${page <= 1 ? "disabled" : ""}>&laquo; Prev</button>`;
    for (let i = 1; i <= pages; i++) {
        if (pages > 7 && Math.abs(i - page) > 2 && i !== 1 && i !== pages) {
            if (i === 2 || i === pages - 1) html += `<button disabled>…</button>`;
            continue;
        }
        html += `<button class="${i === page ? "active" : ""}" onclick="${onPage}(${i})">${i}</button>`;
    }
    html += `<button onclick="${onPage}(${page + 1})" ${page >= pages ? "disabled" : ""}>Next &raquo;</button>`;
    el.innerHTML = html;
}

// ── CSV export ──────────────────────────────────────────────────
function exportCSV(headers, rows, filename) {
    const lines = [headers.join(","), ...rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(","))];
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}

// ── Sidebar builder (shared across all pages) ───────────────────
function buildSidebar(role, activePage) {
    const links = {
        admin: [
            { href: "admin.html",           icon: "fa-chart-line",         label: "Dashboard" },
            { href: "students.html",        icon: "fa-user-graduate",      label: "Students" },
            { href: "teachers.html",        icon: "fa-chalkboard-teacher", label: "Teachers" },
            { href: "attendance.html",      icon: "fa-calendar-check",     label: "Attendance" },
            { href: "timetable.html",       icon: "fa-table-cells",        label: "Timetable" },
            { href: "fees.html",            icon: "fa-money-bill",         label: "Fees" },
            { href: "exam-results.html",    icon: "fa-file-alt",           label: "Exam Results" },
            { href: "analytics.html",       icon: "fa-chart-pie",          label: "Analytics" },
            { href: "announcements.html",   icon: "fa-bullhorn",           label: "Announcements" },
            { href: "subjects.html",        icon: "fa-book",               label: "Subjects" },
            { href: "classes.html",         icon: "fa-door-open",          label: "Classes" },
            { href: "events.html",          icon: "fa-calendar-days",      label: "Events" },
            { href: "promotion.html",       icon: "fa-arrow-up",           label: "Promotion" },
            { href: "user-management.html", icon: "fa-users-gear",         label: "Users" },
            { href: "settings.html",        icon: "fa-gear",               label: "Settings" }
        ],
        teacher: [
            { href: "teacher.html",            icon: "fa-chart-line",        label: "Dashboard" },
            { href: "my-students.html",        icon: "fa-user-graduate",     label: "My Students" },
            { href: "teacher-attendance.html", icon: "fa-calendar-check",    label: "Attendance" },
            { href: "grades.html",             icon: "fa-clipboard-list",    label: "Grades" },
            { href: "timetable.html",          icon: "fa-table-cells",       label: "Timetable" },
            { href: "exam-results.html",       icon: "fa-file-alt",          label: "Exam Results" },
            { href: "events.html",             icon: "fa-calendar-days",     label: "Events" },
            { href: "announcements.html",      icon: "fa-bullhorn",          label: "Announcements" }
        ],
        parent: [
            { href: "parent.html",             icon: "fa-house",             label: "Home" },
            { href: "my-child.html",           icon: "fa-user-graduate",     label: "My Child" },
            { href: "parent-attendance.html",  icon: "fa-calendar-check",    label: "Attendance" },
            { href: "parent-grades.html",      icon: "fa-star",              label: "Grades" },
            { href: "timetable.html",          icon: "fa-table-cells",       label: "Timetable" },
            { href: "fees.html",               icon: "fa-money-bill",        label: "Fees" },
            { href: "report-card.html",        icon: "fa-id-card",           label: "Report Card" },
            { href: "events.html",             icon: "fa-calendar-days",     label: "Events" },
            { href: "announcements.html",      icon: "fa-bullhorn",          label: "Announcements" }
        ]
    };

    const current      = JSON.parse(localStorage.getItem("currentUser"));
    const unreadMsgs   = current ? getUnreadMessages(current.email) : 0;
    const unreadNotifs = current ? unreadCount(current.email) : 0;
    const lbl = t => `<span class="sidebar-label">${t}</span>`;

    const linkHTML = (links[role] || []).map(l =>
        `<a href="${l.href}" ${activePage === l.href ? 'class="active"' : ''} title="${l.label}">
            <i class="fa-solid ${l.icon}"></i>${lbl(l.label)}
        </a>`
    ).join("");

    return `
        <h2><i class="fa-solid fa-school"></i>${lbl(" SchoolSys")}</h2>
        ${linkHTML}
        <hr>
        <a href="messages.html" ${activePage === "messages.html" ? 'class="active"' : ''} title="Messages">
            <i class="fa-solid fa-message"></i>${lbl(" Messages")}
            ${unreadMsgs > 0 ? `<span class="notif-badge">${unreadMsgs}</span>` : ""}
        </a>
        <a href="notifications.html" ${activePage === "notifications.html" ? 'class="active"' : ''} title="Notifications">
            <i class="fa-solid fa-bell"></i>${lbl(" Notifications")}
            ${unreadNotifs > 0 ? `<span class="notif-badge">${unreadNotifs}</span>` : ""}
        </a>
        <a href="profile.html" ${activePage === "profile.html" ? 'class="active"' : ''} title="Profile">
            <i class="fa-solid fa-user"></i>${lbl(" Profile")}
        </a>
        <button onclick="toggleDarkMode()" title="Dark Mode">🌙 ${lbl("Dark Mode")}</button>
        <button onclick="logout()" style="margin-top:6px;background:#A82810;" title="Logout">🚪 ${lbl("Logout")}</button>`;
}

function initPage(role, activePage) {
    const user = checkAuth(role);
    document.getElementById("sidebar").innerHTML = buildSidebar(user.role, activePage);
    if (!document.getElementById("sidebar-overlay")) {
        const ov = document.createElement("div");
        ov.id = "sidebar-overlay";
        ov.className = "sidebar-overlay";
        ov.onclick = toggleSidebar;
        document.body.appendChild(ov);
    }
    if (typeof initSidebarState === "function") initSidebarState();
    return user;
}
