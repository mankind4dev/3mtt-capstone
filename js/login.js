const loginForm = document.getElementById("loginForm");

loginForm.onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) { 
    window.location.href = "tasks.html";
  } else {
    const { error } = await res.json();
    alert(error || "Login failed.");
  }
};
