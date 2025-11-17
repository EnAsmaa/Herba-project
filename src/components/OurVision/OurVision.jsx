import React, { useEffect, useState } from "react";
import OurVision1 from "../../assets/OurVision.jpg";
import OurVision2 from "../../assets/OurVision2.jpg";
import OurVision3 from "../../assets/pexels-mareefe-672046.jpg";

export default function OurVision() {
  return (
    <div className="container-fluid ourvision p-lg-5 p-md-4 p-3">
      <h2 className="text-center fw-bold">Our Vision</h2>
      <p className="text-center text-muted px-md-5 mx-md-5">
        Our vision is to become a leading source of natural wellness, empowering
        people to embrace a healthier lifestyle through the gentle power of
        herbs.
      </p>
      <div className="container-fluid">
        <div className="row g-3 pt-4">
          <div className=" col-md-6 col-lg-4">
            <div className="vision-col-content text-center">
              <img
                className="w-100 rounded-3 mb-3"
                src={OurVision1}
                alt={OurVision1}
              />
              <h4>Natural Ingredients</h4>
              <p>
                We source herbs directly from nature to ensure purity,
                freshness, and real health benefits.
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="vision-col-content text-center">
              <img
                className="w-100 rounded-3 mb-3"
                src={OurVision3}
                alt={OurVision3}
              />
              <h4>Eco-Friendly</h4>
              <p>
                Our products and packaging are designed with the planet in mind
                — sustainable and safe.
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="vision-col-content text-center">
              <img
                className="w-100 rounded-3 mb-3"
                src={OurVision2}
                alt={OurVision2}
              />
              <h4>Trusted Quality</h4>
              <p>
                Each product is crafted with care and tested for quality to
                support your well-being.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
