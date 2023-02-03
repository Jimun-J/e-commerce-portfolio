import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../../utils/getProduct';
import Description from './Description/Description';
import Gallery from './Gallery/Gallery';
import './Product.css'

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const getData = async () => {
      const data = await getProduct(id);
      setProduct(data);
    }
    getData();
  }, [id]);

  if (!product) {
    return <div>loading...</div>
  }

  return (
    <div className="product">
      <Gallery product={product} />
      <Description product={product} />
    </div>
  )
}

export default Product