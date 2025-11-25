import React, { useEffect, useState } from "react";
import style from "../Landing/Landing.module.css";
import vidbg from "../../assets/lavid.mp4"

export default function Landing() {
  return (
    <div className={`${style.h100}`}>
      {/* <div className="fixed inset-0 bg-black/50"></div> */}
      <div className={`${style.homeContent} text-center md:w-3/4 px-3 md:px-0 absolute z-40`}>
        <h1 className={`${style.h1s} text-[#E9EDEF] `}>
          Rediscover Your <br /> Balance, Naturally.
        </h1>
        <p className="text-center text-lg text-gray-300 dark:text-[#C5CFD6]">
          Learn about the healing power of herbs, their benefits, and how to use
          them safely for a better lifestyle. At HerbaCare, we bring you closer
          to nature with trusted remedies that support your body, calm your
          mind, and inspire everyday wellness.
        </p>
        <button className={`btn text-xl mt-3 `}>Get Started</button>
      </div>
    </div>
  );
}
