// ProfileSettings.jsx
import React, { useState } from "react";

export default function Profile() {
  const [personal, setPersonal] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
  });

  const [security, setSecurity] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });




  return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Profile Settings
          </h1>
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Personal Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Personal Information
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={personal.fullName}
                    placeholder="John Doe"
                    className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={personal.username}
                    placeholder="johndoe"
                    className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={personal.email}
                    placeholder="john@example.com"
                    className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    rows="3"
                    value={personal.bio}
                    placeholder="Tell us about yourself..."
                    className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2 bg-green-700 hover:bg-green-800 text-white dark:text-black rounded-lg font-semibold transition-colors"
                >
                  Save Personal Info
                </button>
              </form>
            </div>

            {/* Security */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Security
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={security.oldPassword}
                    className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={security.newPassword}
                    className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={security.confirmPassword}
                    className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2 bg-green-700 hover:bg-green-800 text-white dark:text-black rounded-lg font-semibold transition-colors"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}
