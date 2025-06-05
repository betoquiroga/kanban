'use client';

import { useState, useEffect } from 'react';
import { Task } from '../interfaces/task.interface';
import { KanbanColumn } from '../interfaces/kanban-column.interface';
import { TaskStatus } from '../types/task-status.type';
import { taskService } from '../services/task.service';
import { COLUMN_ORDER, getColumnTitle } from '../utils/kanban.utils';

export function useKanban() {
  const [columns, setColumns] = useState<KanbanColumn[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    setLoading(true);
    try {
      const tasks = taskService.getAllTasks();
      const kanbanColumns: KanbanColumn[] = COLUMN_ORDER.map(status => ({
        id: status,
        title: getColumnTitle(status),
        tasks: tasks.filter(task => task.status === status)
      }));
      setColumns(kanbanColumns);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    const updatedTask = taskService.updateTaskStatus(taskId, newStatus);
    if (updatedTask) {
      loadTasks(); // Reload to reflect changes
    }
  };

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask = taskService.createTask(taskData);
    if (newTask) {
      loadTasks();
      return newTask;
    }
    return null;
  };

  const deleteTask = (taskId: string) => {
    const success = taskService.deleteTask(taskId);
    if (success) {
      loadTasks();
    }
    return success;
  };

  return {
    columns,
    loading,
    moveTask,
    createTask,
    deleteTask,
    refresh: loadTasks
  };
} 