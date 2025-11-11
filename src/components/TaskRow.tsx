import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import StatusTag from "./StatusTag";

interface TaskRowProps {
    task: {
        id: number;
        title: string;
        status: string;
        dueDate: string;
    };
}

export default function TaskRow({ task }: TaskRowProps) {
    const statusKey =
        task.status === "In Progress"
            ? "in-progress"
            : task.status === "Complete"
            ? "complete"
            : "not-started";

    return (
        <>
            {/* Desktop table row */}
            <tr className="border-t hidden sm:table-row">
                <td className="py-4 pl-4">{task.title}</td>
                <td>
                    <StatusTag status={statusKey} />
                </td>
                <td className="text-gray-600">{task.dueDate}</td>
                <td className="text-center">
                    <div className="flex items-center justify-center gap-3">
                        <PencilIcon className="h-5 w-5 text-primary cursor-pointer" />
                        <TrashIcon className="h-5 w-5 text-primary cursor-pointer" />
                    </div>
                </td>
            </tr>

            {/* Mobile card */}
            <div className="sm:hidden border rounded-lg p-4 mb-4 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primaryText">{task.title}</h3>
                    <div className="flex items-center gap-2">
                        <PencilIcon className="h-5 w-5 text-primary cursor-pointer" />
                        <TrashIcon className="h-5 w-5 text-primary cursor-pointer" />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <StatusTag status={statusKey} />
                    <span className="text-gray-600 text-sm">Due: {task.dueDate}</span>
                </div>
            </div>
        </>
    );
}
