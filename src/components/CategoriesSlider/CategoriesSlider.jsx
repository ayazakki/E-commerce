import React from 'react'
import Style from "./CategoriesSlider.module.css"
import Slider from 'react-slick';
import useFetchData from '../../Hooks/useFetchData';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function CategoriesSlider() {
  let{data:categories,isLoading,isError}=useFetchData("categories","sliderCategories")
  if(isLoading){
      return <LoadingScreen/>
    }
    if(isError){
      return <div className='mt-9 p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>No products found <i className="fa-regular fa-face-sad-tear ms-1"></i></div>
    }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll:2,
    arrows:true,
    autoplay: true,
    autoplaySpeed:2900,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };
  return <>
    <Slider {...settings} className='mt-24 cursor-grab overflow-hidden container'>
      {categories?.map((category)=><div>
        <img src={category.image} className='h-[200px] object-cover w-100' alt={category.name} />
        <h2>{category.name}</h2>
      </div>)}
    </Slider>
  </>
  
}
