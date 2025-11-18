import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterTabs from "../components/FilterTabs";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";

export default function Dashboard() {
  type Task = { id: number; title: string; list: string; description?: string; status: string; dueDate: string };

  const [isLoggedIn] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  useEffect(() => {
    document.body.style.overflow = isFormOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFormOpen]);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:4000/tasks");
      if (!res.ok) throw new Error("Error fetching tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const openEditForm = (task: Task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };

  const handleTaskUpdated = async () => {
    await fetchTasks();
    setTaskToEdit(undefined);
    closeForm();
  };

  const deleteTask = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) return console.error("Error deleting task");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => {
    setIsFormOpen(false);
    setTaskToEdit(undefined);
  };

  const handleTaskCreated = async () => {
    await fetchTasks();
    closeForm();
  };

  // ✅ Generamos las listas únicas dinámicas para los filtros
  const taskLists = Array.from(new Set(tasks.map(task => task.list))).filter(Boolean);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onAddTaskClick={openForm} />
      <main className="flex flex-col pb-14 bg-secondaryBackground">
        <div className="bg-Background">
          <div className="max-w-5xl mx-auto mt-6 sm:mt-10 p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-xl">
            <div className="overflow-x-auto">
              <FilterTabs
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                lists={taskLists}
              />
              <TaskTable
                tasks={tasks}
                filter={activeFilter}
                onDelete={deleteTask}
                onEdit={openEditForm}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {isFormOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4 sm:px-6"
          onClick={closeForm}
        >
          <div
            className="bg-white rounded-xl shadow-lg relative w-full max-w-md sm:max-w-lg max-h-[90vh] mx-auto p-0 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto max-h-[90vh] p-6">
              <button
                onClick={closeForm}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✕
              </button>
              <TaskForm
                onCancel={closeForm}
                onCreate={handleTaskCreated}
                onUpdate={handleTaskUpdated}
                task={taskToEdit}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
