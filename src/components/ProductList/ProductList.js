import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './ProductList.css'

import { getFirstProductList, getNextProductList } from '../../utils/getProducts';
import { getCollection, getCollectionNext } from '../../utils/getCollection';
import Card from '../Card/Card';

const ProductList = () => {
  const { id } = useParams();
  const validParams = ['women', 'men', 'shoes', 'accessories', 'new-arrivals', 'sale', 'all'];

  // load products
  const [products, setProducts] = useState([]);
  const [collectionProducts, setCollectionProducts] = useState([]);

  // check endpoints
  const [isEndpointAll, setIsEndpointAll] = useState(false);
  const [validEndpoint, setValidEndpoint] = useState(true);
  
  // check products loaded
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [collectionLoaded, setCollectionLoaded] = useState(false);

  const getAllProducts = async () => {
    let productsArray = [];
    let data = await getFirstProductList();

    if (data.length !== 0) {
      let cursor = data[data.length - 1].cursor;
      data.forEach((data) => {
        productsArray.push(data);
      })

      while (data.length !== 0) {
        data = await getNextProductList(cursor);
        if (data.length !== 0) {
          cursor = data[data.length - 1].cursor;
          data.forEach((data) => {
            productsArray.push(data);
          })
        }
      }
      setProducts(productsArray);
    } else {
      setProducts([]);
      setProductsLoaded(true);
    }
  }

  const getAllCollectionProducts = async (id) => {
    let productsArray = [];
    let data = await getCollection(id);

    if (data.length !== 0) {
      let cursor = data[data.length - 1].cursor;
      data.forEach((data) => {
        productsArray.push(data);
      })

      while (data.length !== 0) {
        data = await getCollectionNext(id, cursor);
        if (data.length !== 0) {
          cursor = data[data.length - 1].cursor;
          data.forEach((data) => {
            productsArray.push(data);
          })
        }
      }
      setCollectionProducts(productsArray);
    } else {
      setCollectionProducts([]);
      setCollectionLoaded(true);
    }
  }

  useEffect(() => {
    if (validParams.includes(id) && id === 'all') {
      getAllProducts();
      setIsEndpointAll(true);
      setValidEndpoint(true);
    } else if (validParams.includes(id)) {
      getAllCollectionProducts(id);
      setIsEndpointAll(false);
      setValidEndpoint(true);
    } else {
      setValidEndpoint(false);
    }
  }, [id]);

  // if endpoint is not valid (e.g. /products/wrong-url)
  if (!validEndpoint) {
    return <div>404</div>
  }

  // if endpoint is 'all': /products/all
  if (isEndpointAll) {
    if (products.length === 0 && !productsLoaded) {
      return <div>loading</div>
    } else if (products.length === 0 && productsLoaded) {
      return <div>No Products Found</div>
    }
  }

  // if endpoint is valid: (e.g. /products/men, /products/women, /products/shoes)
  if (!isEndpointAll) {
    if (collectionProducts.length === 0 && !collectionLoaded) {
      return <div>loading</div>
    } else if (collectionProducts.length === 0 && collectionLoaded) {
      return <div>No items matching to {id}</div>
    }
  }

  return (
    <div className="productList">
      {
        isEndpointAll ?
          <div>
            {products.map((product) => <Card product={product.node} key={product.node.id} />)}
          </div> :
          <div>
            {collectionProducts.map((product) => <Card product={product.node} key={product.node.id} />)}
          </div>
      }
    </div>
  )
}

export default ProductList