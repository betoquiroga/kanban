import { TaskStatus } from '../types/task-status.type';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
} 