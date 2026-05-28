import asyncHandler from "express-async-handler";
import Task from "../models/Task.js";

/*
  @desc Get all tasks
  @route GET /api/tasks
*/
export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

/*
  @desc Create task
  @route POST /api/tasks
*/
export const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  const task = await Task.create({
    title,
    description,
    user: req.user._id,
  });

  res.status(201).json(task);
});

/*
  @desc Update task
  @route PUT /api/tasks/:id
*/
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // ownership check
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  // Updated { new: true } to { returnDocument: 'after' } to fix deprecation warning
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: 'after' }
  );

  res.json(updatedTask);
});

/*
  @desc Delete task
  @route DELETE /api/tasks/:id
*/
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await task.deleteOne();

  res.json({ message: "Task deleted successfully" });
});