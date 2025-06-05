'use client';

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useState } from 'react';
import { Task } from '../interfaces/task.interface';
import { TaskStatus } from '../types/task-status.type';
import { useKanban } from '../hooks/use-kanban.hook';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';

export default function KanbanBoard() {
  const { columns, loading, moveTask } = useKanban();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = columns
      .flatMap(column => column.tasks)
      .find(task => task.id === active.id);
    
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeTaskId = active.id as string;
    const overColumnId = over.id as TaskStatus;

    // If we're over a column, handle moving between columns
    if (columns.some(col => col.id === overColumnId)) {
      const task = columns
        .flatMap(column => column.tasks)
        .find(task => task.id === activeTaskId);

      if (task && task.status !== overColumnId) {
        moveTask(activeTaskId, overColumnId);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    
    const { active, over } = event;
    
    if (!over) return;

    const activeTaskId = active.id as string;
    const overTaskId = over.id as string;

    // Find the task being dragged
    const activeTask = columns
      .flatMap(column => column.tasks)
      .find(task => task.id === activeTaskId);

    if (!activeTask) return;

    // If dropped on another task, we need to handle reordering within the same column
    const overTask = columns
      .flatMap(column => column.tasks)
      .find(task => task.id === overTaskId);

    if (overTask && activeTask.status === overTask.status) {
      // Handle reordering within the same column
      // For now, we'll keep it simple and just ensure the task stays in the right column
      moveTask(activeTaskId, activeTask.status);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#495f80] grid grid-rows-[auto_1fr]">
      {/* Header Row */}
      <div className="p-6 pb-0">
        <h1 className="text-2xl font-bold text-white">
          EDkanban
        </h1>
      </div>
      
      {/* Columns Row - Takes remaining height */}
      <div className="px-6 pb-6 pt-8 overflow-hidden">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 h-full overflow-x-auto">
            <SortableContext items={columns.map(col => col.id)}>
              {columns.map(column => (
                <KanbanColumn key={column.id} column={column} />
              ))}
            </SortableContext>
          </div>

          <DragOverlay>
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
} 