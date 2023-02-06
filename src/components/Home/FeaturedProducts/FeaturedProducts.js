import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './FeaturedProducts.css'
import EastIcon from '@mui/icons-material/East';
import Card from '../../Card/Card';
import { getFeaturedProducts } from '../../../utils/getCollection';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Categories = () => {
  const [products, setProducts] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 746,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 512,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  }

  useEffect(() => {
    let data;
    const getData = async () => {
      data = await getFeaturedProducts();
      setProducts(data);
    }
    getData();
  }, []);

  if (products.length === 0) {
    return <div>loading...</div>
  }

  return (
    <div className="categories">
      <div className="categories-title">
        <div className="categories-text-wrap">
          Discover our styles.
          <p>Featured Products</p>
        </div>
        <Link to="/products/all">View More<span className="categories-arrow"><EastIcon /></span></Link>
      </div>

      <Slider {...settings}>
        {products.map((item) => {
          return (
            <div>
              <div className="products-item">
                <Card product={item.node} key={item.node.id} />
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default Categories