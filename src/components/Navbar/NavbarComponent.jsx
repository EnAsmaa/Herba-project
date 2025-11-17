import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { IoNotifications } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import { MdDarkMode } from "react-icons/md";
import profile from '../../assets/profile.jpg'
import { FaLeaf } from "react-icons/fa6";

export default function NavbarComponent() {
  const [profileAppear, setProfileAppear] = useState(false);
  useEffect(() => {
  const handleClickOutside = (event) => {
    const dropdown = document.querySelector('.profile-dropdown');
    const icon = document.querySelector('.fa-user-circle'); 

    if (dropdown && !dropdown.contains(event.target) && !icon.contains(event.target)) {
      setProfileAppear(false);
    }
  };

  document.addEventListener('click', handleClickOutside);
  return () => document.removeEventListener('click', handleClickOutside);
}, []);

  return (
    <>
      <div className='container-fluid px-md-5 px-3 position-sticky nav-parent shadow-sm top-0  py-1 z-1'>
        <Navbar collapseOnSelect expand="lg">
          <NavLink to={'/'} className='fw-bold fs-3 logo'><FaLeaf className='active fs-2'/> HerbalCare</NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto mt-1 d-flex gap-4 fw-medium">
              <NavLink className={'navLink'} to={'/'}>Home</NavLink>
              <NavLink className={'navLink'} to={'herbas'}>Herbas</NavLink>
              <NavLink className={'navLink'} to={'activity'}>Activity</NavLink>
              <NavLink className={'navLink'} to={'features'}>AI Tool</NavLink>
              <NavLink className={'navLink'} to={'store'}>Store</NavLink>
              <NavLink className={'navLink'} to={'consultation'}>Consultation</NavLink>
            </Nav>
            <Nav className='d-flex gap-4 flex-row align-items-center position-relative z-0 mb-0 mt-md-0 mt-3'>
              <MdDarkMode className='nav-icon pointer' />
              <IoNotifications className='nav-icon pointer' />
              <FaCartShopping className='nav-icon pointer' />
              <FaUserCircle onClick={() => setProfileAppear(prev => !prev)}  className='nav-icon pointer' />
            </Nav>
          </Navbar.Collapse>
        </Navbar >
        <div className={`p-5 profile-dropdown ${profileAppear?'profile-dropdown-appear':'profile-dropdown-disappear'}`}>
          <img className='profile-image' src={profile} alt="" />
            <p className='fw-medium'>welcome back!</p>
          <div className='d-flex gap-2'>
            <button className='btn profile-btn'><Link className='text-white' to={'/register'} onClick={()=>{setProfileAppear(false)}}>Register</Link></button>
            <button className='btn profile-btn'><Link className='text-white' to={'/login'} onClick={()=>{setProfileAppear(false)}}>Login</Link></button>
          </div>
        </div>
      </div>

    </>

  );
}
