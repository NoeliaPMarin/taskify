import React from "react";

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  lists: string[];
}

export default function FilterTabs({ activeFilter, onFilterChange, lists }: FilterTabsProps) {
  // Incluimos siempre "All" al inicio
  const tabs = ["All", ...lists];

  return (
    <div className="flex gap-4 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onFilterChange(tab)}
          className={`px-4 py-2 rounded-full ${
            activeFilter === tab ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
