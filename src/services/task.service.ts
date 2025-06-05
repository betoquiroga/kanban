import { Task } from '../interfaces/task.interface';
import { TaskStatus } from '../types/task-status.type';

class TaskService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Implementar autenticación',
      description: 'Crear sistema de login y registro para la aplicación',
      dueDate: new Date('2024-12-25'),
      status: 'todo',
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-01'),
    },
    {
      id: '2',
      title: 'Diseñar base de datos',
      description: 'Crear el modelo de datos y relaciones necesarias',
      dueDate: new Date('2024-12-22'),
      status: 'todo',
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-01'),
    },
    {
      id: '3',
      title: 'Desarrollar API REST',
      description: 'Implementar endpoints para CRUD de tareas',
      dueDate: new Date('2024-12-28'),
      status: 'in-progress',
      createdAt: new Date('2024-11-28'),
      updatedAt: new Date('2024-12-05'),
    },
    {
      id: '4',
      title: 'Configurar CI/CD',
      description: 'Establecer pipeline de integración continua',
      dueDate: new Date('2024-12-20'),
      status: 'in-progress',
      createdAt: new Date('2024-11-25'),
      updatedAt: new Date('2024-12-03'),
    },
    {
      id: '5',
      title: 'Revisar código frontend',
      description: 'Code review de los componentes principales',
      dueDate: new Date('2024-12-18'),
      status: 'in-review',
      createdAt: new Date('2024-11-20'),
      updatedAt: new Date('2024-12-02'),
    },
    {
      id: '6',
      title: 'Documentar API',
      description: 'Crear documentación con Swagger/OpenAPI',
      dueDate: new Date('2024-12-15'),
      status: 'completed',
      createdAt: new Date('2024-11-15'),
      updatedAt: new Date('2024-12-01'),
    },
    {
      id: '7',
      title: 'Configurar monitoreo',
      description: 'Implementar logging y métricas de la aplicación',
      dueDate: new Date('2024-12-30'),
      status: 'completed',
      createdAt: new Date('2024-11-10'),
      updatedAt: new Date('2024-11-30'),
    },
  ];

  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus): Task | null {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return null;

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      status: newStatus,
      updatedAt: new Date(),
    };

    return this.tasks[taskIndex];
  }

  createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(taskId: string): boolean {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return false;

    this.tasks.splice(taskIndex, 1);
    return true;
  }
}

export const taskService = new TaskService(); 