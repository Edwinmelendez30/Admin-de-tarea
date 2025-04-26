// Lista de tareas
let tasks = [];

// Referencias de elementos
const taskTitleInput = document.getElementById("taskTitle");
const taskDateInput = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

// Evento para añadir una tarea
addTaskBtn.addEventListener("click", () => {
    const title = taskTitleInput.value.trim();
    const date = taskDateInput.value;

    if (!title || !date) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const newTask = {
        id: Date.now(),
        title,
        date,
        completed: false,
    };

    tasks.push(newTask);
    taskTitleInput.value = "";
    taskDateInput.value = "";

    renderTasks();
    saveToLocalStorage();
});

// Renderizar tareas
function renderTasks(filter = "all") {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
            <span>${task.title} - ${task.date}</span>
            <div>
                <button onclick="toggleTask(${task.id})">✔</button>
                <button onclick="deleteTask(${task.id})">✖</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Cambiar estado de una tarea
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    renderTasks();
    saveToLocalStorage();
}

// Eliminar tarea
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    saveToLocalStorage();
}

// Aplicar filtro
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        renderTasks(filter);
    });
});

// Guardar en Local Storage
function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Cargar tareas del Local Storage
function loadFromLocalStorage() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

// Inicializar
loadFromLocalStorage();
