import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaFileAlt } from "react-icons/fa";

export default function Notification() {
  const [activeCat, setActiveCat] = useState("All");
  const categories = ["All", "Dates", "Offers", "Tips"];
  return (
    <>
      <section className="my-5 py-5 px-4  lg:px-7 container mx-auto">
        <div className="text-cente">
          <h2 className="mb-1 text-center font-bold text-4xl dark:text-[#E9EDEF]">
            Notification
          </h2>
          <div className="categories ">
            <ul className="list-none mt-2 flex items-center justify-center gap-5 mb-0 overflow-x-auto flex-nowrap scrollbar-hide py-4 ">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={`cursor-pointer bg-green-800/10 dark:bg-green-200/10 text-black dark:text-white px-4 py-1.5 rounded-full border border-green-200/10 whitespace-nowrap ${
                    activeCat === cat ? "cat-active" : ""
                  }`}
                  onClick={() => setActiveCat(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
          <ul className=" font-semibold my-5 dark:text-[#3f7951] flex items-center justify-around ">
            <li>Today</li>
            <li>Yesterday</li>
            <li>This Week</li>
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <div className="today-content flex flex-col gap-5">
              <div className="today-content-item flex items-start  gap-4  px-3 py-5 bg-white dark:bg-[#1A242A] rounded-lg shadow">
                <div className="bg-red-100 w-fit py-4 px-3 rounded-4xl">
                  <FaHeart className="text-red-800 cursor-pointer" />
                </div>
                <div>
                  <h5 className="text-lg font-bold text-black dark:text-[white]">
                    Flash Sale!
                  </h5>
                  <p className="text-base text-[#333333] dark:text-[#8696A0]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Enim quod hic odio asperiores dolore autem?
                  </p>
                </div>
              </div>
              <div className="today-content-item flex items-start  gap-4  px-3 py-5 bg-white dark:bg-[#1A242A] rounded-lg shadow">
                <div className="bg-blue-100 w-fit py-4 px-3 rounded-4xl">
                  <FaCalendarCheck className="text-blue-800 cursor-pointer" />
                </div>
                <div>
                  <h5 className="text-lg font-bold text-black dark:text-[white]">
                    Remember Dates!
                  </h5>
                  <p className="text-base text-[#333333] dark:text-[#8696A0]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Enim quod hic odio asperiores dolore autem?
                  </p>
                </div>
              </div>
            </div>
            <div className="yes-content flex flex-col gap-5">
              <div className="yes-content-item flex items-start  gap-4  px-3 py-5 bg-white dark:bg-[#1A242A] rounded-lg shadow">
                <div className="bg-green-100 w-fit py-4 px-3 rounded-4xl">
                  <IoNotifications className="text-green-800 cursor-pointer" />
                </div>
                <div>
                  <h5 className="text-lg font-bold text-black dark:text-[white]">
                    Your Daily Herbal Tips!
                  </h5>
                  <p className="text-base text-[#333333] dark:text-[#8696A0]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Enim quod hic odio asperiores dolore autem?
                  </p>
                </div>
              </div>
              <div className="yes-content-item flex items-start  gap-4  px-3 py-5 bg-white dark:bg-[#1A242A] rounded-lg shadow">
                <div className="bg-blue-100 w-fit py-4 px-3 rounded-4xl">
                  <FaCalendarCheck className="text-blue-800 cursor-pointer" />
                </div>
                <div>
                  <h5 className="text-lg font-bold text-black dark:text-[white]">
                    Order Shipped!
                  </h5>
                  <p className="text-base text-[#333333] dark:text-[#8696A0]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Enim quod hic odio asperiores dolore autem?
                  </p>
                </div>
              </div>
            </div>
            <div className="week-content flex flex-col gap-5">
              <div className="yes-content-item flex items-start  gap-4  px-3 py-5 bg-white dark:bg-[#1A242A] rounded-lg shadow">
                <div className="bg-purple-100 w-fit py-4 px-3 rounded-4xl">
                  <FaFileAlt className="text-purple-800 cursor-pointer" />
                </div>
                <div>
                  <h5 className="text-lg font-bold text-black dark:text-[white]">
                    New Article Published!
                  </h5>
                  <p className="text-base text-[#333333] dark:text-[#8696A0]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Enim quod hic odio asperiores dolore autem?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
