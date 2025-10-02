import React from "react";
import {
  PencilIcon,
  TrashIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const TaskList = ({
  tasks,
  loading,
  onEdit,
  onDelete,
  pagination,
  onPageChange,
}) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "in-progress":
        return "status-in-progress";
      case "completed":
        return "status-completed";
      default:
        return "status-pending";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "low":
        return "priority-low";
      case "medium":
        return "priority-medium";
      case "high":
        return "priority-high";
      default:
        return "priority-medium";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="glass-card p-12">
        <div className="flex flex-col items-center justify-center">
          <div className="modern-spinner mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
            Loading your tasks...
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="glass-card p-12">
        <div className="text-center">
          <div className="h-20 w-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No tasks found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Create your first task to get started on your productivity journey!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task, index) => (
          <div
            key={task._id}
            className="card card-hover"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 flex-1 mr-2">
                {task.title}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(task)}
                  className="p-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-800/40 text-blue-600 dark:text-blue-400 rounded-lg transition-all duration-200 hover:scale-110"
                  title="Edit task"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="p-2 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-800/40 text-red-600 dark:text-red-400 rounded-lg transition-all duration-200 hover:scale-110"
                  title="Delete task"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
              {task.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className={getStatusClass(task.status)}>
                {task.status.replace("-", " ").toUpperCase()}
              </span>
              <span className={getPriorityClass(task.priority)}>
                {task.priority.toUpperCase()} PRIORITY
              </span>
            </div>

            {task.dueDate && (
              <div className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg mb-4">
                <CalendarIcon className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                <span className="text-sm font-medium">
                  Due: {formatDate(task.dueDate)}
                </span>
              </div>
            )}

            <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Created: {formatDate(task.createdAt)}</span>
                {task.createdBy && (
                  <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-medium">
                    {task.createdBy.name}
                  </span>
                )}
              </div>
              {task.assignedTo && (
                <div className="text-xs text-gray-500">
                  <span>Assigned to: </span>
                  <span className="bg-purple-50 text-purple-600 px-2 py-1 rounded-full font-medium">
                    {task.assignedTo.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modern Pagination */}
      {pagination.pages > 1 && (
        <div className="glass-card p-6 mt-8">
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => onPageChange(pagination.current - 1)}
              disabled={pagination.current === 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Page {pagination.current} of {pagination.pages}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({pagination.total} total tasks)
              </span>
            </div>

            <button
              onClick={() => onPageChange(pagination.current + 1)}
              disabled={pagination.current === pagination.pages}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <svg
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
