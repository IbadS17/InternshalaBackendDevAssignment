import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { authAPI } from "../utils/api";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  const status = searchParams.get("status");
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const errorMessage = searchParams.get("message");

  useEffect(() => {
    // Handle the verification result from URL parameters
    if (status === "success") {
      setVerificationStatus("success");
      setMessage(
        "Email verified successfully! You can now log in to your account."
      );
      setUserData({ email, name });
      toast.success("Email verified successfully!");
    } else if (status === "error") {
      setVerificationStatus("error");
      setMessage(
        errorMessage ||
          "Verification failed. The link may be expired or invalid."
      );
      toast.error("Verification failed");
    } else {
      // No status parameter - redirect to login or show error
      setVerificationStatus("error");
      setMessage("Invalid verification link.");
    }
  }, [status, email, name, errorMessage]);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const renderVerifyingState = () => (
    <div className="text-center">
      <div className="h-20 w-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Verifying Your Email...
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Please wait while we verify your email address.
      </p>
    </div>
  );

  const renderSuccessState = () => (
    <div className="text-center">
      <div className="h-20 w-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
        <CheckCircleIcon className="h-10 w-10 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        🎉 Email Verified Successfully!
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>

      {userData && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
            Welcome to TaskMaster, {userData.name}! 🚀
          </h3>
          <p className="text-green-700 dark:text-green-400 text-sm">
            Your account is now active. You can start managing your tasks and
            boost your productivity!
          </p>
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={handleLoginRedirect}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <span>Log In to Your Account</span>
          <ArrowRightIcon className="h-4 w-4" />
        </button>

        <Link
          to="/"
          className="btn-secondary w-full flex items-center justify-center space-x-2"
        >
          <HomeIcon className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );

  const renderErrorState = () => (
    <div className="text-center">
      <div className="h-20 w-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
        <XCircleIcon className="h-10 w-10 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        ❌ Verification Failed
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>

      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
          Common Issues:
        </h3>
        <ul className="text-red-700 dark:text-red-400 text-sm space-y-1 text-left list-disc list-inside">
          <li>The verification link has expired (valid for 24 hours)</li>
          <li>The link has already been used</li>
          <li>The link was copied incorrectly</li>
        </ul>
      </div>

      <div className="space-y-3">
        <Link
          to="/register"
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <span>Try Registering Again</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>

        <Link to="/login" className="btn-secondary w-full">
          Back to Login
        </Link>

        <Link
          to="/"
          className="btn-secondary w-full flex items-center justify-center space-x-2"
        >
          <HomeIcon className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo/Brand Section */}
        <div className="text-center fade-in-up">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <span className="text-2xl font-bold text-white">TM</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 dark:from-indigo-400 to-purple-600 dark:to-purple-400 bg-clip-text text-transparent mb-2">
            TaskMaster
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Professional Task Management Platform
          </p>
        </div>

        {/* Verification Content */}
        <div className="glass-card p-8">
          {verificationStatus === "verifying" && renderVerifyingState()}
          {verificationStatus === "success" && renderSuccessState()}
          {verificationStatus === "error" && renderErrorState()}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2025 TaskMaster. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
