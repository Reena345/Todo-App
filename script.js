const taskList = document.getElementById("taskList");
const header = document.getElementById("headerBg");
const modal = document.getElementById("taskModal");

let tasks = [];

/* BACKGROUND IMAGES */
const backgrounds = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
  "https://images.unsplash.com/photo-1503264116251-35a269479413",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
  "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66"
];

/* STATUS COLORS */
const colors = ["red", "yellow", "green"];

/* CHANGE HEADER BACKGROUND */
function randomBg() {
  const bg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  header.style.backgroundImage = `url('${bg}')`;
}

/* MODAL FUNCTIONS */
function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

/* ADD TASK FROM MODAL */
function addTask() {
  const name = document.getElementById("taskName").value.trim();
  const date = document.getElementById("taskDate").value;

  if (name === "" || date === "") {
    alert("Please enter task name and date");
    return;
  }

  const color = colors[Math.floor(Math.random() * colors.length)];

  tasks.push({
    name,
    date,
    color
  });

  document.getElementById("taskName").value = "";
  document.getElementById("taskDate").value = "";

  randomBg();
  closeModal();
  displayTasks(tasks);
}

/* DISPLAY TASKS */
function displayTasks(list) {
  taskList.innerHTML = "";

  list.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox">
        <span>${task.name}</span>
      </div>

      <div class="date">${task.date}</div>

      <div class="actions">
        <span class="status ${task.color}"></span>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

/* DELETE TASK */
function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks(tasks);
}

/* FILTER TASKS */
function filterTasks(type) {
  document
    .querySelectorAll(".tabs button")
    .forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  const today = new Date().toISOString().split("T")[0];

  if (type === "today") {
    displayTasks(tasks.filter(t => t.date === today));
  } 
  else if (type === "overdue") {
    displayTasks(tasks.filter(t => t.date < today));
  } 
  else {
    displayTasks(tasks.filter(t => t.date > today));
  }
}
