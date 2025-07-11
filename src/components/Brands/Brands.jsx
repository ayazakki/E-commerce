import React, { useState } from 'react'
import Style from "./Brands.module.css"
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import useFetchData from '../../Hooks/useFetchData'
import axios from 'axios'

export default function Brands() {
  const {data,isLoading,isError}=useFetchData("brands","brands")
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  function getBrandById(brandId){
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
    .then((res)=>{
      setSelectedBrand(res.data.data); 
        setIsModalOpen(true);
    })
    .catch((error)=>{
      console.log(error);
      
    })
  }
    function closeModal() {
    setIsModalOpen(false);
    setSelectedBrand(null);
  }
  if(isLoading){
    return <LoadingScreen/>
  }
  if(isError){
    return <div className="h-screen flex justify-center items-center">
      <div className='mt-20 w-full p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:text-gray-50 dark:bg-gray-500 dark:border-gray-500 dark:hover:bg-gray-400'>No brands found <i className="fa-regular fa-face-sad-tear ms-1"></i></div>
    </div>
  }
  return <>
    <div className="container mt-14 pt-20">
      <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-5">
        {data?.map((brand)=><div onClick={()=>getBrandById(brand._id)} key={brand._id} className='cursor-pointer text-center  block max-w-sm p-6 hover:scale-[103%] transition-all duration-300 hover:shadow-emerald-800 bg-white border border-gray-200 rounded-lg shadow-sm transform-3d dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
          <img src={brand.image} alt={brand.name} />
          <h4 className="mb-2 font-medium tracking-tight text-gray-900 dark:text-white">{brand.name}</h4>
        </div>)}
      </div>
{/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center  justify-center bg-gray-50/10 bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[90%] max-w-md">
              <div className="flex justify-between items-center p-4 border-b border-gray-200 rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-emerald-600 dark:text-white">
                  {selectedBrand?.name}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                >
                  <span className="sr-only">Close</span>
                  ✕
                </button>
              </div>
              <div className="p-4">
                <img src={selectedBrand?.image} alt={selectedBrand?.name} className="mx-auto mb-4" />
              </div>
            </div>
          </div>
        )}

    </div>
  </>
  
}
