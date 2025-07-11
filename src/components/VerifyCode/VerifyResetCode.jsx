import React from 'react'
import Style from "./VerifyResetCode.module.css"
import axios from 'axios';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

export default function VerifyResetCode() {
  let navigate=useNavigate()
  function verifyResetCode(values){
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values)
    .then((res)=>{
      navigate("/ResetPassword")
    })
    .catch((error)=>{
      console.log(error);
      
    })
  }
  let verifyResetCodeForm=useFormik({
    initialValues:{
      resetCode:""
    },
    onSubmit:verifyResetCode
  })
  return <>
    <div className="container mt-32 pt-14 h-screen">
        <h1 className='mb-3.5'>Please enter your reset code:</h1>
      <form onSubmit={verifyResetCodeForm.handleSubmit}>
        <input
      value={verifyResetCodeForm.values.resetCode}
      onChange={verifyResetCodeForm.handleChange}
      name='resetCode'
      type="text" id="text" className="mb-3.5 outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
      
      <button type="submit" className="mt-2 inline-block text-white bg-emerald-500 hover:bg-emerald-600 cursor-pointer font-medium rounded-lg text-sm w-[100px] px-5 py-2 text-center dark:bg-emerald-500 dark:hover:bg-emerald-600">Verify</button>
      </form>
    </div>
  </>
}
