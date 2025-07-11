import React, { useContext, useEffect, useState } from 'react'
import Style from "./AllOrders.module.css"
import { authContext } from '../../Context/AuthContextProvider'
import axios from 'axios'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

export default function AllOrders() {
  let{userId}=useContext(authContext)
  const [orderItems, setOrderItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  async function getUserOrders(userId){
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    const allItemsWithOrderDetails = data.flatMap(order =>
        order.cartItems.map(item => ({
          ...item,
          orderDetails: {
            phone: order.shippingAddress?.phone,
            city: order.shippingAddress?.city,
            addressDetails: order.shippingAddress?.details,
            paymentMethod: order.paymentMethodType,
            isDelivered: order.isDelivered,
            total: order.totalOrderPrice,
            createdAt: order.createdAt,
            orderId: order._id
          },
        }))
      );
    setOrderItems(allItemsWithOrderDetails);
    setIsLoading(false)
  }
  useEffect(() => {
    getUserOrders(userId)
  }, [])
  if(isLoading){
    return <LoadingScreen/>
  }
  
  return <>
  
  <div className="container mt-14 pt-14">
  <h2 className="text-3xl mb-6 mt-7">All Ordered Items</h2>

  <div className="grid gap-6">
  {orderItems.map((item) => (
    <div
      key={item._id}
      className="flex flex-col  bg-white border border-gray-200 rounded-lg shadow md:flex-row  dark:border-gray-700 dark:bg-gray-800"
    >
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={item.product.imageCover}
        alt={item.product.title}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h4 className="mb-2 text-lg font-bold tracking-tight text-gray-800 dark:text-white">
          {item.product.title.split(" ",2).join(" ")}
        </h4>
        <div className="font-medium text-gray-700 dark:text-gray-400">
          <h6 className='mb-2'>Quantity: {item.count}</h6>
          <h6 >Price: <span className='text-emerald-700'>{item.price} EGP</span> </h6> 
        </div>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">
          <h6 className='mb-2.5'>City: {item.orderDetails.city}</h6>  
          <h6 className='mb-2.5'>Phone: {item.orderDetails.phone}</h6>  
          <h6 className='mb-2.5'>Details: {item.orderDetails.addressDetails}</h6>  
          <h6 className='mb-2.5'>Payment: {item.orderDetails.paymentMethod}</h6>  
          <h6 className='mb-2.5'>Order Date: {new Date(item.orderDetails.createdAt).toLocaleDateString()}</h6> 
        </div>
      </div>
    </div>
  ))}
</div>

</div>

  </>
  
}
