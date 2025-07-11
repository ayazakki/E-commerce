import React, { useContext, useEffect, useState } from 'react'
import Style from "./ProductDetails.module.css"
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContextProvider'
import toast from 'react-hot-toast'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

export default function ProductDetails() {
  let {addToCart}=useContext(cartContext)
  let {id,category}=useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState(null)
  async function productDetails(id) {
      await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({data})=>{
        setProduct(data.data)
      })
      .catch((error)=>{
        console.log(error);
        
      })
  }
  async function getRelatedProducts() {
    let {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    console.log(data.data);
    let newRelatedProducts=data.data.filter((product)=>{
      return product.category.name==category
    })
    console.log(newRelatedProducts);
    setRelatedProducts(newRelatedProducts)
  }
  async function addProductToCart(id){
    let flag=await addToCart(id)
    if(flag){
      toast.success("Item is added successfully")
    }else{
      toast.error("Something is wrong!")
    }
  }
  useEffect(() => {
    productDetails(id)
    getRelatedProducts()
  }, [id])
  
  return <>
    {product?<div className="container pt-28 grid  grid-cols-[1fr] sm:grid-cols-[1fr_2fr] gap-3.5 items-center">
      <div>
        <img src={product.imageCover} alt={product.title} className='w-96' />
      </div>
      <div>
        <h2 className='mb-3 font-medium'>{product.title}</h2>
        <p className='text-gray-500'>{product.description}</p>
        <h3 className='mt-6 text-gray-700'>{product.category.name}</h3>
        <div className="flex justify-between pt-2 ">
                  {product.priceAfterDiscount ? (
                    <>
                      <div className='flex'>
                        <h3 className="me-3 text-red-400 line-through">
                        {product.price} EGP
                      </h3>
                      <h3>
                        {product.priceAfterDiscount} EGP
                      </h3>
                      </div>
                    </>
                  ) : (
                    <h3>{product.price} EGP</h3>
                  )}
                  <span className="text-gray-400">
                    <i className="fa-solid fa-star text-amber-300 me-0.5"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
                <button
                onClick={()=>addProductToCart(product._id)}
                type="button"
                className="mt-7 text-green-700 hover:text-white border transition-all duration-300 cursor-pointer border-green-600 hover:bg-green-600 font-medium rounded-lg text-sm py-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 w-full"
              >
                Add to cart
              </button>
      </div>
    </div>:<LoadingScreen/>}
    <div className="container pt-14 mt-14 grid gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {relatedProducts?.map((product) => (
            <div
              key={product._id}
              className="group overflow-hidden shadow-sm relative cursor-pointer"
            >
              <Link to={`/ProductDetails/${product._id}/${product.category.name}`}>
              <img src={product.imageCover} alt={product.title} />
              <div className="card-body p-3">
                <h3 className="text-green-600">{product.category.name}</h3>
                <h2>{product.title.split(" ", 2).join(" ")}</h2>
                <div className="flex justify-between pt-3.5">
                  {product.priceAfterDiscount ? (
                    <>
                      <h3 className="text-red-400 line-through text-sm font-medium">
                        {product.price} EGP
                      </h3>
                      <h3 className="text-sm">
                        {product.priceAfterDiscount} EGP
                      </h3>
                    </>
                  ) : (
                    <h3 className="text-md">{product.price} EGP</h3>
                  )}
                  <span className="text-gray-400">
                    <i className="fa-solid fa-star text-amber-300 me-0.5"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </div>
              {product.priceAfterDiscount ? (
                <span className="bg-red-100 absolute top-1 left-1 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">
                  sale
                </span>
              ) : null}
              </Link>
              <button
                type="button"
                className="text-green-700 hover:text-white border transition-all duration-300 group-hover:translate-y-0 cursor-pointer translate-y-[200%] border-green-600 hover:bg-green-600 font-medium rounded-lg text-sm py-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 w-full"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
  </>
  
}
