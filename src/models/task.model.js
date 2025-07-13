// src/models/task.model.js
let tasks = [];
const resetTasks = () => {
  tasks = [];
};
let idCounter = 1;

class Task {
  constructor(title, description) {
    this.id = idCounter++;
    this.title = title;
    this.description = description;
    this.completed = false;
  }
}

const getAllTasks = () => tasks;
const addTask = (title, description) => {
  const task = new Task(title, description);
  tasks.push(task);
  return task;
};
const updateTask = (id, title, description) => {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.title = title;
    task.description = description;
    return task;
  }
  return null;
};
const toggleTask = (id) => {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    return task;
  }
  return null;
};
const deleteTask = (id) => {
  tasks = tasks.filter(t => t.id !== id);
};

module.exports = { getAllTasks, addTask, updateTask, toggleTask, deleteTask, resetTasks };
