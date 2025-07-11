import React, { useContext, useState } from 'react'
import Style from "./Login.module.css"
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import * as YUP from "yup"
import { authContext } from '../../Context/AuthContextProvider'
import { jwtDecode } from 'jwt-decode'

export default function Login() {
  const {setToken,setUserId} = useContext(authContext)
  let [errorMsg,setErrorMsg]=useState(null)
  let [succesMsg,setSuccessMsg]=useState(null)
  let [isLoading,setIsLoading]=useState(false)
  let navigate=useNavigate()
  function handleLogin(values){
    setIsLoading(true)
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
    .then((res)=>{
      setToken(res.data.token)
      localStorage.setItem("token",res.data.token)
      let {id}=jwtDecode(res.data.token)
      localStorage.setItem("userId",id)
      setUserId(id)
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
    email:YUP.string().email("email is in-valid").required("email is required"),
    password:YUP.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,"You should enter the same password you have registered with").required("password is required"),
  })
  const loginForm=useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema,
    onSubmit:handleLogin,
  
  })

  return <>
  <form onSubmit={loginForm.handleSubmit} className="container pt-28 mt-10 mb-20">
  {errorMsg && succesMsg!="success" ?<div className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {errorMsg}
  </div>:null}
  {succesMsg?<div className=" text-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  {succesMsg}
</div>:null}
  <h1 className="text-2xl mb-5">Login Now :</h1>
  <div className="mb-5">
    <label htmlFor="email" className="mb-2 block dark:text-white">email</label>
    <input
    name='email'
    value={loginForm.values.email}
    onChange={loginForm.handleChange}
    onBlur={loginForm.handleBlur}
    type="email" id="email" className="focus:border-gray-200 focus:ring-gray-200 outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
  </div>
  {loginForm.errors.email && loginForm.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {loginForm.errors.email}
</div>:null}
  <div className="mb-5">
    <label htmlFor="password" className="mb-2 block dark:text-white">password</label>
    <input 
    name='password'
    value={loginForm.values.password}
    onChange={loginForm.handleChange}
    onBlur={loginForm.handleBlur}
    type="password" id="password" className="focus:border-gray-200 focus:ring-gray-200 outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
  </div>
  {loginForm.errors.password && loginForm.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {loginForm.errors.password}
</div>:null}
  <button disabled={isLoading?true:false} type="submit" className="mt-2 inline-block text-white bg-emerald-500 hover:bg-emerald-600 cursor-pointer font-medium rounded-lg text-sm w-[100px] px-5 py-2 text-center dark:bg-emerald-500 dark:hover:bg-emerald-600">
    {isLoading?<i className='fas fa-spin fa-spinner'></i>:"Login"}
  </button>
  <Link to={"/ForgetPassword"}>
  <span className='cursor-pointer text-sm ms-4 text-gray-500 hover:text-emerald-700'>Forget password ?</span>
  </Link>
</form>

  </>
  
}

