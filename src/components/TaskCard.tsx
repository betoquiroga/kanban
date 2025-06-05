'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, Clock } from 'lucide-react';
import { Task } from '../interfaces/task.interface';

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const isOverdue = (dueDate: Date) => {
    return new Date() > dueDate && task.status !== 'completed';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm
        cursor-grab hover:shadow-md transition-shadow duration-200
        ${isDragging ? 'opacity-50 rotate-3 scale-105' : ''}
        ${isOverdue(task.dueDate) ? 'border-l-4 border-l-red-400' : ''}
      `}
    >
      <h3 className="font-medium text-gray-900 mb-2 text-sm">
        {task.title}
      </h3>
      
      <p className="text-gray-600 text-xs mb-3 line-clamp-2">
        {task.description}
      </p>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span className={isOverdue(task.dueDate) ? 'text-red-500 font-medium' : ''}>
            {formatDate(task.dueDate)}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{formatDate(task.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
} 