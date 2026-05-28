import { useState } from "react";

const TaskForm = ({ onCreateTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreateTask({
      title,
      description,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md mb-8"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">
        Create New Task
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          rows="4"
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />

        <button
          type="submit"
          className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;