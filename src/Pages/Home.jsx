import React, { useEffect, useState } from 'react'
import Landing from '../components/Landing/Landing';
import AboutUs from '../components/AboutUs';
import OurVision from '../components/OurVision';
import Testmonials from '../components/Testmonials';


export default function Home() {
  return (
    <div className='flex flex-col gap-15'>
      <Landing />
      <AboutUs />
      <OurVision />
      <Testmonials/>
    </div>
  )
}
