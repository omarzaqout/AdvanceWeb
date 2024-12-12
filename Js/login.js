// Login function
function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  e;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (foundUser) {
    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    window.location.href = "../Page/main.html";
  } else {
    alert("Invalid username or password!");
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "../Page/LoginPage.html";
}

// Toggle password visibility
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const currentType = passwordInput.getAttribute("type");

  if (currentType === "password") {
    passwordInput.setAttribute("type", "text");
  } else {
    passwordInput.setAttribute("type", "password");
  }
}
