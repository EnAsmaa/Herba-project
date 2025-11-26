import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { IoNotifications } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { FaLeaf } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import ProfileSideBar from './ProfileSideBar';

export default function NavbarComponent(props) {
  const { toggleTheme, theme, profileToggle, setProfileToggle } = props
  const [menuToggle, setMenuToggle] = useState(false)

  return <>
    <nav className='shadow-lg bg-[#F7F7F7] text-[#1A242A] dark:bg-[#1A242A] dark:text-[#F7F7F7] relative'>
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

            {/* theme mode */}
            {theme === 'dark' ? <MdLightMode onClick={() => { toggleTheme() }} className='text-xl cursor-pointer' /> : <MdDarkMode onClick={() => { toggleTheme() }} className='text-xl cursor-pointer' />
            }
            <NavLink to='notification'><IoNotifications className='text-xl cursor-pointer' /></NavLink>
            <FaCartShopping className='text-xl cursor-pointer' />

            {/* profile */}
            <div >
              <FaUserCircle onClick={() => { setProfileToggle(!profileToggle) }} className='text-xl cursor-pointer' />
                
              {/* profile toggle */}
              <ProfileSideBar profileToggle={profileToggle} setProfileToggle={setProfileToggle} />
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
