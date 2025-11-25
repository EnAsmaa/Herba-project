import React, { useEffect, useState } from "react";
import OurVision1 from "../../assets/OurVision.jpg";
import OurVision2 from "../../assets/OurVision2.jpg";
import OurVision3 from "../../assets/pexels-mareefe-672046.jpg";

export default function OurVision() {
  return (
    <section className="bg-[#e6f0ea] dark:bg-[#111B21] py-10">
      <div className="container mx-auto px-4 py-2">
        <h2 className="text-center font-bold text-3xl mb-5 dark:text-[#E9EDEF]">Our Vision</h2>
        <p className="text-center text-lg text-[#333333] dark:text-[#C5CFD6] md:w-3/4 mx-auto">
          Our vision is to become a leading source of natural wellness,
          empowering people to embrace a healthier lifestyle through the gentle
          power of herbs.
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 mt-6">
          <div className="vision-col-content text-center">
            <img
              className="w-full rounded-xl mb-3"
              src={OurVision1}
              alt={OurVision1}
            />
            <h3 className="text-[#203825] dark:text-[#4d805e] text-xl font-medium">Natural Ingredients</h3>
            <p className="text-base text-[#555555] dark:text-[#C5CFD6]">
              We source herbs directly from nature to ensure purity, freshness,
              and real health benefits.
            </p>
          </div>
          <div className="vision-col-content text-center">
            <img
              className="w-full rounded-xl mb-3"
              src={OurVision3}
              alt={OurVision3}
            />
            <h3 className="text-[#203825] dark:text-[#4d805e] text-xl font-medium">Eco-Friendly</h3>
            <p className="text-base text-[#555555] dark:text-[#C5CFD6]">
              Our products and packaging are designed with the planet in mind —
              sustainable and safe.
            </p>
          </div>
          <div className="vision-col-content text-center">
            <img
              className="w-full rounded-xl mb-3"
              src={OurVision2}
              alt={OurVision2}
            />
            <h3 className="text-[#203825] text-xl font-medium dark:text-[#4d805e]">Trusted Quality</h3>
            <p className="text-base text-[#555555] dark:text-[#C5CFD6]" >
              Each product is crafted with care and tested for quality to
              support your well-being.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
