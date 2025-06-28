import React, { useContext, useState } from 'react'
import Style from "./Register.module.css"
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as YUP from "yup"
import { authContext } from '../../Context/AuthContextProvider'

export default function Register() {
  const {setToken} = useContext(authContext)
  let [errorMsg,setErrorMsg]=useState(null)
  let [succesMsg,setSuccessMsg]=useState(null)
  let [isLoading,setIsLoading]=useState(false)
  let navigate=useNavigate()
  function handleRegister(values){
    setIsLoading(true)
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
    .then((res)=>{
      console.log(res.data.message);
      setToken(res.data.token)
      localStorage.setItem("token",res.data.token)
      setSuccessMsg(res.data.message)
      navigate("/")
    })
    .catch((error)=>{
      console.log(error.response.data.message);
      setErrorMsg(error.response.data.message)
    })
    .finally(()=>{
      setIsLoading(false)
    })
    
  }
  let validationSchema=YUP.object().shape({
    name:YUP.string().min(3,"min 3 characters").max(20,"max 10 characters").required("name is required"),
    email:YUP.string().email("email is in-valid").required("email is required"),
    password:YUP.string().matches(/^\w{6,15}$/,"password should be created from (a-z or A-Z or _ or 0-9) with min 6 characters or numbers and max 15").required("password is required"),
    rePassword:YUP.string().oneOf([YUP.ref("password")],"you should enter the same password that you have entered before").required("rePassword is required"),
    phone:YUP.string().matches(/^01[0125][0-9]{8}$/,"phone should be an egyptian number").required("phone is required")
  })
  const registerForm=useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    validationSchema,
    onSubmit:handleRegister,
  
  })

  return <>
  <form onSubmit={registerForm.handleSubmit} className="container pt-28 ">
  {errorMsg && succesMsg!="success" ?<div className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {errorMsg}
  </div>:null}
  {succesMsg?<div className=" text-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  {succesMsg}
</div>:null}
  <h1 className="text-2xl mb-5">Register Now :</h1>
  <div className="mb-5">
    <label htmlFor="name" className="mb-2 block dark:text-white">name</label>
    <input
    name='name'
    value={registerForm.values.name}
    onChange={registerForm.handleChange}
    onBlur={registerForm.handleBlur}
    type="text" id="name" className=" outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
  </div>
  {registerForm.errors.name && registerForm.touched.name?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {registerForm.errors.name}
</div>:null}
  <div className="mb-5">
    <label htmlFor="email" className="mb-2 block dark:text-white">email</label>
    <input
    name='email'
    value={registerForm.values.email}
    onChange={registerForm.handleChange}
    onBlur={registerForm.handleBlur}
    type="email" id="email" className=" outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
  </div>
  {registerForm.errors.email && registerForm.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {registerForm.errors.email}
</div>:null}
  <div className="mb-5">
    <label htmlFor="password" className="mb-2 block dark:text-white">password</label>
    <input 
    name='password'
    value={registerForm.values.password}
    onChange={registerForm.handleChange}
    onBlur={registerForm.handleBlur}
    type="password" id="password" className=" outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
  </div>
  {registerForm.errors.password && registerForm.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {registerForm.errors.password}
</div>:null}
  <div className="mb-5">
    <label htmlFor="rePassword" className="mb-2 block dark:text-white">repassword</label>
    <input
    name='rePassword'
    value={registerForm.values.rePassword}
    onChange={registerForm.handleChange}
    onBlur={registerForm.handleBlur}
    type="password" id="rePassword" className=" outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
  </div>
  {registerForm.errors.rePassword && registerForm.touched.rePassword?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {registerForm.errors.rePassword}
</div>:null}
  <div className="mb-5">
    <label htmlFor="phone" className="mb-2 block dark:text-white">Phone :</label>
    <input
    name='phone'
    value={registerForm.values.phone}
    onChange={registerForm.handleChange}
    onBlur={registerForm.handleBlur}
    type="tel" id="phone" className=" outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
  </div>
    {registerForm.errors.phone && registerForm.touched.phone?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {registerForm.errors.phone}
  </div>:null}
  <button disabled={isLoading?true:false} type="submit" className="mt-2 ms-auto block text-white bg-emerald-500 hover:bg-emerald-600 cursor-pointer font-medium rounded-lg text-sm w-[100px] px-5 py-2 text-center dark:bg-emerald-500 dark:hover:bg-emerald-600">
    {isLoading?<i className='fas fa-spin fa-spinner'></i>:"Register"}
  </button>
</form>

  </>
  
}
