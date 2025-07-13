import { describe, it, expect } from '@jest/globals';
import { Task } from './Task';

describe('Modelo de tarea', () => {
  it('debe crear una tarea válida', () => {
    const tarea: Task = {
      id: 1,
      title: 'Tarea de prueba',
      description: 'Descripción de prueba',
      completed: false,
    };

    expect(tarea.title).toBe('Tarea de prueba');
    expect(tarea.completed).toBe(false);
  });
});
