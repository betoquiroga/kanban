'use client';

import { useState } from 'react';

export type AddTaskFormData = {
  title: string;
  description: string;
  dueDate: string;
};

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddTaskFormData) => void;
};

export default function AddTaskModal({ isOpen, onClose, onSubmit }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">Agregar tarea</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título"
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <textarea
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descripción"
            className="w-full border rounded px-3 py-2 text-sm"
            rows={3}
          />
          <input
            type="date"
            required
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
