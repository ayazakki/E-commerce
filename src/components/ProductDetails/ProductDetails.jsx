import React, { useEffect, useState } from 'react'
import Style from "./ProductDetails.module.css"
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function ProductDetails() {
  let {id,category}=useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState(null)
  async function productDetails(id) {
      await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({data})=>{
        console.log(data.data);
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
  useEffect(() => {
    productDetails(id)
    getRelatedProducts()
  }, [id])
  
  return <>
    {product?<div className="container h-screen pt-28 grid  grid-cols-[1fr] sm:grid-cols-[1fr_2fr] gap-3.5 items-center">
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
                type="button"
                className="mt-7 text-green-700 hover:text-white border transition-all duration-300 cursor-pointer border-green-600 hover:bg-green-600 font-medium rounded-lg text-sm py-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 w-full"
              >
                Add to cart
              </button>
      </div>
    </div>:<div className="text-center h-screen flex justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>}
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
