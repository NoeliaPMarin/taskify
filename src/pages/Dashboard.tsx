import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterTabs from "../components/FilterTabs";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";
import Button from "../components/Button";
import { API_URL, authHeaders } from "../lib/api";
import type { Task } from "../types/task";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  const [sort, setSort] = useState("due-asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    document.body.style.overflow = isFormOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFormOpen]);

  const fetchTasks = async () => {
    try {
      setError("");
      const res = await fetch(`${API_URL}/tasks`, { headers: authHeaders() });
      if (!res.ok) throw new Error("We couldn't load your tasks. Please try again.");
      const data = await res.json();
      setTasks(data);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  const openEditForm = (task: Task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };

  const handleTaskUpdated = async () => {
    await fetchTasks();
    showNotice("Task updated successfully.");
    setTaskToEdit(undefined);
    closeForm();
  };

  const deleteTask = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Unable to delete the task.");
      await fetchTasks();
      showNotice("Task deleted.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete the task.");
    }
  };

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => {
    setIsFormOpen(false);
    setTaskToEdit(undefined);
  };

  const handleTaskCreated = async () => {
    await fetchTasks();
    showNotice("Task created successfully.");
    closeForm();
  };

  // ✅ Generamos las listas únicas dinámicas para los filtros
  const taskLists = Array.from(new Set(tasks.map(task => task.list))).filter(Boolean);
  const today = new Date().toISOString().slice(0, 10);
  const stats = {
    total: tasks.length,
    active: tasks.filter((task) => task.status !== "Complete").length,
    complete: tasks.filter((task) => task.status === "Complete").length,
    overdue: tasks.filter((task) => task.status !== "Complete" && task.dueDate < today).length,
  };
  const visibleTasks = tasks
    .filter((task) => `${task.title} ${task.list} ${task.description || ""}`.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => activeFilter === "All" || task.list === activeFilter)
    .sort((a, b) => {
      if (sort === "due-desc") return b.dueDate.localeCompare(a.dueDate);
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "status") return a.status.localeCompare(b.status);
      return a.dueDate.localeCompare(b.dueDate);
    });

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar isLoggedIn onAddTaskClick={openForm} search={search} onSearchChange={setSearch} />
      <main className="min-h-[calc(100vh-5rem)] bg-secondaryBackground pb-14">
          <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Workspace</p><h1 className="mt-1 text-3xl font-bold text-primaryText">Your tasks</h1><p className="mt-2 text-secondaryText">Keep your priorities visible and your progress moving.</p></div>
              <Button variant="secondary" onClick={openForm}>+ Add task</Button>
            </div>

            <section className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Task overview">
              {[['Total', stats.total, 'text-primary'], ['Active', stats.active, 'text-blue-600'], ['Completed', stats.complete, 'text-emerald-600'], ['Overdue', stats.overdue, 'text-red-600']].map(([label, value, color]) => (
                <div key={label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-secondaryText">{label}</p><p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p></div>
              ))}
            </section>

            <section className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm sm:p-6">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <FilterTabs
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                lists={taskLists}
              />
                <label className="flex items-center gap-2 text-sm text-secondaryText">Sort by
                  <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-primaryText outline-none focus:ring-2 focus:ring-primary">
                    <option value="due-asc">Due date: soonest</option><option value="due-desc">Due date: latest</option><option value="title">Title</option><option value="status">Status</option>
                  </select>
                </label>
              </div>

              {loading ? <div className="grid min-h-64 place-items-center text-secondaryText" role="status">Loading your tasks…</div> : error ? (
                <div className="grid min-h-64 place-items-center text-center"><div><p className="font-semibold text-red-700">{error}</p><button onClick={fetchTasks} className="mt-4 font-semibold text-primary hover:underline">Try again</button></div></div>
              ) : visibleTasks.length === 0 ? (
                <div className="grid min-h-64 place-items-center text-center"><div><div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-2xl text-primary">✓</div><h2 className="text-xl font-bold text-primaryText">{search || activeFilter !== "All" ? "No matching tasks" : "Your workspace is ready"}</h2><p className="mt-2 text-secondaryText">{search || activeFilter !== "All" ? "Try a different search or filter." : "Create your first task to get started."}</p>{!search && activeFilter === "All" && <button onClick={openForm} className="mt-4 font-semibold text-primary hover:underline">Create a task</button>}</div></div>
              ) : <div className="overflow-x-auto"><TaskTable tasks={visibleTasks} filter="All" onDelete={deleteTask} onEdit={openEditForm} /></div>}
            </section>
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
      {notice && <div className="fixed bottom-6 right-6 z-[60] rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-xl" role="status">{notice}</div>}
    </>
  );
}
