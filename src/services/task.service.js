// src/services/task.service.js
const TaskModel = require("../models/task.model");

const getTasks = () => TaskModel.getAllTasks();
const createTask = (title, description, priority, createdAt) => {
  return TaskModel.createTask(
    title,
    description,
    false,
    createdAt,
    new Date(),
    priority
  );
};

const modifyTask = (id, title, description, priority) =>
  TaskModel.updateTask(id, title, description, false, new Date(), priority);
const changeTaskStatus = (id) => TaskModel.toggleTask(id);
const removeTask = (id) => TaskModel.deleteTask(id);

module.exports = {
  getTasks,
  createTask,
  modifyTask,
  changeTaskStatus,
  removeTask,
};
