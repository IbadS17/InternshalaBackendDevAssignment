import React, { useState, useEffect } from "react";
import { useAuth }          {/* User Profile & Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* User Info - Clickable */}om "../context/AuthContext";
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import ProfileModal from "./ProfileModal";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);

  // Load profile data from localStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfileData(JSON.parse(storedProfile));
    }
  }, []);

  // Listen for profile updates
  useEffect(() => {
    const handleStorageChange = () => {
      const storedProfile = localStorage.getItem("userProfile");
      if (storedProfile) {
        setProfileData(JSON.parse(storedProfile));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleProfileUpdate = () => {
    // Force reload profile data when modal is closed
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfileData(JSON.parse(storedProfile));
    }
  };

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-lg shadow-soft border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-lg font-bold text-white">TM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  TaskMaster
                </h1>
                <p className="text-xs text-gray-500 -mt-1">
                  Professional Task Management
                </p>
              </div>
            </div>

            {/* User Profile & Actions */}
            <div className="flex items-center space-x-6">
              {/* User Info - Clickable */}
              <div
                onClick={handleProfileClick}
                className="flex items-center space-x-3 bg-gray-50 rounded-2xl px-4 py-2 hover:bg-gray-100 transition-colors duration-200 cursor-pointer hover:shadow-md"
              >
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-sm relative overflow-hidden">
                  {profileData?.profilePicture || user?.profilePicture ? (
                    <img
                      src={profileData?.profilePicture || user?.profilePicture}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <UserIcon className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
                    {profileData?.name || user?.name}
                  </p>
                  <p className="text-xs text-gray-500 hover:text-gray-600 transition-colors">
                    {profileData?.email || user?.email || "User Account"}
                  </p>
                </div>
                {user?.role === "admin" && (
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                    Admin
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Modal - Rendered outside navbar for proper positioning */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          handleProfileUpdate();
        }}
      />
    </>
  );
};

export default Navbar;
