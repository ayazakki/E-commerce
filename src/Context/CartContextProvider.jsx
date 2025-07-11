import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { authContext } from './AuthContextProvider'

export let cartContext=createContext()

export default function CartContextProvider({children}) {
  const [cartId, setCartID] = useState(null)
  const [products, setProducts] = useState(null)
  const [numOfCart, setNumOfCart] = useState(null)
  const [totalPrice, setTotalPrice] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  let {token}=useContext(authContext)
  async function addToCart(productId){
    return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId},{
      headers:{
        token
      }
    })
    .then((res)=>{
      getCart()
      return true
    })
    .catch((error)=>{
      console.log(error);
      return false
    })
  }
  async function getCart(){
    axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
      headers:{
        token
      }
    })
    .then((res)=>{
      setProducts(res.data.data.products)
      setNumOfCart(res.data.numOfCartItems)
      setTotalPrice(res.data.data.totalCartPrice)
      setCartID(res.data.cartId)
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{
      setIsLoading(false)
    })
  }
  async function removeItem(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      headers:{
        token
      }
    })
    .then((res)=>{
      setProducts(res.data.data.products)
      setNumOfCart(res.data.numOfCartItems)
      setTotalPrice(res.data.data.totalCartPrice)
      return true
    })
    .catch((error)=>{
      console.log(error);
      return false
    })
  }
  async function updateQuantityProduct(id,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{
      headers:{
        token
      }
    })
    .then((res)=>{
      setProducts(res.data.data.products)
      setNumOfCart(res.data.numOfCartItems)
      setTotalPrice(res.data.data.totalCartPrice)
      return true
    })
    .catch((error)=>{
      console.log(error);
      return false
    })
  }
  function clearCart(){
    axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
      headers:{
        token
      }
    })
    .then((res)=>{
      setProducts([])
      setNumOfCart(0)
      setTotalPrice(0)
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return <cartContext.Provider value={{addToCart,getCart,removeItem,updateQuantityProduct,clearCart,setNumOfCart,cartId,products,numOfCart,totalPrice,isLoading}}>
    {children}
  </cartContext.Provider>
}
