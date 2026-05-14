import React, { useEffect, useState } from "react";
import style from "../Landing/Landing.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
  
  export default function Landing() {
    const { t } = useTranslation('home')
    const navigate=useNavigate();

  return (
    <div className={`${style.h100}`}>
      <div
        className={`${style.homeContent} text-center md:w-3/4 px-3 md:px-0 absolute z-40`}
      >
        <h1
          data-aos="fade-left"
          data-aos-duration="2000"
          className={`${style.h1s} text-[#E9EDEF]`}
        >
          {t('homeTitle')}
        </h1>
        <div data-aos="zoom-in-up" data-aos-duration="2000">
          <p className="text-center text-lg text-gray-300 dark:text-[#C5CFD6]">
            {t('homeCaption')}
          </p>

          <button className={`btn text-xl mt-3 `} onClick={()=>navigate('activity')}>{t('getStarted')}</button>
        </div>
      </div>
    </div>
  );
}
