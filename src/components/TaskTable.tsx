import React from "react";
import TaskRow from "./TaskRow";

interface Task {
  id: number;
  title: string;
  list: string;
  description?: string;
  status: string;
  dueDate: string;
}

interface TaskTableProps {
  tasks: Task[];
  filter: string;
  onDelete: (id: number) => void;
  // Accept full Task for edit so parent can open edit form with complete data
  onEdit: (task: Task) => void;
}

export default function TaskTable({ tasks, filter, onDelete, onEdit }: TaskTableProps) {
  const filteredTasks = filter === "All" ? tasks : tasks.filter(task => task.list === filter);

  return (
    <>
      {/* Desktop table */}
      <table className="w-full bg-white rounded-lg shadow-sm hidden sm:table">
        <thead className="bg-gray-100 text-left text-gray-600">
          <tr>
            <th className="py-3 px-4">Task</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Due Date</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <TaskRow key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div className="sm:hidden">
        {filteredTasks.map((task) => (
          <TaskRow key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </>
  );
}
