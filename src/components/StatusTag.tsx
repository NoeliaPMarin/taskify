interface StatusTagProps {
  status: "in-progress" | "complete" | "not-started";
}

export default function StatusTag({ status }: StatusTagProps) {
  const styles = {
    "in-progress": "bg-indigo-100 text-indigo-700",
    "complete": "bg-green-100 text-green-700",
    "not-started": "bg-gray-100 text-gray-700",
  };

  const labels = {
    "in-progress": "In Progress",
    "complete": "Complete",
    "not-started": "Not Started",
  };

  return (
    <span
      className={`px-2 sm:px-3 py-1 rounded-full text-sm sm:text-base font-medium whitespace-nowrap ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
