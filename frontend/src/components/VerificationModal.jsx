import React, { useState } from "react";
import {
  XMarkIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { authAPI } from "../utils/api";
import toast from "react-hot-toast";

const VerificationModal = ({
  isOpen,
  onClose,
  onNavigateToLogin,
  email,
  userName,
}) => {
  const [isResending, setIsResending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      const response = await authAPI.resendVerificationEmail(email);
      if (response.data.success) {
        setEmailSent(true);
        toast.success("Verification email sent successfully!");
        setTimeout(() => {
          setEmailSent(false);
        }, 3000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send verification email"
      );
    } finally {
      setIsResending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-[9999] flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full shadow-strong fade-in-up p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <EnvelopeIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 dark:from-indigo-400 to-purple-600 dark:to-purple-400 bg-clip-text text-transparent">
                Verify Your Email
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Welcome Message */}
          <div className="text-center">
            <div className="mb-4">
              <div className="h-20 w-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <CheckCircleIcon className="h-10 w-10 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Welcome to TaskMaster, {userName}! 🎉
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your account has been created successfully. We've sent a
              verification email to:
            </p>
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="font-semibold text-indigo-600 dark:text-indigo-400 break-all">
                {email}
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
              <EnvelopeIcon className="h-5 w-5 mr-2" />
              Next Steps:
            </h4>
            <ol className="text-blue-700 dark:text-blue-300 text-sm space-y-1 list-decimal list-inside">
              <li>Check your email inbox (and spam folder)</li>
              <li>Look for an email from TaskMaster</li>
              <li>Click the "Verify Email" button in the email</li>
              <li>Return here to log in to your account</li>
            </ol>
          </div>

          {/* Resend Email Section */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Didn't receive the email?
            </p>
            {emailSent ? (
              <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                <CheckCircleIcon className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Email sent successfully!
                </span>
              </div>
            ) : (
              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="btn-secondary flex items-center space-x-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowPathIcon
                  className={`h-4 w-4 ${isResending ? "animate-spin" : ""}`}
                />
                <span>{isResending ? "Sending..." : "Resend Email"}</span>
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onNavigateToLogin || onClose}
                className="btn-primary flex-1"
              >
                Go to Login Page
              </button>
            </div>
          </div>

          {/* Security Note */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-lg p-3">
            <p className="text-yellow-800 dark:text-yellow-300 text-xs text-center">
              🔒 For security, the verification link will expire in 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
