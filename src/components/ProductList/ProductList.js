import React, { useEffect, useState } from 'react'

import './ProductList.css'
import Card from '../Card/Card';

import { useParams } from 'react-router-dom';
import { getAllCollectionProducts, handleFilterChange } from './functions/functions';


const ProductList = () => {
  const { id } = useParams();
  const validParams = ['women', 'men', 'shoes', 'accessories', 'new-arrivals', 'sale', 'all'];

  const [collectionProducts, setCollectionProducts] = useState([]);
  const [collectionLoaded, setCollectionLoaded] = useState(false);
  const [validEndpoint, setValidEndpoint] = useState(true);

  const loadCollection = async () => {
    const { products } = await getAllCollectionProducts(id);
    setCollectionProducts(products);
  }

  useEffect(() => {
    if (validParams.includes(id)) {
      loadCollection();
      setCollectionLoaded(true);
      setValidEndpoint(true);
    } else {
      setValidEndpoint(false);
    }
  }, [id]);

  const handleChange = (e) => {
    let newArray = handleFilterChange(e, collectionProducts);
    setCollectionProducts([...newArray]);
  }

  if (!validEndpoint) {
    return <div>404</div>
  }

  // fetching data
  if (!collectionLoaded) {
    return <div>loading</div>
    // fetched data but no products in the collection
  } else if (collectionProducts.length === 0 && collectionLoaded) {
    return (
      <div className="no-products">
        <div>No items Found in {id}</div>
      </div>
    )
  }

  return (
    <div className="productList">
      <div className="productList-title">
        <div className="collection-title">{id}</div>
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
            <span>Total - {collectionProducts.length} products</span>
          </div>
        </div>
      </div>
      <div className="productList-container">
        <div className="products-container">
          {collectionProducts.map((product) => {
            return <Card product={product.node} key={product.node.id} />
          })}
        </div>
      </div>
    </div>
  )
}

export default ProductList