import React from 'react'
import Style from "./Layout.module.css"
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
    <Navbar/>
    <div className='flex flex-col min-h-screen pt-10'>
      <div className="container flex-1">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  </>
  
}
