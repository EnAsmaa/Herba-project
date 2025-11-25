import React from 'react'
import { FaXmark } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdContactSupport } from "react-icons/md";
import profile from '../assets/profile.jpg'
import { Link, NavLink } from 'react-router-dom';



export default function ProfileSideBar(props) {
    const {profileToggle, setProfileToggle} = props;
    return <>
        <div className={`${profileToggle ? 'right-0 pointer-events-auto' : '-right-100 pointer-events-none'} profileToggle`}>
            <div className="header flex justify-between items-center dark:text-black bg-gray-200 dark:bg-[#F7F7F7] px-2 py-3">
                <p className='font-semibold text-2xl'>Profile</p>
                <FaXmark onClick={() => { setProfileToggle(false) }} className='text-2xl cursor-pointer' />
            </div>
            <div className="content w-75 p-5 flex items-center gap-5 border-b">
                <div className='aspect-square w-20 rounded-full bg-gray-50'>
                    <img className='w-full object-cover rounded-full' src={profile} alt="" />
                </div>
                <div className='user-info space-y-2'>
                    <p className='text-center'>Lorem, ipsum dolor.</p>
                    <p className='mb-5'>test@gmail.com</p>
                    <NavLink className='bg-green-800 hover:bg-green-900 px-10 py-2 rounded-lg cursor-pointer duration-300' onClick={() => { setProfileToggle(false) }} to={'/profile'}>Update</NavLink>
                </div>
            </div>
            <ul className='p-5 space-y-8 text-xl'>
                <li><Link onClick={()=>{setProfileToggle(false)}} to={'/settings'} className='flex items-center gap-3'><IoMdSettings />Settings</Link></li>
                <li><Link onClick={()=>{setProfileToggle(false)}} className='flex items-center gap-3'><FaHeart />Favourite</Link></li>
                <li><Link onClick={()=>{setProfileToggle(false)}} className='flex items-center gap-3'><FaCrown />Premium</Link></li>
                <li><Link onClick={()=>{setProfileToggle(false)}} to={'/privacy'} className='flex items-center gap-3'><MdOutlinePrivacyTip />Privacy</Link></li>
                <li><Link onClick={()=>{setProfileToggle(false)}} to={'/helpSupport'} className='flex items-center gap-3'><MdContactSupport />Help & Support</Link></li>
            </ul>
            <div className="px-5">
                <button className='bg-red-800 hover:bg-red-900 px-6 py-1.5 rounded-lg cursor-pointer w-full duration-300'>Logout</button>
            </div>
        </div>
    </>
}
