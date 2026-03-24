// js/auth.js

let users = JSON.parse(localStorage.getItem("users")) || [];

function register() {
    const name     = document.getElementById("name").value.trim();
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role     = document.getElementById("role").value;

    if (!name || !email || !password) return toast("Fill all fields", "error");
    if (password.length < 6) return toast("Password must be at least 6 characters", "error");

    if (users.find(u => u.email === email)) return toast("Email already registered", "error");

    users.push({ name, email, password: hashPassword(password), role });
    localStorage.setItem("users", JSON.stringify(users));
    toast("Registered successfully!");
    setTimeout(() => window.location.href = "login.html", 1200);
}

function login() {
    const email    = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const user = users.find(u => u.email === email && u.password === hashPassword(password));
    if (!user) return toast("Invalid email or password", "error");

    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.role === "admin")        window.location.href = "admin.html";
    else if (user.role === "teacher") window.location.href = "teacher.html";
    else                              window.location.href = "parent.html";
}

function logout() {
    if (!confirm("Are you sure you want to logout?")) return;
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

function checkAuth(role) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) { window.location.href = "login.html"; return null; }
    // role=null means any authenticated user is allowed (e.g. events page)
    if (role !== null && role !== undefined && user.role !== role) {
        window.location.href = "unauthorized.html";
        return null;
    }
    return user;
}

function updateProfile() {
    const name     = document.getElementById("profileName").value.trim();
    const email    = document.getElementById("profileEmail").value.trim();
    const newPass  = document.getElementById("profilePassword").value;
    const confirm  = document.getElementById("profileConfirm").value;

    if (!name || !email) return toast("Name and email are required", "error");
    if (newPass && newPass.length < 6) return toast("Password must be at least 6 characters", "error");
    if (newPass && newPass !== confirm) return toast("Passwords do not match", "error");

    let current = JSON.parse(localStorage.getItem("currentUser"));
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    const idx = allUsers.findIndex(u => u.email === current.email);
    if (idx === -1) return toast("User not found", "error");

    allUsers[idx].name  = name;
    allUsers[idx].email = email;
    if (newPass) allUsers[idx].password = hashPassword(newPass);

    current = { ...allUsers[idx] };
    localStorage.setItem("users", JSON.stringify(allUsers));
    localStorage.setItem("currentUser", JSON.stringify(current));
    toast("Profile updated successfully!");
}

function forgotPassword() {
    const email   = document.getElementById("forgotEmail").value.trim();
    const newPass = document.getElementById("newPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (!email || !newPass) return toast("Fill all fields", "error");
    if (newPass.length < 6) return toast("Password must be at least 6 characters", "error");
    if (newPass !== confirm) return toast("Passwords do not match", "error");

    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const idx = allUsers.findIndex(u => u.email === email);
    if (idx === -1) return toast("No account found with that email", "error");

    allUsers[idx].password = hashPassword(newPass);
    localStorage.setItem("users", JSON.stringify(allUsers));
    toast("Password reset! Redirecting to login...");
    setTimeout(() => window.location.href = "login.html", 1500);
}
