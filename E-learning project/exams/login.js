// Demo users (username + password)
const users = [
  { username: "admin", password: "1234" },
  { username: "tom", password: "password" }
];

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    message.style.color = "#00ffcc";
    message.textContent = "✅ Login successful!";
    localStorage.setItem("loggedInUser", username);
    setTimeout(() => {
      window.location.href = "choose.html"; // Redirect example
    }, 1000);
  } else {
    message.style.color = "red";
    message.textContent = "❌ Invalid username or password!";
  }
});
