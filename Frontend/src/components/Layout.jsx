import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import HomeMain from './HomeMain.jsx'

function Layout() {
  return (
    <>
         <Navbar/>
         <Outlet/>        
         <Footer/>
    </>
  )
}

export default Layout;
