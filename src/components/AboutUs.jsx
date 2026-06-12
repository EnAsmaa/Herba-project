import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiTarget } from "react-icons/fi";
import { TbPlant2 } from "react-icons/tb";

export default function AboutUs() {
  const { t } = useTranslation("home");
  return (
    <section>
      <div className="container lg:px-7 px-4 mx-auto py-12">
        <h2 className="heading-Sections text-[#446C4F] dark:text-[#94C973]">
          {t("aboutUs")}
        </h2>
        <p className="cap-sections text-[#3E4E36] dark:text-[#E2E8F0]">
          {t("aboutUsDescription")}
        </p>

        <div>
          <div className="gridtemplet mt-7 gap-6">
            <div
              data-aos="zoom-in"
              data-aos-duration="3000"
              className="backdrop-blur-xl bg-white dark:bg-[#232925] border border-[#E8F3EE] dark:border-[#2C3530] shadow-sm rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <FiTarget className="block text-3xl text-[#446C4F] dark:text-[#94C973]" />
                <h3 className="mb-0 text-2xl font-bold text-[#446C4F] dark:text-[#E2E8F0]">
                  {t("ourMission")}
                </h3>
              </div>
              <p className="text-[#3E4E36] dark:text-[#94A3B8] text-lg leading-relaxed">
                {t("ourMissionDescription")}
              </p>
            </div>

            <div
              data-aos="zoom-in"
              data-aos-duration="3000"
              className="backdrop-blur-xl bg-white dark:bg-[#232925] border border-[#E8F3EE] dark:border-[#2C3530] shadow-sm rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <TbPlant2 className="block text-3xl text-[#446C4F] dark:text-[#94C973]" />
                <h3 className="mb-0 text-2xl font-bold text-[#446C4F] dark:text-[#E2E8F0]">
                  {t("ourPhilosophy")}
                </h3>
              </div>
              <p className="text-[#3E4E36] dark:text-[#94A3B8] text-lg leading-relaxed">
                {t("ourPhilosophyDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
