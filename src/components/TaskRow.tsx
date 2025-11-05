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


    return (
        <tr className="border-t">
            <td className="py-4 pl-4">{task.title}</td>
            <td>
                <StatusTag
                    status={
                        task.status === "In Progress"
                            ? "in-progress"
                            : task.status === "Complete"
                                ? "complete"
                                : "not-started"
                    }
                />
            </td>
            <td className="text-gray-600">{task.dueDate}</td>
            <td className="text-center align-middle">
                <div className="flex items-center justify-center gap-3">
                    <PencilIcon className="h-5 w-5 text-primary cursor-pointer" />
                    <TrashIcon className="h-5 w-5 text-primary cursor-pointer" />
                </div>
            </td>
        </tr>
    );
}
