import React, { useEffect, useState } from 'react'
import Style from "./SubCategories.module.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function SubCategories() {
  let{categoryId,categoryName}=useParams()
  const [subCategories, setSubCategories] = useState([])
    function getAllSubCategories(categoryId) {
      axios
        .get(
          `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
        )
        .then((res) =>{
          setSubCategories(res.data.data)
        })
        .catch((error) => console.log(error));
    }
    useEffect(() => {
      getAllSubCategories(categoryId)
    }, [categoryId])
    
  return <>
    <h2 className="text-center mt-9 mb-2 text-2xl font-bold tracking-tight text-emerald-800 dark:text-white">{categoryName} subcategories</h2>
    <section className='mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
    {subCategories.length>0?subCategories.map((subCategory)=><div key={subCategory._id} className="cursor-pointer text-center flex items-center justify-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-500 dark:border-gray-500 dark:hover:bg-gray-400">
      <h4 className="mb-2 font-medium tracking-tight text-gray-900 dark:text-white">{subCategory.name}</h4>
    </div>):<div className='dark:text-gray-50 p-6 col-span-full text-center bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-500 dark:border-gray-500 dark:hover:bg-gray-400'>No subCategories <i className="fa-regular fa-face-sad-tear ms-1"></i></div>}
    </section>
    

  </>
  
}
