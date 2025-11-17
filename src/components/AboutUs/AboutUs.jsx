import React, { useEffect, useState } from "react";
import { FiTarget } from "react-icons/fi";
import { TbPlant2 } from "react-icons/tb";

export default function AboutUs() {
  return (
    <div className="container-fluid p-lg-5 p-md-4 p-3">
      <h2 className="fw-bold text-center">About Us</h2>
      <p className="text-center text-muted px-md-5 mx-md-5">
        At HerbalCare, we believe in the healing power of nature. Our mission is
        to bring you pure, natural remedies that support your health, beauty,
        and balance.
      </p>
      <div className="container-fluid">
        <div className="row g-4 pt-4">
          <div className="col-md-6">
            <div className="about-col-content border p-3 rounded-3">
              <div className="d-flex align-items-center gap-3 mb-3">
                <FiTarget className="fs-3 d-block aboutIcone" />
                <h3 className="mb-0">Our Mission</h3>
              </div>
              <p>
                To promote natural wellness by providing safe, effective, and
                eco-friendly herbal products.We aim to inspire healthier living
                through the power of plants
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="about-col-content border p-3 rounded-3">
              <div className="d-flex align-items-center gap-3 mb-3">
                <TbPlant2 className="fs-3 aboutIcone" />
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
    </div>
  );
}
