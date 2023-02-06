import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './BannerOne.css'

import image1 from '../../../../assets/image1.jpg'
import image2 from '../../../../assets/image2.jpg'
import image3 from '../../../../assets/image4.jpg'

const BannerOne = () => {
  const [year, setYear] = useState('');
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="banner-one">
      <div className="left">
        <img src={image1} alt="" className="img-background"/>
        <div className="text-wrap">
          <div>Trending Products in {year}</div>
          <h1>Make Your Style More Unique and Express Your Individuality.</h1>
          <p>
            Make your style more unique with our wide selection of fashion items! 
            Shop now to find the perfect pieces that will help you stand out.
          </p>
          <Link to="/products/all"><button>Shop Now</button></Link>
        </div>
      </div>
      <div className="right">
        <div className="first-item"><img src={image1} alt=""/></div>
        <div className="second-item"><img src={image2} alt=""/></div>
        <div className="third-item"><img src={image3} alt=""/></div>
      </div>
    </div>
  )
}

export default BannerOne