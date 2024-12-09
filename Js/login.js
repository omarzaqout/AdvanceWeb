const users = {
  user: { username: "ali", password: "ali123", role: "user" },
  admin1: { username: "adham", password: "adham123", role: "admin" },
  admin2: { username: "omar", password: "omar123", role: "admin" },
  admin3: { username: "mohammed", password: "moh123", role: "admin" },
};

let currentUser = null;

// Login function
function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  for (let key in users) {
    const user = users[key];
    if (user.username === username && user.password === password) {
      currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      window.location.href = "../Page/Chat.html";
      return;
    }
  }

  alert("Invalid username or password!");
}

// Logout function
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "../Page/LoginPage.html";
}

function togglePassword() {
  const passwordInput = document.getElementById("password");
  const currentType = passwordInput.getAttribute("type");

  if (currentType === "password") {
    passwordInput.setAttribute("type", "text");
  } else {
    passwordInput.setAttribute("type", "password");
  }
}
