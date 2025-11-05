import React from "react";
import TaskRow from "./TaskRow";

interface TaskTableProps {
  tasks: {
    id: number;
    title: string;
    status: string;
    dueDate: string;
    category: string;
  }[];
  filter: string;
}

export default function TaskTable({ tasks, filter }: TaskTableProps) {
  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((t) => t.category === filter);

  return (
    <table className="w-full bg-white rounded-lg shadow-sm">
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
          <TaskRow key={task.id} task={task} />
        ))}
      </tbody>
    </table>
  );
}
