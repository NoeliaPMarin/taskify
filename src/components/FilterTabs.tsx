import React from "react";

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  const filters = ["All", "Personal", "Work", "School"];

  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex flex-nowrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-t-lg font-medium whitespace-nowrap ${
              activeFilter === filter
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
