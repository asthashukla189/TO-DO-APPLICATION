let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks
    .filter(task => {
      if (currentFilter === "active") return !task.completed;
      if (currentFilter === "completed") return task.completed;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      li.innerHTML = `
        <span onclick="toggleComplete(${index})">${task.text}</span>
        <div class="actions">
          <button onclick="deleteTask(${index})">🗑</button>
        </div>
      `;

      list.appendChild(li);
    });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const value = input.value.trim();
  if (!value) return;

  tasks.push({ text: value, completed: false });
  input.value = "";
  playClick();
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  playClick();
  saveTasks();
  renderTasks();
}

function filterTasks(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filter-buttons button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.filter-buttons button[onclick*="${filter}"]`).classList.add("active");
  renderTasks();
}

function playClick() {
  document.getElementById("clickSound").play();
}

// Init
renderTasks();
