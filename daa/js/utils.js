// js/utils.js

// ── XSS sanitizer ──────────────────────────────────────────────
function esc(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ── Simple hash (djb2) — not cryptographic, but hides plain text ─
function hashPassword(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    }
    return (hash >>> 0).toString(16);
}

// ── Toast notifications ─────────────────────────────────────────
function toast(msg, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }
    const t = document.createElement("div");
    t.className = "toast toast-" + type;
    t.textContent = msg;
    container.appendChild(t);
    setTimeout(() => t.classList.add("show"), 10);
    setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 3000);
}

// ── Dark mode persistence ───────────────────────────────────────
function applyDarkMode() {
    if (localStorage.getItem("darkMode") === "1") document.body.classList.add("dark");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark") ? "1" : "0");
}

// Apply on every page load
applyDarkMode();

// ── Sidebar toggle (desktop collapse / mobile overlay) ─────────
function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const hamburger = document.querySelector(".hamburger");
    const overlay = document.getElementById("sidebar-overlay");
    const main = document.querySelector(".main");
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        sidebar.classList.toggle("open");
        if (overlay) overlay.classList.toggle("show", sidebar.classList.contains("open"));
    } else {
        sidebar.classList.toggle("collapsed");
        const collapsed = sidebar.classList.contains("collapsed");
        if (main) main.classList.toggle("expanded", collapsed);
        if (hamburger) hamburger.classList.toggle("shifted", collapsed);
        localStorage.setItem("sidebarCollapsed", collapsed ? "1" : "0");
    }
}

function initSidebarState() {
    if (window.innerWidth <= 768) return;
    const sidebar = document.querySelector(".sidebar");
    const hamburger = document.querySelector(".hamburger");
    const main = document.querySelector(".main");
    if (!sidebar) return;
    if (localStorage.getItem("sidebarCollapsed") === "1") {
        sidebar.classList.add("collapsed");
        if (main) main.classList.add("expanded");
        if (hamburger) hamburger.classList.add("shifted");
    }
}

// ── Live data helpers ───────────────────────────────────────────
function getStudents() {
    return JSON.parse(localStorage.getItem("students")) || [
        { name: "John Doe",   grade: "Form 2", parent: "Mr. Doe",    status: "Active" },
        { name: "Jane Smith", grade: "Form 4", parent: "Mrs. Smith", status: "Active" },
        { name: "Mark Lee",   grade: "Form 2", parent: "Mr. Lee",    status: "Active" },
        { name: "Sara Ali",   grade: "Form 3", parent: "Mrs. Ali",   status: "Active" },
        { name: "Tom Nguyen", grade: "Form 2", parent: "Mr. Nguyen", status: "Active" },
        { name: "Aisha Omar", grade: "Form 3", parent: "Mrs. Omar",  status: "Active" }
    ];
}

function getTeachers() {
    return JSON.parse(localStorage.getItem("teachersList")) || [
        { name: "Mr. Johnson", subject: "Mathematics", email: "johnson@school.com", status: "Active" },
        { name: "Ms. Brown",   subject: "English",     email: "brown@school.com",   status: "Active" },
        { name: "Mr. Patel",   subject: "Science",     email: "patel@school.com",   status: "Active" }
    ];
}

function letterGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B+";
    if (score >= 70) return "B";
    if (score >= 60) return "C+";
    if (score >= 50) return "C";
    return "F";
}

function getAttendanceStats(studentIndex) {
    // Scan all saved attendance keys for this student
    const counts = { Present: 0, Absent: 0, Late: 0 };
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith("t_attendance_")) {
            const day = JSON.parse(localStorage.getItem(key));
            const val = day[studentIndex];
            if (val && counts[val] !== undefined) counts[val]++;
        }
    });
    const total = counts.Present + counts.Absent + counts.Late;
    const pct = total > 0 ? Math.round((counts.Present / total) * 100) : 0;
    return { ...counts, total, pct };
}

function getAvgScore(studentIndex) {
    const subjects = ["Mathematics", "English", "Science"];
    let sum = 0, count = 0;
    subjects.forEach(sub => {
        const saved = JSON.parse(localStorage.getItem("grades_" + sub)) || {};
        if (saved[studentIndex] !== undefined && saved[studentIndex] !== "") {
            sum += Number(saved[studentIndex]);
            count++;
        }
    });
    return count > 0 ? Math.round(sum / count) : null;
}
