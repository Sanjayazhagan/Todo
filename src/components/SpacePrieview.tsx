import React, { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface SpacePreviewCardProp {
  id:string;
  title: string;
  tasks: Task[];
  onDelete: (id:string) => void;
  onEdit: () => void;
}

const SpacePreviewCard = ({ id,title, tasks, onDelete, onEdit }: SpacePreviewCardProp) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(false);
    onDelete(id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(false);
    onEdit?.();
  };

  return (
    <div
      ref={cardRef}
      className="relative bg-white rounded-xl shadow-md p-4 pt-5 hover:shadow-lg transition cursor-pointer w-full sm:w-80"
    >
      <button
        onClick={toggleMenu}
        className="absolute top-0 right-0 bg-white rounded-full p-1 hover:bg-gray-100 z-20"
        aria-label="Menu"
      >
        <CiMenuKebab size={20} />
      </button>
      {menuOpen && (
        <div className="absolute top-10 right-2 z-10 bg-white border border-gray-200 shadow-lg rounded-md text-sm">
          <button
            onClick={handleEdit}
            className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            className="block w-full px-4 py-2 hover:bg-gray-100 text-left text-red-600"
          >
            🗑️ Delete
          </button>
        </div>
      )}

      {/* Card Header (title and count) */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-sm text-gray-400 whitespace-nowrap">
          {tasks?.length} {tasks?.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      {/* Tasks Preview */}
      <ul className="text-sm text-gray-700 space-y-1 max-h-32 overflow-hidden">
        {tasks?.slice(0, 3).map((task) => (
          <li
            key={task.id}
            className={`truncate ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            • {task.title}
          </li>
        ))}
        {tasks?.length > 3 && <li className="text-gray-400">...more</li>}
      </ul>
    </div>
  );
};

export default SpacePreviewCard;
