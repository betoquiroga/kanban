import { TaskStatus } from '../types/task-status.type';
import { Task } from './task.interface';

export interface KanbanColumn {
  id: TaskStatus;
  title: string;
  tasks: Task[];
} 