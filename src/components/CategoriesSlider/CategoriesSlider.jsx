import React, { useEffect, useState } from 'react'
import Style from "./CategoriesSlider.module.css"
import Slider from 'react-slick';
import axios from 'axios';

export default function CategoriesSlider() {
  const [categories, setCategories] = useState(null)
  async function getCategories() {
    let {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    console.log(data.data);
    setCategories(data.data)
  }
  useEffect(() => {
    getCategories()
  }, [])
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
    <Slider {...settings} className='mt-24 container cursor-grab overflow-hidden'>
      {categories?.map((category)=><div>
        <img src={category.image} className='h-[200px] object-cover w-100' alt={category.name} />
        <h2>{category.name}</h2>
      </div>)}
    </Slider>
  </>
  
}
