import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { IoNotifications } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { FaLeaf } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import profile from '../../assets/profile.jpg'

export default function NavbarComponent(props) {
  const { toggleTheme, theme, profileToggle, setProfileToggle } = props
  const [menuToggle, setMenuToggle] = useState(false)

  return <>
    <nav className=' bg-[#F7F7F7] text-[#1A242A] dark:bg-[#1A242A] dark:text-[#F7F7F7] relative'>
      <div className="container lg:px-7 px-4 mx-auto py-5">
        <div className='flex justify-between items-center'>
          <div className='flex gap-1 items-center'>
            <FaLeaf className='text-2xl text-[#335D39] dark:text-[#6bb683]' />
            <span className='text-2xl font-medium'>HerbalCare</span>
          </div>
          <div className='navLinks order-first lg:order-0'>
            <ul className='hidden lg:flex items-center gap-6 font-medium'>
              <li><NavLink className={'link'} to={''}>Home</NavLink></li>
              <li><NavLink className={'link'} to={'herbas'}>Herbas</NavLink></li>
              <li><NavLink className={'link'} to={'activity'}>Activity</NavLink></li>
              <li><NavLink className={'link'} to={'aitools'}>AI Tools</NavLink></li>
              <li><NavLink className={'link'} to={'store'}>Store</NavLink></li>
              <li><NavLink className={'link'} to={'consultation'}>Consultation</NavLink></li>
            </ul>
            <IoMenu onClick={() => { setMenuToggle(!menuToggle) }} className='lg:hidden text-2xl cursor-pointer' />
          </div>
          <div className='flex items-center gap-5'>

            {theme === 'dark' ? <MdLightMode onClick={() => { toggleTheme() }} className='text-xl cursor-pointer' /> : <MdDarkMode onClick={() => { toggleTheme() }} className='text-xl' />
            }
            <IoNotifications className='text-xl cursor-pointer' />
            <FaCartShopping className='text-xl cursor-pointer' />
            <div >
              <FaUserCircle onClick={() => { setProfileToggle(!profileToggle) }} className='text-xl cursor-pointer' />
              <div className={`${profileToggle ? 'right-0 pointer-events-auto' : '-right-100 pointer-events-none'} profileToggle`}>
                <div className="header px-3 flex justify-between items-center dark:text-black bg-gray-200 dark:bg-[#F7F7F7] p-2">
                  <FaXmark onClick={() => { setProfileToggle(false) }} className='text-2xl cursor-pointer' />
                  <p className='font-semibold'>Profile</p>
                </div>
                <div className="content px-12 py-5">
                  <div className='aspect-square w-15 mx-auto rounded-full bg-gray-300'></div>
                  <p className='text-center'>Lorem, ipsum dolor.</p>
                  <div className='grid grid-cols-2 gap-2'>
                    <button className='btn'>Register</button>
                    <button className='btn'>Login</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {menuToggle &&
          <ul className='lg:hidden space-y-2 mt-2'>
            <li><NavLink to={''}>Home</NavLink></li>
            <li><NavLink to={'herbas'}>Herbas</NavLink></li>
            <li><NavLink to={'activity'}>Activity</NavLink></li>
            <li><NavLink to={'aitools'}>AI Tools</NavLink></li>
            <li><NavLink to={'store'}>Store</NavLink></li>
            <li><NavLink to={'consultation'}>Consultation</NavLink></li>
          </ul>
        }
      </div>
    </nav>
  </>;
}
