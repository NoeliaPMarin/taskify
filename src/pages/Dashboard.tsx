import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterTabs from "../components/FilterTabs";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";

export default function Dashboard() {
  const [isLoggedIn] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isFormOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFormOpen]);

  const tasks = [
    { id: 1, title: "Design new homepage", status: "In Progress", dueDate: "Apr 25, 2024", category: "Work" },
    { id: 2, title: "Write blog post", status: "Complete", dueDate: "Apr 20, 2024", category: "Personal" },
    { id: 3, title: "Update project documentation", status: "Not started", dueDate: "Apr 15, 2024", category: "Work" },
  ];

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onAddTaskClick={openForm} />
      <main className="flex flex-col pb-14 bg-secondaryBackground">
        <div className="bg-Background">
          <div className="max-w-5xl mx-auto mt-6 sm:mt-10 p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-xl">
            <div className="overflow-x-auto">
              <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
              <TaskTable tasks={tasks} filter={activeFilter} />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {isFormOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4 sm:px-6"
          onClick={closeForm} // Cerrar al hacer clic en el overlay
        >
          <div
            className="bg-white rounded-xl shadow-lg relative w-full max-w-md sm:max-w-lg max-h-[90vh] mx-auto p-0 overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Evita cerrar al clicar dentro del modal
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
                onCreate={() => closeForm()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
