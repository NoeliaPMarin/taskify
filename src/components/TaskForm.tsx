import { useState } from "react";
import Button from "./Button";

export default function TaskForm({ onCancel, onCreate }: { onCancel?: () => void; onCreate?: () => void }) {
  const [title, setTitle] = useState("");
  const [list, setList] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("In Progress");
  const [dueDate, setDueDate] = useState("");

  return (
    <form className="w-full max-w-md flex flex-col gap-4">
      {/* Task Title */}
      <label htmlFor="title" className="mb-2 font-medium text-primaryText">
        Task Title
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
        className="border h-[50px] border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
      />

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onCreate}>
          Create
        </Button>
      </div>
    </form>
  );
}
