const Task = require("../models/Task");

// Create
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user,
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update
exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};