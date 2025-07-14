// src/controllers/task.controller.js
const TaskService = require('../services/task.service');

const getTasks = (req, res) => {
  res.json(TaskService.getTasks());
};

const createTask = (req, res) => {
  const { title, description, priority, createdAt } = req.body;
  const task = TaskService.createTask(title, description, priority, new Date(createdAt));
  res.status(201).json(task);
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const task = TaskService.modifyTask(parseInt(id), title, description);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
};

const toggleTask = (req, res) => {
  const { id } = req.params;
  const task = TaskService.changeTaskStatus(parseInt(id));
  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  TaskService.removeTask(parseInt(id));
  res.status(204).send();
};

module.exports = { getTasks, createTask, updateTask, toggleTask, deleteTask };
