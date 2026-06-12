import React, { useState, useEffect } from "react";
import { IoNotifications } from "react-icons/io5";
import notifications from "../data/notification.json";

export default function Notification() {
  const today = new Date().toDateString();

  const [dailyTip, setDailyTip] = useState(null);
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    let savedTip = localStorage.getItem("dailyTip");

    if (!savedTip || localStorage.getItem("dailyTipDate") !== today) {
      const randomTip =
        notifications[Math.floor(Math.random() * notifications.length)];

      savedTip = JSON.stringify(randomTip);

      localStorage.setItem("dailyTip", savedTip);
      localStorage.setItem("dailyTipDate", today);

      // New day => notification becomes unread
      localStorage.setItem("dailyTipRead", "false");
    }

    setDailyTip(JSON.parse(savedTip));
    setIsRead(localStorage.getItem("dailyTipRead") === "true");
  }, [today]);

  const handleMarkAsRead = () => {
    localStorage.setItem("dailyTipRead", "true");

    window.dispatchEvent(new Event("notification-read"));
  };

  if (!dailyTip) return null;

  return (
    <section className="my-5 py-5 px-4 lg:px-7 container mx-auto">
      <div>
        <h2 className="mb-8 text-center font-bold text-4xl dark:text-[#E9EDEF]">
          Notifications
        </h2>

        <div className="max-w-3xl mx-auto">
          <div
            className={`flex items-start gap-4 px-5 py-6 rounded-xl shadow transition-all duration-300 ${!isRead
              ? "bg-green-50 border-l-4 border-green-500 dark:bg-green-900/20"
              : "bg-white dark:bg-[#1A242A]"
              }`}
          >
            <div
              className={`p-4 rounded-full ${!isRead ? "bg-green-200" : "bg-gray-100 dark:bg-slate-700"
                }`}
            >
              <IoNotifications
                className={`text-2xl ${!isRead ? "text-green-700" : "text-gray-600 dark:text-gray-300"
                  }`}
              />
            </div>

            <div className="flex-1">
              <span
                className={`text-sm font-medium ${!isRead ? "text-green-600" : "text-gray-500"
                  }`}
              >
                Today's Herbal Tip
              </span>

              <h5 className="text-xl font-bold text-black dark:text-white mt-1">
                {dailyTip.title}
              </h5>

              <p className="mt-2 text-[#333333] dark:text-[#8696A0] leading-relaxed">
                {dailyTip.tip}
              </p>

              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                {today}
              </p>

              {!isRead && (
                <button
                  onClick={handleMarkAsRead}
                  className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                >
                  Mark as Read
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}