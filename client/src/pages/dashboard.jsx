import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import Loader from "../components/Loader";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../services/taskService";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);

      setTasks([newTask, ...tasks]);

      toast.success("Task created");
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);

      setTasks(tasks.filter((task) => task._id !== id));

      toast.success("Task deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // Update status
  const handleStatusChange = async (id, status) => {
    try {
      const updatedTask = await updateTask(id, {
        status,
      });

      setTasks(
        tasks.map((task) =>
          task._id === id ? updatedTask : task
        )
      );

      toast.success("Task updated");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-4 py-6 sm:px-6">
      <Navbar />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          Task Dashboard
        </h1>

        {/* Task Form */}
        <TaskForm onCreateTask={handleCreateTask} />

        {/* Loading */}
        {loading && <Loader />}

        {/* Empty State */}
        {!loading && tasks.length === 0 && (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              No tasks yet
            </h2>
            <p className="text-gray-500 mt-2">
              Create your first task to get started.
            </p>
          </div>
        )}

        {/* Task List */}
        <div className="grid gap-5 md:grid-cols-2">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;