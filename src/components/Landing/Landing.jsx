import React, { useEffect, useState } from "react";
import style from "../Landing/Landing.module.css";
import videoBg from '../../assets/lavid.mp4'

export default function Landing() {
  return (
    <div className={`${style.h100}`}>
        <video
        className={style.videoBg}
        src={videoBg}
        autoPlay
        loop
        muted
        playsInline
      ></video>
      <div className={`${style.homeContent} text-center`}>
        <h1 className={`text-white ${style.h1s}`}>
          Rediscover Your <br /> Balance, Naturally.
        </h1>
        <p className="text-light text-center ">
          Learn about the healing power of herbs, their benefits, and how to use
          them safely for a better lifestyle. At HerbaCare, we bring you closer
          to nature with trusted remedies that support your body, calm your
          mind, and inspire everyday wellness.
        </p>
        <button className={`btn mt-3 py-2 px-3 ${style.homeBtn}`}>Get Started</button>
      </div>
    </div>
  );
}
