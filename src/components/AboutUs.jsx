import React, { useEffect, useState } from "react";
import { FiTarget } from "react-icons/fi";
import { TbPlant2 } from "react-icons/tb";

export default function AboutUs() {
  return (
    <section>
      <div className="container lg:px-7 px-4 mx-auto">
        <h2 className="heading-Sections">About Us</h2>
        <p className="cap-sections">
          At HerbalCare, we believe in the healing power of nature. Our mission
          is to bring you pure, natural remedies that support your health,
          beauty, and balance.
        </p>
        <div>
          <div className="gridtemplet mt-7">
            <div className="aboutBox bg-white dark:bg-[#111B21]">
              <div className="flex items-center gap-3 mb-3 ">
                <FiTarget className="block text-2xl text-[#4d7c5c]" />
                <h3 className="mb-0 text-2xl ">Our Mission</h3>
              </div>
              <p className="text-[#4d7c5c] dark:text-[#4d805e] text-lg">
                To promote natural wellness by providing safe, effective, and
                eco-friendly herbal products.We aim to inspire healthier living
                through the power of plants
              </p>
            </div>
            <div className="aboutBox bg-white dark:bg-[#111B21]">
              <div className="flex items-center gap-3 mb-3">
                <TbPlant2 className="block text-2xl text-[#4d7c5c]" />
                <h3 className="mb-0 text-2xl">Our Philosophy</h3>
              </div>
              <p className="text-[#4d7c5c] dark:text-[#4d805e] text-lg">
                We believe that true beauty and wellness come from harmony with
                nature. Every product we create reflects our commitment to
                purity, balance, and care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
