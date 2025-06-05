'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { KanbanColumn as KanbanColumnInterface } from '../interfaces/kanban-column.interface';
import TaskCard from './TaskCard';
import { getColumnColor } from '../utils/kanban.utils';

type KanbanColumnProps = {
  column: KanbanColumnInterface;
};

export default function KanbanColumn({ column }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const taskIds = column.tasks.map(task => task.id);

  return (
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
          <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-xs transition-colors">
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
  );
} 