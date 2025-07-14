// src/services/task.service.js
const TaskModel = require('../models/task.model');

const getTasks = () => TaskModel.getAllTasks();
const createTask = (title, description) => TaskModel.addTask(title, description, false, new Date(), new Date(), 'low');
const modifyTask = (id, title, description) => TaskModel.updateTask(id, title, description, false, new Date(), 'medium');
const changeTaskStatus = (id) => TaskModel.toggleTask(id);
const removeTask = (id) => TaskModel.deleteTask(id);

module.exports = { getTasks, createTask, modifyTask, changeTaskStatus, removeTask };
