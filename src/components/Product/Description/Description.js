import React, { useState, useEffect, useContext } from 'react'
import './Description.css'
import { Link } from 'react-router-dom'

import { ShopContext } from '../../../client/Client';
import minus from '../../../assets/icon-minus.svg'
import plus from '../../../assets/icon-plus.svg'

const Description = ({ product }) => {
  const [count, setCount] = useState(0);
  const [colorArray, setColorArray] = useState([]);
  const [sizeArray, setSizeArray] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const [{}, addItemToCheckout] = useContext(ShopContext);

  const clickMinus = () => {
    if (count !== 0) {
      setCount(count - 1);
    }
  }

  const clickPlus = () => {
    setCount(count + 1);
  }

  const addItem = () => {
    let variantId = findVariantId();
    console.log(variantId);
    addItemToCheckout(variantId, count);
  }

  const findVariantId = () => {
    let variantId, variant;
    if (sizeArray.length === 0 && colorArray.length === 0) {
      variantId = product.variants.edges[0].node.id;
    } else if (sizeArray.length > 0 && colorArray.length > 0) {
      variant = product.variants.edges.filter((item) => item.node.title.includes(selectedColor) && item.node.title.includes(selectedSize));
      console.log(variant);
      variantId = variant[0].node.id;
    } else if (sizeArray.length > 0 || colorArray.length > 0) {
      variant = product.variants.edges.filter((item) => item.node.title.includes(selectedColor) || item.node.title.includes(selectedSize));
      console.log(variant);
      variantId = variant[0].node.id;
    }
    return variantId;
  }

  useEffect(() => {
    if (Object.keys(product).length !== 0) {
      let arr1 = product.options.filter((option) => option.name === 'Color');
      let arr2 = product.options.filter((option) => option.name === 'Size');
      if (arr1.length > 0) {
        setColorArray(arr1[0].values);
        setSelectedColor(arr1[0].values[0]);
      }
      if (arr2.length > 0) {
        setSizeArray(arr2[0].values);
        setSelectedSize(arr2[0].values[0]);
      }
    }
  }, [product]);

  const handleColorClick = (e) => {
    Array.from(e.target.parentElement.children).forEach((node) => {
      node.classList.remove('active');
    })
    e.target.classList.add('active');
    setSelectedColor(e.target.innerText);
  }

  const handleSizeClick = (e) => {
    Array.from(e.target.parentElement.children).forEach((node) => {
      node.classList.remove('active');
    })
    e.target.classList.add('active');
    setSelectedSize(e.target.innerText);
  }

  if (product && Object.keys(product).length === 0) {
    return <div>loading...</div>
  }

  return (
    <div className="description-container">
      <div className="description-wrapper">
        <div className="description">
          <h3 className="vendor-name">JJ-Shop</h3>
          <div className="product-name">{product.title}</div>
          <div className="price">
            {
              product.compareAtPriceRange.maxVariantPrice.amount !== "0.0" ?
                <div className="sale">
                  <div className="original-price">${Number(product.compareAtPriceRange.maxVariantPrice.amount).toFixed(2)}</div>
                  <div className="discounted-price">${Number(product.priceRange.minVariantPrice.amount).toFixed(2)}</div>
                </div>
                : <div className="sale">
                  <div className="discounted-price">${Number(product.priceRange.minVariantPrice.amount).toFixed(2)}</div>
                </div>
            }
          </div>
          <div className="options">
            {
              sizeArray.length === 0 ? 
              <div className="size">
                <div>Size</div>
                <div className="size-container">
                  <div className="size-tag">One Size</div>
                </div>
              </div> : 
              <div className="size">
                <div>Size</div>
                <div className="size-container">
                  {sizeArray.map((size, index) => {
                    if (index === 0) {
                      return <div className={"size-tag active"} key={index} onClick={handleSizeClick}>{size}</div>
                    } else {
                      return <div className={"size-tag"} key={index} onClick={handleSizeClick}>{size}</div>
                    }
                  })}
                </div>
              </div>
            }
            {
              colorArray.length === 0 ? 
              <div className="size">
                <div>Color</div>
                <div className="size-container">
                  <div className="size-tag">One Color</div>
                </div>
              </div> : 
              <div className="size">
                <div>Color</div>
                <div className="size-container">
                  {colorArray.map((color, index) => {
                    if (index === 0) {
                      return <div className={"size-tag active"} key={index} onClick={handleColorClick}>{color}</div>
                    } else {
                      return <div className={"size-tag"} key={index} onClick={handleColorClick}>{color}</div>
                    }
                  })}
                </div>
              </div>
            }
          </div>
          <div className="counter">
            <div className="minus-container" onClick={clickMinus}>
              <img src={minus} alt="minus" className="minus" />
            </div>
            <div>{count}</div>
            <div className="plus-container" onClick={clickPlus}>
              <img src={plus} alt="plus" className="plus" />
            </div>
          </div>
          <div className="buttons">
            <button onClick={addItem}>Add to Cart</button>
            <Link to="/cart">Check Out</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Description