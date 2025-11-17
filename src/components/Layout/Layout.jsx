import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComponent from './../Navbar/NavbarComponent';
import Footer from '../Footer/Footer';

export default function Layout() {
  return <>
  <NavbarComponent/>
  <Outlet></Outlet>
  <Footer/>
  </>
}
