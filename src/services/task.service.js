// src/services/task.service.js
const TaskModel = require('../models/task.model');

const getTasks = () => TaskModel.getAllTasks();
const createTask = (title, description) => TaskModel.addTask(title, description);
const modifyTask = (id, title, description) => TaskModel.updateTask(id, title, description);
const changeTaskStatus = (id) => TaskModel.toggleTask(id);
const removeTask = (id) => TaskModel.deleteTask(id);

module.exports = { getTasks, createTask, modifyTask, changeTaskStatus, removeTask };
