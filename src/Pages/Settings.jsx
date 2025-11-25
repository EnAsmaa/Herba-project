import React from 'react'
import { useState } from 'react';



export default function Settings() {

    const [preferences, setPreferences] = useState({
        theme: 'light',
        language: "en",
        notifications: true,
    });

    return <>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    Profile Settings
                </h1>
                {/* Preferences */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Preferences
                    </h3>
                        <div className='py-5'>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Theme Mode
                            </label>
                            <select
                                name="theme"
                                value={preferences.language}
                                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>

                        <div className='py-5'>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Language
                            </label>
                            <select
                                name="language"
                                value={preferences.language}
                                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="ar">Arabic</option>
                                <option value="en">English</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between py-5">
                            <span className="text-gray-700 dark:text-gray-200">Email Notifications</span>
                            <input
                                type="checkbox"
                                name="notifications"
                                checked={preferences.notifications}
                                className="h-5 w-5 accent-green-600"
                            />
                        </div>

                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-700 hover:bg-green-800 text-white dark:text-black rounded-lg font-semibold transition-colors"
                        >
                            Save Preferences
                        </button>
                </div>
            </div>
        </div>
    </>
}
