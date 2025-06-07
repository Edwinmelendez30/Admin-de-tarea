// taskManager.test.js
import {
addTask,
toggleTask,
deleteTask,
getTasks,
clearTasks
} from './taskManager.js';

beforeEach(() => {
  clearTasks(); // Limpia tareas antes de cada prueba
});

test('añade una tarea correctamente', () => {
const task = addTask("Estudiar Jest", "2025-05-22");
expect(task.title).toBe("Estudiar Jest");
expect(task.date).toBe("2025-05-22");
expect(task.completed).toBe(false);
});

test('lanza error si falta título o fecha', () => {
expect(() => addTask("", "")).toThrow("Campos incompletos");
});

test('cambia el estado de completado', () => {
const task = addTask("Completar tarea", "2025-05-22");
toggleTask(task.id);
expect(getTasks()[0].completed).toBe(true);
});

test('elimina una tarea por id', () => {
const task = addTask("Tarea a eliminar", "2025-05-22");
deleteTask(task.id);
expect(getTasks()).toHaveLength(0);
});

test('filtra tareas completadas y pendientes', () => {
const t1 = addTask("Tarea 1", "2025-05-22");
const t2 = addTask("Tarea 2", "2025-05-22");
  toggleTask(t1.id); // marcar como completada

expect(getTasks("completed")).toHaveLength(1);
expect(getTasks("pending")).toHaveLength(1);
});

