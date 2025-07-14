// tests/task.service.test.js
const TaskService = require('../services/task.service');

const TaskModel = require('../models/task.model');

describe('Task Service', () => {
  beforeEach(() => {
    // Reset tasks before each test
    TaskModel.resetTasks();
  });

  test('should add a task', () => {
    const task = TaskService.createTask('Test Task', 'This is a test task');
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('This is a test task');
    expect(task.completed).toBe(false);
    expect(task.priority).toBe('low');
    expect(task.createdAt).toBeInstanceOf(Date);
  });

  test('should get all tasks', () => {
    TaskService.createTask('Test Task 1', 'Description 1', false, new Date(), new Date(), 'low');
    TaskService.createTask('Test Task 2', 'Description 2', false, new Date(), new Date(), 'high');
    const tasks = TaskService.getTasks();
    expect(tasks.length).toBe(2);
  });
});
