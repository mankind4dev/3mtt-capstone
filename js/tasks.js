const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const loginNav = document.getElementById("loginNav");
const tasksNav = document.getElementById("tasksNav");


document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("taskList");
  
  if (taskList) {
    taskList.onsubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const deadline = document.getElementById("deadline").value;
      const priority = document.getElementById("priority").value;

      await fetch("http://localhost:5000/api/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, deadline, priority }),
      });

      fetchTasks();
    };
  } else {
    console.error("taskList element not found in the DOM.");
  }
});


async function fetchTasks() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:5000/api/task/create", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    const tasks = await res.json();
    taskList.innerHTML = tasks
      .map(
        (task) =>
          `<li>${task.title} (${task.priority}) - ${task.description}</li>`
      )
      .join("");
  }
}

async function fetchTasks() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in to view tasks.");
    return;
  }

  const res = await fetch("http://localhost:5000/api/task/list", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    const tasks = await res.json();
    taskList.innerHTML = tasks
      .map(
        (task) =>
          `<div class="task">
            <h1>${task.title}</h1>
            <p>
               ${task.description}
            </p>
            <p class="span">Deadline: ${new Date(task.deadline).toLocaleDateString()}</p>
            <h6>${task.priority}</h6>
          </div>`
          // `<li>
          //   <strong>${task.title}</strong> (${task.priority})
          //   <p>${task.description}</p>
          //   <small>Deadline: ${new Date(task.deadline).toLocaleDateString()}</small>
          // </li>`
      )
      .join("");
  } else {
    taskList.innerHTML = "<li>Failed to fetch tasks. Please try again.</li>";
  }
}


// const taskForm = document.getElementById("taskForm");
// const taskList = document.getElementById("taskList");

// taskForm.onsubmit = async (e) => {
//   e.preventDefault();
//   const token = localStorage.getItem("token");
//   const title = document.getElementById("taskTitle").value;
//   const description = document.getElementById("taskDescription").value;
//   const deadline = document.getElementById("taskDeadline").value;
//   const priority = document.getElementById("taskPriority").value;

//   const res = await fetch("http://localhost:3000/api/task/create", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       // Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ title, description, deadline, priority }),
//   });

//   if (res.ok) {
//     alert("Task created successfully!");
//     fetchTasks();
//     window.location.href = "home.html";
//   } else {
//     alert("Error creating task!");
//   }
// };

// async function fetchTasks() {
//   const token = localStorage.getItem("token");
//   const res = await fetch("http://localhost:3000/api/task/create", {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   if (res.ok) {
//     const tasks = await res.json();
//     taskList.innerHTML = tasks
//       .map(
//         (task) =>
//           `<li>${task.title} (${task.priority}) - ${task.description}</li>`
//       )
//       .join("");
//   } else {
//     alert("Failed to fetch tasks.");
//   }
// }

// // Fetch tasks on page load
// document.addEventListener("DOMContentLoaded", fetchTasks);

// const taskForm = document.getElementById("taskForm");
// const taskList = document.getElementById("taskList");

// taskForm.onsubmit = async (e) => {
//   e.preventDefault();
//   const token = localStorage.getItem("token");
//   const title = document.getElementById("taskTitle").value;
//   const description = document.getElementById("taskDescription").value;
//   const deadline = document.getElementById("taskDeadline").value;
//   const priority = document.getElementById("taskPriority").value;

//   try {
//     const res = await fetch("http://localhost:3000/api/task/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ title, description, deadline, priority }),
//     });

//     if (res.ok) {
//       alert("Task created successfully!");
//       window.location.href = "home.html";
//     } else {
//       const error = await res.json();
//       alert(`Error creating task: ${error.message}`);
//     }
//   } catch (err) {
//     console.error("Error:", err);
//     alert("An unexpected error occurred!");
//   }
// };

// async function fetchTasks() {
//   const token = localStorage.getItem("token");
//   try {
//     const res = await fetch("http://localhost:3000/api/task/create", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (res.ok) {
//       const tasks = await res.json();
//       const homeTaskList = document.getElementById("homeTaskList");
//       if (homeTaskList) {
//         homeTaskList.innerHTML = tasks
//           .map(
//             (task) =>
//               `<li><strong>${task.title}</strong> (${task.priority}) - ${task.description} (Due: ${task.deadline})</li>`
//           )
//           .join("");
//       }
//     } else {
//       console.error("Failed to fetch tasks.");
//     }
//   } catch (err) {
//     console.error("Error fetching tasks:", err);
//   }
// }

// Fetch tasks on page load for home.html

// document.addEventListener("DOMContentLoaded", fetchTasks);
// async function fetchTasks() {
//   const token = localStorage.getItem("token"); // Retrieve the user token
//   try {
//     const res = await fetch("http://localhost:3000/api/task/create", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // Authenticate user requests
//       },
//     });

//     if (res.ok) {
//       const tasks = await res.json(); // Get the tasks as a JSON array
//       const taskList = document.getElementById("taskList");

//       // Clear the existing tasks
//       taskList.innerHTML = "";

//       // Map the tasks into the task list
//       tasks.forEach((task) => {
//         const listItem = document.createElement("li");
//         listItem.textContent = `${task.title} - ${task.description} (Priority: ${task.priority}, Due: ${task.deadline})`;
//         taskList.appendChild(listItem);
//       });
//     } else {
//       console.error("Failed to fetch tasks.");
//       alert("Could not fetch tasks. Please try again.");
//       window.location.href = "login.html";
//     }
//   } catch (err) {
//     console.error("Error fetching tasks:", err);
//     alert("An error occurred while fetching tasks.");
//   }
// }

// // Fetch tasks on page load
// document.addEventListener("DOMContentLoaded", fetchTasks);
