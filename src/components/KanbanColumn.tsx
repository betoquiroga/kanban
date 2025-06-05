'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { KanbanColumn as KanbanColumnInterface } from '../interfaces/kanban-column.interface';
import { Task } from '../interfaces/task.interface';
import TaskCard from './TaskCard';
import { getColumnColor } from '../utils/kanban.utils';

type KanbanColumnProps = {
  column: KanbanColumnInterface;
  onCreateTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Task | null;
};

export default function KanbanColumn({ column, onCreateTask }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const taskIds = column.tasks.map(task => task.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.dueDate) {
      return;
    }

    const newTask = onCreateTask({
      title: formData.title,
      description: formData.description,
      dueDate: new Date(formData.dueDate),
      status: column.id,
    });

    if (newTask) {
      setIsModalOpen(false);
      setFormData({
        title: '',
        description: '',
        dueDate: '',
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
      dueDate: '',
    });
  };

  return (
    <>
      <div className="flex-1 min-w-80">
        <div className={`rounded-lg border-2 ${getColumnColor(column.id)} h-full flex flex-col`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-gray-800 text-sm">
                {column.title}
              </h2>
              <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                {column.tasks.length}
              </span>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-xs transition-colors"
            >
              <Plus className="w-3 h-3" />
              Agregar tarea
            </button>
          </div>

          {/* Tasks Container */}
          <div
            ref={setNodeRef}
            className={`p-4 flex-1 overflow-y-auto transition-colors duration-200 ${
              isOver ? 'bg-gray-100' : ''
            }`}
          >
            <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
              {column.tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </SortableContext>
            
            {column.tasks.length === 0 && (
              <div className="text-gray-400 text-center text-sm py-8">
                No hay tareas en esta columna
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Nueva Tarea</h3>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingresa el título de la tarea"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Describe la tarea"
                />
              </div>

              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de vencimiento *
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Crear Tarea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 