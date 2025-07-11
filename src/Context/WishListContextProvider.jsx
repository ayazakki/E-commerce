import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { authContext } from './AuthContextProvider'

export let wishListContext=createContext()
export default function WishListContextProvider({children}) {
  const {token} = useContext(authContext)
  const [products, setProducts] = useState([])
  const[isLoading,setIsLoading]=useState(true)
  function addToWishList(productId){
    axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{productId},{
      headers:{
        token
      }
    })
    .then((res)=>{
      // console.log(res);
      // console.log(res.data.data);
    })
    .catch((error)=>{
      console.log(error);
      
    })
  }
  function getWishList(){
    axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
      headers:{
        token
      }
    })
    .then((res)=>{
      setIsLoading(false)
      setProducts(res.data.data)
    })
    .catch((error)=>{
      console.log(error);
      
    })
  }
  async function removeFromWishList(productId){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
      headers:{
        token
      }
    })
    .then((res)=>{
      
      return true
    })
    .catch((error)=>{
      console.log(error);
      
      return false
    })

    
    
  }
  return <wishListContext.Provider value={{addToWishList,getWishList,removeFromWishList,products,setProducts,isLoading}}>
    {children}
  </wishListContext.Provider>
}
