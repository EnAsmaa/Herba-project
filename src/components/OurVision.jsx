import React, { useEffect, useState } from "react";
import OurVision1 from "../assets/OurVision.jpg";
import OurVision2 from "../assets/OurVision2.jpg";
import OurVision3 from "../assets/pexels-mareefe-672046.jpg";
import { useTranslation } from "react-i18next";

export default function OurVision() {
  const { t } = useTranslation('home')
  return (
    <section className="bg-[#e6f0ea] dark:bg-green-950/20 py-10 ">
      <div className="container lg:px-7 px-4 mx-auto"  >
        <h2 className="heading-Sections">{t('ourVision')}</h2>
        <p className="cap-sections">
          {t('ourVisionDescription')}
        </p>
        <div className="gridtemplet mt-6 ">
          <div className="vision-col-content text-center" data-aos="zoom-in" data-aos-duration="3000">
            <img
              className="w-full rounded-xl mb-3"
              src={OurVision1}
              alt={OurVision1}
            />
            <h3 className="h3-vision">{t('naturalIngredients')}</h3>
            <p className="text-base text-[#555555] dark:text-[#C5CFD6]">
              {t('naturalIngredientsDescription')}
            </p>
          </div>
          <div className="vision-col-content text-center" data-aos="zoom-in" data-aos-duration="3000">
            <img
              className="w-full rounded-xl mb-3"
              src={OurVision3}
              alt={OurVision3}
            />
            <h3 className="h3-vision">{t('ecoFriendly')}</h3>
            <p className="text-base text-[#555555] dark:text-[#C5CFD6]">
              {t('ecoFriendlyDescription')}
            </p>
          </div>
          <div className="vision-col-content text-center" data-aos="zoom-in" data-aos-duration="3000">
            <img
              className="w-full rounded-xl mb-3"
              src={OurVision2}
              alt={OurVision2}
            />
            <h3 className="h3-vision">{t('trustedQuality')}</h3>
            <p className="text-base text-[#555555] dark:text-[#C5CFD6]" >
              {t('trustedQualityDescription')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
