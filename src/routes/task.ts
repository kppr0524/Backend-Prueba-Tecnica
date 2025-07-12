import express from "express";
import { tasks } from "../data/task";
import { Task } from "../models/Task";

const router = express.Router();

// Obtener todas las tareas
router.get("/", (req, res) => {
  res.json(tasks);
});

// Crear nueva tarea
router.post("/", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "Título y descripción requeridos." });
  }

  const newTask: Task = {
    id: Date.now(),
    title,
    description,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Actualizar tarea (título, descripción o estado)
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, description, completed } = req.body;

  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ message: "Tarea no encontrada." });

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// Eliminar tarea
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: "Tarea no encontrada." });

  tasks.splice(index, 1);
  res.status(204).send();
});

export default router;
