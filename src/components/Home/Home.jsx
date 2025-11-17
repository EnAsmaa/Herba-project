import React, { useEffect, useState } from 'react'
import Landing from './../Landing/Landing';
import AboutUs from '../AboutUs/AboutUs';
import OurVision from '../OurVision/OurVision';
import Testmonials from '../Testmonials/Testmonials';


export default function Home() {
  return (
    <div className='d-flex flex-column gap-4'>
      <Landing />
      <AboutUs />
      <OurVision />
      <Testmonials/>
    </div>
  )
}
