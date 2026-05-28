const TaskCard = ({
  task,
  onDelete,
  onStatusChange,
}) => {
  // Status colors
  const statusColors = {
    Todo: "bg-yellow-100 text-yellow-700",
    "In Progress":
      "bg-blue-100 text-blue-700",
    Done: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition">
      {/* Top section */}
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {task.title}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[task.status]}`}
        >
          {task.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-5">
        {task.description || "No description"}
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(
              task._id,
              e.target.value
            )
          }
          className="border border-gray-300 p-2 rounded-lg text-sm"
        >
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition w-full sm:w-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

