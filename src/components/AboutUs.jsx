import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiTarget } from "react-icons/fi";
import { TbPlant2 } from "react-icons/tb";

export default function AboutUs() {
  const { t } = useTranslation('home')
  return (
    <section  >
      <div className="container lg:px-7 px-4 mx-auto">
        <h2 className="heading-Sections">{t('aboutUs')}</h2>
        <p className="cap-sections">
          {t('aboutUsDescription')}
        </p>
        <div>
          <div className="gridtemplet mt-7">
            <div data-aos="zoom-in" data-aos-duration="3000" className="backdrop-blur-xl bg-white/5 border border-white/20 shadow-xl rounded-3xl p-6 dark:bg-[#111B21]">
              <div className="flex items-center gap-3 mb-3 ">
                <FiTarget className="block text-2xl text-[#4d7c5c]" />
                <h3 className="mb-0 text-2xl ">{t('ourMission')}</h3>
              </div>
              <p className="text-[#4d7c5c] dark:text-[#4d805e] text-lg">
                {t('ourMissionDescription')}
              </p>
            </div>
            <div data-aos="zoom-in" data-aos-duration="3000" className="backdrop-blur-xl bg-white/5 border border-white/20 shadow-xl rounded-3xl p-6 dark:bg-[#111B21]">
              <div className="flex items-center gap-3 mb-3">
                <TbPlant2 className="block text-2xl text-[#4d7c5c]" />
                <h3 className="mb-0 text-2xl">{t('ourPhilosophy')}</h3>
              </div>
              <p className="text-[#4d7c5c] dark:text-[#4d805e] text-lg">
                {t('ourPhilosophyDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
