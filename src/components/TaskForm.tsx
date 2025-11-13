import { useState } from "react";
import Button from "./Button";

export default function TaskForm({ onCancel, onCreate }: { onCancel?: () => void; onCreate?: () => void }) {
  const [title, setTitle] = useState("");
  const [list, setList] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("In Progress");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Validación de campos obligatorios
  if (!title.trim() || !list.trim() || !dueDate.trim()) {
    alert("Please fill in Title, Task List, and Due Date.");
    return;
  }

  const newTask = { title, list, description, status, dueDate };

  try {
    const res = await fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error("Error creating task:", errData);
      return;
    }

    if (onCreate) onCreate();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};


  return (
    <>

      {/* Título */}
      <h1 className="text-3xl  text-primaryText text-center mb-8 text-[24px] sm:text-[32px] md:text-[36px]">
        New Task
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
        {/* Task Title */}
        <label htmlFor="title" className="mb-2 font-medium text-primaryText">
          Task Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border h-[50px] border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
        />

        {/* Task List */}
        <label htmlFor="list" className="mb-2 font-medium text-primaryText">
          Task List
        </label>
        <input
          id="list"
          type="text"
          value={list}
          onChange={(e) => setList(e.target.value)}
          required
          className="border h-[50px] border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
        />

        {/* Description */}
        <label htmlFor="description" className="mb-2 font-medium text-primaryText">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full resize-none"
          placeholder="Write a detailed description..."
        />

        {/* Status */}
        <label htmlFor="status" className="mb-2 font-medium text-primaryText">
          Status
        </label>
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
        <label htmlFor="dueDate" className="mb-2 font-medium text-primaryText">
          Due Date
        </label>
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
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </div>
      </form>
    </>
  );
}
