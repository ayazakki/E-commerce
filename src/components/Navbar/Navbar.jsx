import React, { useContext } from 'react'
import Style from "./Navbar.module.css"
import Logo from "../../assets/logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/AuthContextProvider'
export default function Navbar() {
  const {token,setToken} = useContext(authContext)
  let navigate=useNavigate()
  function logout() {
    setToken(null)
    localStorage.removeItem("token")
    navigate("/login")
  }
  
  return <>
<nav className="z-50 py-4 bg-gray-100 border-gray-200 dark:bg-gray-900 fixed top-0 w-full">
  <div className=" flex items-center mx-auto w-[92%] ">
    <Link to="">
    <img src={Logo}/>
    </Link>
      {token ?<ul className="flex gap-3.5 ms-7">
        <li>
          <Link to="" className=" text-gray-500 ">Home</Link>
        </li>
        <li>
          <Link to="Cart" className="text-gray-500 ">Cart</Link>
        </li>
        <li>
          <Link to="Products" className="text-gray-500 ">Products</Link>
        </li>
        <li>
          <Link to="Categories" className="text-gray-500 ">Categories</Link>
        </li>
        <li>
          <Link to="Brands" className="text-gray-500 ">Brands</Link>
        </li>
      </ul>:null}
      <ul className="flex gap-3.5 ms-auto me-4">
        <li>
          <i className='fab fa-instagram cursor-pointer'></i>
        </li>
        <li>
          <i className='fab fa-facebook cursor-pointer'></i>
        </li>
        <li>
          <i className='fab fa-tiktok cursor-pointer'></i>
        </li>
        <li>
          <i className='fab fa-twitter cursor-pointer'></i>
        </li>
        <li>
          <i className='fab fa-linkedin cursor-pointer'></i>
        </li>
        <li>
          <i className='fab fa-youtube cursor-pointer'></i>
        </li>
        {token ?<li onClick={()=>{logout()}} className='text-gray-500 cursor-pointer'>Logout</li>:<>
        <li><Link to="Login" className='text-gray-500'>Login</Link></li>
        <li><Link to="Register" className='text-gray-500'>Register</Link></li>
        </>}
      </ul>
      
      
      
  </div>
</nav>


  </>
}

