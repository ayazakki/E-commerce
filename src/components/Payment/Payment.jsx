import React, { useContext, useState } from "react";
import Style from "./Payment.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { authContext } from "../../Context/AuthContextProvider";
import { cartContext } from "../../Context/CartContextProvider";
import toast from "react-hot-toast";
import {Link, useNavigate } from "react-router-dom";
import * as YUP from "yup"

export default function Payment() {
  let navigate=useNavigate()
  let {token}=useContext(authContext)
  let {cartId,setNumOfCart}=useContext(cartContext)
  const [cashFlag, setCashFlag] = useState(false)
  console.log(cartId);
  function cashOrder(values){
    console.log(values);
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,values,{
      headers:{
        token
      }
    })
    .then((res)=>{
      toast.success("Successfull Process")
      navigate("/AllOrders")
      setNumOfCart(0)
    })
    .catch((error)=>{
      console.log(error);
      toast.error("failed Process")
    })
  }
  function onlineOrder(values){
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,values,{
      headers:{
        token
      }
    })
    .then((res)=>{
      window.open(res.data.session.url,"_self")
      setNumOfCart(0)
    })
    .catch((error)=>{
      console.log(error);
      
    })
  }
  function paymentOrder(values){
    let shippingAddress={
      shippingAddress:values
    }
    console.log(shippingAddress);
    if(cashFlag){
      cashOrder(shippingAddress)
    }else{
      onlineOrder(shippingAddress)
    }
  }
  let validationSchema=YUP.object().shape({
      details:YUP.string().min(10,"min 10 characters").max(50,"max 50 characters").required("Details is required"),
      city:YUP.string().min(3,"min 3 characters").required("City is required"),
      phone:YUP.string().matches(/^01[0125][0-9]{8}$/,"phone should be an egyptian number").required("phone is required")
    })
  let paymentForm=useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit:paymentOrder,
  });
  return (
    <>
      <div className="container mt-30">
        <form onSubmit={paymentForm.handleSubmit} className="mb-30 w-10/12 mx-auto mt-20 pt-14">
        <div>
          <div className="relative z-0 w-full mb-10 group">
            <input
              name="details"
              value={paymentForm.values.details}
              onChange={paymentForm.handleChange}
              onBlur={paymentForm.handleBlur}
              type="text"
              id="floating_details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Details
            </label>
          </div>
          {paymentForm.errors.details && paymentForm.touched.details?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {paymentForm.errors.details}
          </div>:null}
          <div className="relative z-0 w-full mb-10 group">
            <input
              name="phone"
              value={paymentForm.values.phone}
              onChange={paymentForm.handleChange}
              onBlur={paymentForm.handleBlur}
              type="tel"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
          </div>
          {paymentForm.errors.phone && paymentForm.touched.phone?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {paymentForm.errors.phone}
          </div>:null}
          <div className="relative z-0 w-full mb-10 group">
            <input
              name="city"
              value={paymentForm.values.city}
              onChange={paymentForm.handleChange}
              onBlur={paymentForm.handleBlur}
              type="text"
              id="floating_city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              City
            </label>
          </div>
          {paymentForm.errors.city && paymentForm.touched.city?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {paymentForm.errors.city}
          </div>:null}
          <div className="flex flex-wrap justify-between">
            <div className="div">
            <button
          onClick={()=>setCashFlag(true)}
            type="submit"
            className="cursor-pointer me-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm w-[100px]  px-5 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Cash
          </button>
          <button onClick={()=>setCashFlag(false)} type="submit" className="cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm w-[100px] px-5 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Online</button>
          </div>
          <Link to={"/AllOrders"} className="pt-5 lg:pt-0">
          <span className=" cursor-pointer hover:underline text-emerald-800 dark:text-emerald-500">Do you want to take a look about your previous orders?</span>
          </Link>
          </div>
        </div>
      </form>
      </div>
    </>
  );
}
