import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Consultation() {
  return (
    <section className="my-9">
      <div className="container mx-auto">
        <h2 className="heading-Sections mb-">Mental Health Consultaion</h2>
        <p className="text-center text-lg text-[#333333] dark:text-[#C5CFD6] md:w-3/4 mx-auto">Book your session with the best certified consultants</p>
        <div className="search-wrapper bg-green-800/10 py-8 rounded-lg">
          <div className="search-box relative mx-auto w-2xs sm:w-sm md:w-md lg:w-lg">
            <FaSearch className="absolute text-gray-500 -translate-y-1/2 top-1/2 left-3 cursor-pointer fs-4" />
            <input
              type="search"
              className="bg-gray-50 text-gray-900 border border-gray-300 dark:bg-gray-100 dark:text-black focus:outline-0 rounded-lg py-2 px-8 w-full "
              placeholder="Search for herbs..."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
