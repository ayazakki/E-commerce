import React from "react";
import Style from "./MainSlider.module.css";
import img1 from "../../assets/slider-image-1.jpeg";
import img2 from "../../assets/slider-image-2.jpeg";
import img3 from "../../assets/slider-image-3.jpeg";
import img4 from "../../assets/grocery-banner-2.jpeg";
import img5 from "../../assets/slider-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:2300,
    cssEase: "linear",
  };
  return (
    <>
      <div className="grid md:grid-cols-[2fr_1fr] mt-28 container">
          <Slider {...settings} className='overflow-hidden'>
            <div>
              <img src={img1} className="w-full h-[400px] " alt="" />
            </div>
            <div>
              <img src={img2} className="w-full h-[400px] " alt="" />
            </div>
            <div>
              <img src={img3} className="w-full h-[400px] " alt="" />
            </div>
          </Slider>
        <div>
          <img src={img4} className="w-full h-[200px]" alt="" />
          <img src={img5} className="w-full h-[200px]" alt="" />
        </div>
      </div>
    </>
  );
}
