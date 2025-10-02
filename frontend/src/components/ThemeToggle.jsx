import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-20 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <SunIcon className="h-5 w-5 text-yellow-500" />
        <MoonIcon className="h-5 w-5 text-blue-400" />
      </div>

      <div
        className={`absolute h-8 w-8 rounded-full bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isDarkMode ? "translate-x-5" : "-translate-x-5"
        }`}
      >
        <div className="flex h-full w-full items-center justify-center">
          {isDarkMode ? (
            <MoonIcon className="h-4 w-4 text-blue-400" />
          ) : (
            <SunIcon className="h-4 w-4 text-yellow-500" />
          )}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
