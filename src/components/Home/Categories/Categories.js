import React from 'react'
import './Categories.css'
import Slider from "react-slick";
import { Link } from 'react-router-dom'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Categories = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  }

  return (
    <div className="categories">
      <div className="category-title">Categories</div>
      <p className="category-subtitle">Shop by Category for All Your Needs</p>
      <Slider {...settings}>
        <div>
          <Link to="/products/collection/women" className="categories-item women">Women</Link>
        </div>
        <div>
          <Link to="/products/collection/men" className="categories-item men">Men</Link>
        </div>
        <div>
          <Link to="/products/collection/shoes" className="categories-item shoes">Shoes</Link>
        </div>
        <div>
          <Link to="/products/collection/accessories" className="categories-item accessories">Accessories</Link>
        </div>
        <div>
          <Link to="/products/collection/new-arrivals" className="categories-item new-arrivals">New Arrivals</Link>
        </div>
        <div>
          <Link to="/products/collection/sale" className="categories-item sale">Sale</Link>
        </div>
      </Slider>
    </div>
  )
}

export default Categories