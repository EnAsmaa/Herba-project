import React, { useState } from 'react'

export default function Privacy() {
    const [privacy, setPrivacy] = useState({
        profilePublic: true,
        shareData: false,
    });
    return <>
        <div className="min-h-screen bg-main">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    Profile Settings
                </h1>
                {/* Main Content */}
                {/* Privacy */}
                <div className="bg-main border border-black/50 dark:border-white/50 rounded-lg p-6 shadow-lg shadow-black/5 dark:shadow-amber-50/5">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Privacy
                    </h3>
                    <form className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700 dark:text-gray-200">Profile Public</span>
                            <input
                                type="checkbox"
                                name="profilePublic"
                                checked={privacy.profilePublic}
                                className="h-5 w-5 accent-green-600"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-700 dark:text-gray-200">Share Data</span>
                            <input
                                type="checkbox"
                                name="shareData"
                                checked={privacy.shareData}
                                className="h-5 w-5 bg-[#3a5543]"
                            />
                        </div>

                        <button
                            type="submit"
                            className="px-6 py-2 btn text-white dark:text-black rounded-lg font-semibold transition-colors"
                        >
                            Save Privacy Settings
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
}
