const { validationResult } = require("express-validator");
const Task = require("../models/Task");

/**
 * @desc    Get all tasks
 * @route   GET /api/v1/tasks
 * @access  Private
 */
const getTasks = async (req, res) => {
  try {
    const { status, priority, search, page = 1, limit = 10 } = req.query;

    // Build query
    let query = {};

    // For regular users, only show their tasks
    if (req.user.role === "user") {
      query.$or = [{ createdBy: req.user._id }, { assignedTo: req.user._id }];
    }

    // Add filters
    if (status) query.status = status;
    if (priority) query.priority = priority;

    // Add search functionality
    if (search) {
      const searchRegex = new RegExp(search, "i"); // Case-insensitive search
      const searchQuery = {
        $or: [{ title: searchRegex }, { description: searchRegex }],
      };

      // If user role query exists, combine with search
      if (query.$or) {
        query = {
          $and: [
            { $or: query.$or }, // User role filter
            searchQuery, // Search filter
          ],
        };
      } else {
        query = { ...query, ...searchQuery };
      }
    }

    // Execute query with pagination
    const tasks = await Task.find(query)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count for pagination
    const total = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        tasks,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
        },
      },
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({
      success: false,
      message: "Server error getting tasks",
    });
  }
};

/**
 * @desc    Get single task
 * @route   GET /api/v1/tasks/:id
 * @access  Private
 */
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Check if user has access to this task
    if (req.user.role === "user") {
      const hasAccess =
        task.createdBy._id.toString() === req.user._id.toString() ||
        (task.assignedTo &&
          task.assignedTo._id.toString() === req.user._id.toString());

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to access this task",
        });
      }
    }

    res.status(200).json({
      success: true,
      data: { task },
    });
  } catch (error) {
    console.error("Get task error:", error);
    res.status(500).json({
      success: false,
      message: "Server error getting task",
    });
  }
};

/**
 * @desc    Create new task
 * @route   POST /api/v1/tasks
 * @access  Private
 */
const createTask = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    // Add user as creator
    req.body.createdBy = req.user._id;

    const task = await Task.create(req.body);

    // Populate the created task
    await task.populate("createdBy", "name email");
    if (task.assignedTo) {
      await task.populate("assignedTo", "name email");
    }

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: { task },
    });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({
      success: false,
      message: "Server error creating task",
    });
  }
};

/**
 * @desc    Update task
 * @route   PUT /api/v1/tasks/:id
 * @access  Private
 */
const updateTask = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Check if user has permission to update
    if (req.user.role === "user") {
      const hasAccess =
        task.createdBy.toString() === req.user._id.toString() ||
        (task.assignedTo &&
          task.assignedTo.toString() === req.user._id.toString());

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this task",
        });
      }

      // Users can't assign tasks to others
      if (
        req.body.assignedTo &&
        req.body.assignedTo !== req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Users cannot assign tasks to other users",
        });
      }
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: { task },
    });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating task",
    });
  }
};

/**
 * @desc    Delete task
 * @route   DELETE /api/v1/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Check if user has permission to delete
    if (req.user.role === "user") {
      if (task.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to delete this task",
        });
      }
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting task",
    });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
