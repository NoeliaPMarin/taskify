interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  lists: string[];
}

export default function FilterTabs({ activeFilter, onFilterChange, lists }: FilterTabsProps) {
  // Incluimos siempre "All" al inicio
  const tabs = ["All", ...lists];

  return (
    <div className="flex max-w-full gap-2 overflow-x-auto pb-1" aria-label="Filter tasks by list">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onFilterChange(tab)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition ${
            activeFilter === tab ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
