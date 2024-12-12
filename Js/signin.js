const signupForm = document.getElementById("signupForm");
const resultMessage = document.getElementById("resultMessage");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = document.getElementById("fullname").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!fullName) {
    resultMessage.textContent = "Failed: Full Name is required!";
    resultMessage.style.color = "red";
    return;
  }

  if (!username) {
    resultMessage.textContent = "Failed: Username is required!";
    resultMessage.style.color = "red";
    return;
  }

  if (!password) {
    resultMessage.textContent = "Failed: Password is required!";
    resultMessage.style.color = "red";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const newUser = { fullName, username, password };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  resultMessage.textContent = "Success: User registered successfully!";
  resultMessage.style.color = "green";

  setTimeout(() => {
    window.location.href = "../Page/LoginPage.html";
  }, 1000);
});
