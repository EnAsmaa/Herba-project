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
    <section className="min-h-[80vh] my-4 py-6 px-4 lg:px-7 container mx-auto font-sans text-[#3E4E36] dark:text-[#E2E8F0] transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        
        {/* Title */}
        <h2 className="mb-8 text-center font-black text-3xl md:text-4xl text-[#3E4E36] dark:text-[#E2E8F0]">
          Notifications
        </h2>

        {/* Notification Container */}
        <div className="space-y-4">
          <div
            className={`flex items-start gap-4 px-5 py-6 rounded-2xl border transition-all duration-300 ${
              !isRead
                ? "bg-green-50/60 dark:bg-green-950/20 border-green-200 dark:border-green-900/30 shadow-sm border-l-4 border-l-[#446C4F] dark:border-l-[#528B63]"
                : "bg-white dark:bg-[#232925] border-gray-100 dark:border-[#2C3530]"
            }`}
          >
            {/* Notification Icon Badge */}
            <div
              className={`p-3.5 rounded-xl shrink-0 transition-colors ${
                !isRead 
                  ? "bg-green-100 dark:bg-green-900/40 text-[#446C4F] dark:text-[#528B63]" 
                  : "bg-gray-50 dark:bg-[#1A1F1C] text-gray-400 dark:text-zinc-500"
              }`}
            >
              <IoNotifications className="text-xl md:text-2xl" />
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-xs uppercase tracking-wider font-bold ${
                    !isRead ? "text-[#446C4F] dark:text-[#528B63]" : "text-gray-400 dark:text-zinc-500"
                  }`}
                >
                  Today's Herbal Tip
                </span>
                
                {/* Unread dot indicator */}
                {!isRead && (
                  <span className="w-2 h-2 bg-[#446C4F] dark:bg-[#528B63] rounded-full animate-pulse"></span>
                )}
              </div>

              <h5 className="text-lg md:text-xl font-black text-[#3E4E36] dark:text-[#E2E8F0] mt-1.5 leading-snug">
                {dailyTip.title}
              </h5>

              <p className="mt-2 text-sm text-[#3E4E36]/90 dark:text-[#94A3B8] leading-relaxed">
                {dailyTip.tip}
              </p>

              {/* Footer Meta & Action */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-100/60 dark:border-[#2C3530]/40">
                <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium">
                  {today}
                </p>

                {!isRead && (
                  <button
                    onClick={handleMarkAsRead}
                    className="self-end sm:self-auto px-4 py-1.5 bg-[#446C4F] dark:bg-[#528B63] hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}