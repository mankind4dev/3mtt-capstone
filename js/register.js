const taskForm = document.getElementById("registerForm");

taskForm.onsubmit = async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  }); 

  if (res.ok) {
    alert("Registration successful! You can now log in.");
    window.location.href = "login.html";
  } else {
    const { error } = await res.json();
    alert(error || "Registration failed.");
  }
};


// const API_URL = "http://localhost:5000/api";
// const loginForm = document.getElementById("loginForm");
// const taskForm = document.getElementById("taskForm");
// const taskList = document.getElementById("taskList");
// const tasksDiv = document.getElementById("tasks");
// const navLoginLink = document.querySelector('nav ul li a[href="login.html"]');
// const tasksLink = document.querySelector('nav ul li a[href="tasks.html"]');

// // Check login status on page load
// document.addEventListener("DOMContentLoaded", () => {
//   const token = localStorage.getItem("token");
//   if (!token && tasksDiv) {
//     // Redirect to login page if not logged in and trying to access tasks
//     window.location.href = "login.html";
//   } else if (token) {
//     // Hide login link if user is logged in
//     navLoginLink.style.display = "none";
//   }
// });

// loginForm.onsubmit = async (e) => {
//   e.preventDefault();
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   const res = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password }),
//   });

//   if (res.ok) {
//     const { token, user } = await res.json();
//     localStorage.setItem("token", token);
//     localStorage.setItem("_id", user._id); // Store the user's _id in localStorage
//     loginForm.style.display = "none";
//     tasksDiv.style.display = "block";

//     // Add the user's _id to the URL
//     const url = new URL(window.location.href);
//     url.searchParams.set("userId", user._id);
//     window.history.replaceState({}, "", url);

//     fetchTasks();
//   } else {
//     alert("Login failed");
//   }
// };

// taskForm.onsubmit = async (e) => {
//   e.preventDefault();
//   const token = localStorage.getItem("token");
//   const title = document.getElementById("title").value;
//   const description = document.getElementById("description").value;
//   const deadline = document.getElementById("deadline").value;
//   const priority = document.getElementById("priority").value;

//   const res = await fetch(`${API_URL}/tasks`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//     body: JSON.stringify({ title, description, deadline, priority }),
//   });

//   if (res.ok) {
//     fetchTasks();
//     alert("Task created successfully!");
//   } else {
//     alert("Failed to create task");
//   }
// };

// async function fetchTasks() {
//   const token = localStorage.getItem("token");
//   const res = await fetch(`${API_URL}/tasks`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   if (res.ok) {
//     const tasks = await res.json();
//     taskList.innerHTML = "";
//     tasks.forEach((task) => {
//       const li = document.createElement("li");
//       li.innerText = `${task.title} - ${task.priority}`;
//       taskList.appendChild(li);
//     });
//   } else {
//     alert("Failed to fetch tasks");
//   }
// }

// // Ensure the user is redirected to login page if not authenticated when clicking on Tasks link
// tasksLink.addEventListener("click", (e) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     e.preventDefault();
//     window.location.href = "login.html";
//   }
// });
