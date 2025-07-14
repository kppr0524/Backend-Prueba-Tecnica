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
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.priority = 'low';
  }
}

const getAllTasks = () => tasks;
const addTask = (title, description, completed, createdAt, priority) => {
  const task = new Task(title, description, completed, createdAt, priority);
  tasks.push(task);
  return task;
};
const updateTask = (id, title, description, completed, updatedAt, priority) => {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.title = title;
    task.description = description;
    task.completed = completed;
    task.updatedAt = updatedAt;
    task.priority = priority;
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
