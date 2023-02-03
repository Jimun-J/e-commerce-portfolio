import React from 'react'
import './BannerTwo.css'

import { Link } from 'react-router-dom'

import image1 from '../../../../assets/image5.jpg'
import image2 from '../../../../assets/image6.jpg'
import image3 from '../../../../assets/image7.png'

const BannerTwo = () => {
    return (
        <div className="banner-two">
            <div className="left">
                <div className="text-wrap">
                    <h2>New Arrivals.</h2>
                    <p>
                        Shop now to find the perfect pieces that will help you stand out.
                    </p>
                    <Link to="/products/new-arrivals"><button>Shop Now</button></Link>
                </div>
            </div>
            <div className="right">
                <div className="first-item"><img src={image1} alt="" /></div>
                <div className="second-item"><img src={image2} alt="" /></div>
                <div className="third-item"><img src={image3} alt="" /></div>
            </div>
        </div>
    )
}

export default BannerTwo