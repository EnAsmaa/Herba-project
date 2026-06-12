import React, { useEffect, useState } from "react";
import OurVision1 from "../assets/OurVision.jpg";
import OurVision2 from "../assets/OurVision2.jpg";
import OurVision3 from "../assets/pexels-mareefe-672046.jpg";
import { useTranslation } from "react-i18next";

export default function OurVision() {
  const { t } = useTranslation("home");
  return (
    <section className="bg-[#E8F3EE] dark:bg-[#1A1F1C] py-16">
      <div className="container lg:px-7 px-4 mx-auto">
        <h2 className="heading-Sections text-[#446C4F] dark:text-[#94C973]">
          {t("ourVision")}
        </h2>
        <p className="cap-sections text-[#3E4E36] dark:text-[#94A3B8]">
          {t("ourVisionDescription")}
        </p>

        <div className="gridtemplet mt-10 gap-8">
          {[
            {
              img: OurVision1,
              title: t("naturalIngredients"),
              desc: t("naturalIngredientsDescription"),
            },
            {
              img: OurVision3,
              title: t("ecoFriendly"),
              desc: t("ecoFriendlyDescription"),
            },
            {
              img: OurVision2,
              title: t("trustedQuality"),
              desc: t("trustedQualityDescription"),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="vision-col-content text-center group"
              data-aos="zoom-in"
              data-aos-duration="3000"
            >
              <div className="overflow-hidden rounded-xl mb-4 shadow-sm">
                <img
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                  src={item.img}
                  alt={item.title}
                />
              </div>
              <h3 className="h3-vision text-[#446C4F] dark:text-[#E2E8F0] font-bold mb-2">
                {item.title}
              </h3>
              <p className="text-base text-[#3E4E36] dark:text-[#94A3B8] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
