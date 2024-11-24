const API_URL = "http://localhost:3000/api";
const taskList = document.getElementById("taskList");
const loginNav = document.getElementById("loginNav");
const tasksNav = document.getElementById("tasksNav");

async function fetchTasks() {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     alert("Please log in first.");
  //     window.location.href = "login.html";
  //     return;
  //   }

  const res = await fetch(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    const tasks = await res.json();
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerText = `${task.title} - ${task.priority}`;
      taskList.appendChild(li);
    });
    loginNav.style.display = "none";
    tasksNav.style.display = "block";
  } else {
    alert("Failed to fetch tasks. Please log in again.");
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
}

window.onload = fetchTasks;
