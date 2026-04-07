const authMessage = document.getElementById("authMessage");
const showLoginBtn = document.getElementById("showLoginBtn");
const showRegisterBtn = document.getElementById("showRegisterBtn");
const loginPane = document.getElementById("loginPane");
const registerPane = document.getElementById("registerPane");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

function showMessage(text, type = "error") {
  authMessage.textContent = text;
  authMessage.className = `auth-message ${type}`;
}

function openLogin() {
  showLoginBtn.classList.add("active");
  showRegisterBtn.classList.remove("active");
  loginPane.className = "auth-pane-visible";
  registerPane.className = "auth-pane-hidden";
}

function openRegister() {
  showRegisterBtn.classList.add("active");
  showLoginBtn.classList.remove("active");
  registerPane.className = "auth-pane-visible";
  loginPane.className = "auth-pane-hidden";
}

showLoginBtn.addEventListener("click", openLogin);
showRegisterBtn.addEventListener("click", openRegister);

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    email: document.getElementById("loginEmail").value.trim(),
    password: document.getElementById("loginPassword").value
  };

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok) {
    showMessage(data.error || "Login failed", "error");
    return;
  }

  showMessage("Login successful. Redirecting...", "success");
  window.location.href = "/";
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    name: document.getElementById("registerName").value.trim(),
    email: document.getElementById("registerEmail").value.trim(),
    password: document.getElementById("registerPassword").value
  };

  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok) {
    showMessage(data.error || "Registration failed", "error");
    return;
  }

  showMessage("Account created successfully. Redirecting...", "success");
  window.location.href = "/";
});