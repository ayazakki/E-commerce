import React from 'react'
import Style from "./ForgetPassword.module.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'

export default function ForgetPassword() {
  let navigate=useNavigate()
  function forgetPassword(values){
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values)
    .then((res)=>{
      navigate("/VerifyResetCode")
    })
    .catch((error)=>{
      console.log(error);
      
    })
  }
  let forgetPasswordForm=useFormik({
    initialValues:{
      email:""
    },
    onSubmit:forgetPassword
  })
  return <>
    <div className="container mt-32 pt-14 h-screen">
      <h1 className='mb-3.5 dark:text-gray-50'>Please enter your email:</h1>
      <form onSubmit={forgetPasswordForm.handleSubmit}>
        <input
      value={forgetPasswordForm.values.email}
      onChange={forgetPasswordForm.handleChange}
      name='email'
      type="email" id="email" className="mb-3.5 outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-50 dark:text-white" />
      <button type="submit" className="mt-2 inline-block text-white bg-emerald-500 hover:bg-emerald-600 cursor-pointer font-medium rounded-lg text-sm w-[100px] px-5 py-2 text-center dark:bg-emerald-500 dark:hover:bg-emerald-600">Send</button>
      </form>
    </div>
  </>
  
}
