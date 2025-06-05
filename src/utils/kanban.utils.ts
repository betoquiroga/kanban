import { TaskStatus } from '../types/task-status.type';

export const COLUMN_CONFIG: Record<TaskStatus, { title: string; color: string }> = {
  'todo': {
    title: 'Por hacer',
    color: 'bg-slate-50 border-slate-200'
  },
  'in-progress': {
    title: 'En progreso',
    color: 'bg-blue-50 border-blue-200'
  },
  'in-review': {
    title: 'En revisión',
    color: 'bg-amber-50 border-amber-200'
  },
  'completed': {
    title: 'Completados',
    color: 'bg-green-50 border-green-200'
  }
};

export const COLUMN_ORDER: TaskStatus[] = ['todo', 'in-progress', 'in-review', 'completed'];

export function getColumnTitle(status: TaskStatus): string {
  return COLUMN_CONFIG[status].title;
}

export function getColumnColor(status: TaskStatus): string {
  return COLUMN_CONFIG[status].color;
} 