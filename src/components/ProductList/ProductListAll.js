import React, { useEffect, useState } from 'react'

import './ProductList.css'
import Card from '../Card/Card';

import { getAllProducts, handleFilterChange } from './functions/functions';

const ProductListAll = () => {
  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);


  useEffect(() => {
    const loadProducts = async () => {
      const { products } = await getAllProducts();
      setProducts(products);
      setProductsLoaded(true);
    }
    loadProducts();
  }, []);

  // fetching data
  if (!productsLoaded) {
    return <div>loading</div>
    // fetched data but no products in the collection
  } else if (products.length === 0 && productsLoaded) {
    return (
      <div className="no-products">
        <div>No items Available</div>
      </div>
    )
  }

  const handleChange = (e) => {
    let newArray = handleFilterChange(e, products);
    setProducts([...newArray]);
  }

  return (
    <div className="productList">
      <div className="productList-title">
        <div className="collection-title">All</div>
        <div className="sorted-by">
          <div className="array-filter">
            <div>Sort by:</div>
            <select onChange={handleChange}>
              <option value={0}>Featured</option>
              <option value={1}>Alphabetically, A-Z</option>
              <option value={2}>Alphabetically, Z-A</option>
              <option value={3}>Price, low to high</option>
              <option value={4}>Price, high to low</option>
            </select>
          </div>
          <div className="products-count">
            <span>Total - {products.length} products</span>
          </div>
        </div>
      </div>
      <div className="productList-container">
        <div className="products-container">
          {products.map((product) => {
            return <Card product={product.node} key={product.node.id} />
          })}
        </div>
      </div>
    </div>
  )
}

export default ProductListAll