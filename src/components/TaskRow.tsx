import React, { useState } from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import StatusTag from "./StatusTag";

interface TaskRowProps {
    task: {
        id: number;
        title: string;
        status: string;
        dueDate: string;
        description?: string;
    };
    onDelete: (id: number) => void;
    onEdit: (task: {
        id: number;
        title: string;
        status: string;
        dueDate: string;
        description?: string;
    }) => void;
}

export default function TaskRow({ task, onDelete, onEdit }: TaskRowProps) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    const statusKey =
        task.status === "In Progress"
            ? "in-progress"
            : task.status === "Complete"
                ? "complete"
                : "not-started";

    return (
        <>
            {/* Desktop */}
            <tr className="border-t hidden sm:table-row">
                <td className="py-4 pl-4">{task.title}</td>
                <td>
                    <StatusTag status={statusKey} />
                </td>
                <td className="text-gray-600">{task.dueDate}</td>
                <td className="text-center">
                    <div className="flex items-center justify-center gap-3">
                        <EyeIcon
                            className="h-5 w-5 text-primary cursor-pointer"
                            onClick={() => setShowViewModal(true)}
                        />
                        <PencilIcon
                            className="h-5 w-5 text-primary cursor-pointer"
                            onClick={() => onEdit(task)}
                        />
                        <TrashIcon
                            className="h-5 w-5 text-primary cursor-pointer"
                            onClick={() => setShowConfirm(true)}
                        />
                    </div>
                </td>
            </tr>

            {/* Mobile */}
            <div className="sm:hidden border rounded-lg p-4 mb-4 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primaryText">{task.title}</h3>
                    <div className="flex items-center gap-2">
                        <EyeIcon
                            className="h-5 w-5 text-primary cursor-pointer"
                            onClick={() => setShowViewModal(true)}
                        />
                        <PencilIcon
                            className="h-5 w-5 text-primary cursor-pointer"
                            onClick={() => onEdit(task)}
                        />
                        <TrashIcon
                            className="h-5 w-5 text-primary cursor-pointer"
                            onClick={() => setShowConfirm(true)}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <StatusTag status={statusKey} />
                    <span className="text-gray-600 text-sm">Due: {task.dueDate}</span>
                </div>
            </div>

            {/* Confirm Delete Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
                        <p className="mb-4">Are you sure you want to delete this task?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    onDelete(task.id);
                                    setShowConfirm(false);
                                }}
                                className="px-4 py-2 bg-accent text-white rounded hover:bg-[#d97706]"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Task Modal */}
            {showViewModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4 sm:px-6"
                    onClick={() => setShowViewModal(false)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-xl relative w-full max-w-md sm:max-w-lg max-h-[90vh] mx-auto p-6 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setShowViewModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                        >
                            ✕
                        </button>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-primaryText mb-4">{task.title}</h2>

                        {/* Status & Due Date */}
                        <div className="flex items-center gap-4 mb-4">
                            <StatusTag status={
                                task.status === "In Progress" ? "in-progress" :
                                    task.status === "Complete" ? "complete" : "not-started"
                            } />
                            <span className="text-gray-500 text-sm">Due: {task.dueDate}</span>
                        </div>

                        {/* Divider */}
                        <hr className="border-gray-200 my-4" />

                        {/* Description */}
                        {task.description ? (
                            <p className="text-gray-700 text-base whitespace-pre-wrap">{task.description}</p>
                        ) : (
                            <p className="text-gray-400 italic">No description provided.</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
