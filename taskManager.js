// taskManager.js
export let tasks = [];

export function addTask(title, date) {
if (!title || !date) throw new Error("Campos incompletos");

const newTask = {
    id: Date.now(),
    title,
    date,
    completed: false,
};

tasks.push(newTask);
return newTask;
}

export function toggleTask(id) {
const task = tasks.find(t => t.id === id);
if (task) task.completed = !task.completed;
}

export function deleteTask(id) {
tasks = tasks.filter(t => t.id !== id);
}

export function getTasks(filter = "all") {
if (filter === "completed") return tasks.filter(t => t.completed);
if (filter === "pending") return tasks.filter(t => !t.completed);
return tasks;
}

export function clearTasks() {
tasks = [];
}
