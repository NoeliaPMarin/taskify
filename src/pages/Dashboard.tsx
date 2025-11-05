import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterTabs from "../components/FilterTabs";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";

export default function Dashboard() {
    const [isLoggedIn] = useState(true);
    const [activeFilter, setActiveFilter] = useState("All");
    const [isFormOpen, setIsFormOpen] = useState(false); // Estado para el formulario

    useEffect(() => {
        if (isFormOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // Limpiar cuando se desmonte
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
                    <div className="max-w-5xl mx-auto mt-10 p-6 bg-gray-50 rounded-xl">
                        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                        <TaskTable tasks={tasks} filter={activeFilter} />
                    </div>
                </div>
            </main>
            <Footer />

            {isFormOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-10 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg relative w-full max-w-md max-h-[90vh] overflow-auto">
                        <button
                            onClick={closeForm}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                        >
                            ✕
                        </button>
                        <TaskForm
                            onCancel={closeForm}
                            onCreate={() => {
                                /* Aquí tu lógica para crear la tarea */
                                closeForm();
                            }}
                        />
                    </div>
                </div>
            )}

        </>
    );
}
