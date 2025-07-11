import React, { useContext } from 'react'
import Style from "./ResetPassword.module.css"
import axios from 'axios';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authContext } from '../../Context/AuthContextProvider';
import { jwtDecode } from 'jwt-decode';
import * as YUP from "yup"

export default function ResetPassword() {
  const {setToken,setUserId} = useContext(authContext)
  let navigate =useNavigate()
  function resetPassword(values){
    axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",values)
    .then((res)=>{
      setToken(res.data.token)
      localStorage.setItem("token",res.data.token)
      let {id}=jwtDecode(res.data.token)
      localStorage.setItem("userId",id)
      setUserId(id)
      toast.success("Password reset successful!");
      navigate("/");
    })
    .catch((error)=>{
      console.log(error);
      
    })
  }
  let validationSchema=YUP.object().shape({
      email:YUP.string().email("email is in-valid").required("email is required"),
      newPassword:YUP.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,"invalid").required("password is required"),
    })
  let resetPasswordForm=useFormik({
    initialValues:{
      email:"",
      newPassword:""
    },
    validationSchema,
    onSubmit:resetPassword
  })
  return <>
    <div className="container mt-32 pt-14 h-screen">
      <h1 className='mb-3.5 dark:text-gray-50'>Please reset your account password:</h1>
      <form onSubmit={resetPasswordForm.handleSubmit}>
        <label className='dark:text-gray-50'>Email:</label>
        <input
      value={resetPasswordForm.values.email}
      onChange={resetPasswordForm.handleChange}
      name='email'
      type="email" id="email" className="mb-3.5 outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-50 dark:text-white" />
      <label className='dark:text-gray-50'>New Password:</label>
      <input
      value={resetPasswordForm.values.newPassword}
      onChange={resetPasswordForm.handleChange}
      name='newPassword'
      type="password" id="newPassword" className="mb-3.5 outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-50 dark:text-white" />
      {resetPasswordForm.errors.newPassword && resetPasswordForm.touched.newPassword && (
  resetPasswordForm.errors.newPassword === "invalid" ? (
    <div
      className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50
            dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <svg
        className="shrink-0 inline w-4 h-4 me-3 mt-[2px]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div>
        <span className="font-medium">Ensure that these requirements are met:</span>
        <ul className="mt-1.5 list-disc list-inside">
          <li>At least 8 characters</li>
          <li>At least one uppercase and one lowercase letter</li>
          <li>At least one number</li>
          <li>At least one special character (!@#$%^&*)</li>
        </ul>
      </div>
    </div>

  ) : (
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50
                    dark:bg-gray-800 dark:text-red-400"
        role="alert">
      {resetPasswordForm.errors.newPassword}
    </div>

  )
)}
      <button type="submit" className="mt-2 inline-block text-white bg-emerald-500 hover:bg-emerald-600 cursor-pointer font-medium rounded-lg text-sm w-[100px] px-5 py-2 text-center dark:bg-emerald-500 dark:hover:bg-emerald-600">Reset Password</button>
  
      </form>
    </div>
  </>
  
}
