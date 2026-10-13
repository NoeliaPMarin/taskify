import { useState, useEffect } from "react";
import Button from "./Button";
import { API_URL, authHeaders } from "../lib/api";
import type { Task } from "../types/task";

interface TaskFormProps {
  onCancel?: () => void;
  onCreate?: () => void;
  onUpdate?: () => void;
  task?: Task;
}

export default function TaskForm({ onCancel, onCreate, onUpdate, task }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [list, setList] = useState(task?.list || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "In Progress");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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

    setError("");
    if (!title.trim() || !list.trim() || !dueDate.trim()) {
      setError("Please complete the title, list and due date.");
      return;
    }

    const taskData = { title, list, description, status, dueDate };

    try {
      setSaving(true);
      const res = await fetch(
        task ? `${API_URL}/tasks/${task.id}` : `${API_URL}/tasks`,
        {
          method: task ? "PUT" : "POST",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify(taskData),
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Unable to save the task.");
      }

      if (task && onUpdate) onUpdate();
      if (!task && onCreate) onCreate();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to save the task.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-primaryText text-center mb-8">
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

        {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</div>}

        <div className="flex justify-end gap-4 mt-4">
          <Button variant="deactivated" onClick={onCancel} disabled={saving}>Cancel</Button>
          <Button variant="primary" type="submit" disabled={saving}>{saving ? "Saving…" : task ? "Save changes" : "Create task"}</Button>
        </div>
      </form>
    </>
  );
}
