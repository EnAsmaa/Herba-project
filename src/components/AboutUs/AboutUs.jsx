import React, { useEffect, useState } from "react";
import { FiTarget } from "react-icons/fi";
import { TbPlant2 } from "react-icons/tb";

export default function AboutUs() {
  return (
    <div data-aos="" className="">
      <h2 className="text-center font-bold text-3xl">About Us</h2>
      <p className="text-center text-muted">
        At HerbalCare, we believe in the healing power of nature. Our mission is
        to bring you pure, natural remedies that support your health, beauty,
        and balance.
      </p>
      <div className="">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 mt-5">
          <div className="about-col-content border p-3 rounded-3">
            <div className="flex items-center gap-3 mb-3">
              <FiTarget className="fs-3 d-block aboutIcone" />
              <h3 className="mb-0">Our Mission</h3>
            </div>
            <p>
              To promote natural wellness by providing safe, effective, and
              eco-friendly herbal products.We aim to inspire healthier living
              through the power of plants
            </p>
          </div>
          <div className="about-col-content border p-3 rounded-3">
            <div className="flex items-center gap-3 mb-3">
              <TbPlant2 className="fs-3 d-block aboutIcone" />
              <h3 className="mb-0">Our Philosophy</h3>
            </div>
            <p>
              We believe that true beauty and wellness come from harmony with
              nature. Every product we create reflects our commitment to
              purity, balance, and care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
