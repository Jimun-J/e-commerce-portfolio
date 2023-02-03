import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './FeaturedProducts.css'
import EastIcon from '@mui/icons-material/East';
import Card from '../../Card/Card';
import { getFeaturedProducts } from '../../../utils/getCollection';

const Categories = () => {
  const [products, setProducts] = useState([]);

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
      <div className="categories-grid">
        {products.map((item) => {
          return (
            <Card product={item.node} key={item.node.id} />
          )
        })}
      </div>
    </div>
  )
}

export default Categories