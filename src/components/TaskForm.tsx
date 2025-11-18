import { useState, useEffect } from "react";
import Button from "./Button";

interface TaskFormProps {
  onCancel?: () => void;
  onCreate?: () => void;
  onUpdate?: () => void;
  task?: {
    id: number;
    title: string;
    list?: string;
    description?: string;
    status: string;
    dueDate: string;
  };
}

export default function TaskForm({ onCancel, onCreate, onUpdate, task }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [list, setList] = useState(task?.list || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "In Progress");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setList(task.list ?? "");
      setDescription(task.description ?? "");
      setStatus(task.status);
      setDueDate(task.dueDate);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !list.trim() || !dueDate.trim()) {
      alert("Please fill in Title, Task List, and Due Date.");
      return;
    }

    const taskData = { title, list, description, status, dueDate };

    try {
      const res = await fetch(
        task ? `http://localhost:4000/tasks/${task.id}` : "http://localhost:4000/tasks",
        {
          method: task ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        console.error("Error saving task:", errData);
        return;
      }

      if (task && onUpdate) onUpdate();
      if (!task && onCreate) onCreate();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl text-primaryText text-center mb-8 text-[24px] sm:text-[32px] md:text-[36px]">
        {task ? "Edit Task" : "New Task"}
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
        {/* Task Title */}
        <label htmlFor="title" className="mb-2 font-medium text-primaryText">Task Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border h-[50px] border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
        />

        {/* Task List */}
        <label htmlFor="list" className="mb-2 font-medium text-primaryText">Task List</label>
        <input
          id="list"
          type="text"
          value={list}
          onChange={(e) => setList(e.target.value)}
          required
          className="border h-[50px] border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
        />

        {/* Description */}
        <label htmlFor="description" className="mb-2 font-medium text-primaryText">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full resize-none"
          placeholder="Write a detailed description..."
        />

        {/* Status */}
        <label htmlFor="status" className="mb-2 font-medium text-primaryText">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border h-[50px] border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
        >
          <option>In Progress</option>
          <option>Complete</option>
          <option>Not Started</option>
        </select>

        {/* Due Date */}
        <label htmlFor="dueDate" className="mb-2 font-medium text-primaryText">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="border h-[50px] border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" type="submit">{task ? "Save" : "Create"}</Button>
        </div>
      </form>
    </>
  );
}
