import React, { useState, useEffect, useContext } from 'react'
import './Description.css'

import { ShopContext } from '../../../client/Client';
import minus from '../../../assets/icon-minus.svg'
import plus from '../../../assets/icon-plus.svg'

const Description = ({ product }) => {
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [count, setCount] = useState(0);
  const [variantId, setVariantId] = useState('');

  console.log(product);

  const [{cart}, addItemToCheckout] = useContext(ShopContext);

  const clickMinus = () => {
    if (count !== 0) {
      setCount(count - 1);
    }
  }

  const clickPlus = () => {
    setCount(count + 1);
  }

  const findVariantId = (title) => {
    const variant = product.variants.edges.filter((item) => item.node.title === title);
    setVariantId(variant.id);
  }

  useEffect(() => {
    if (product && Object.keys(product).length !== 0) {
      const variants = product.variants.edges;
      let colorArray = [];
      let sizeArray = [];
      variants.forEach((item) => {
        let color = item.node.title;
        let size = item.node.title;
        color = color.substring(0, color.indexOf("/")).trim();
        size = size.substring(size.indexOf("/") + 1).trim();
        if (color !== '') {
          colorArray.push(color);
        }
        if (size !== 'Default Title') {
          sizeArray.push(size);
        }
      })
      let uniqueColors = [...new Set(colorArray)];
      let uniqueSizes = [...new Set(sizeArray)];
      setColor(uniqueColors);
      setSize(uniqueSizes)
    }
  }, [product])

  if (product && Object.keys(product).length === 0) {
    return <div>loading...</div>
  }

  return (
    <div className="description-container">
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
        <div className="size">
          <div>Size</div>
          <div className="size-container">
            {
              size.length > 0 ?
                size.map((item) => {
                  return <div key={item} className="size-tag">{item}</div>
                })
                : <div className="size-tag">One size</div>
            }
          </div>
        </div>
        <div className="color">
          <div>Color</div>
          <div className="size-container">
            {
              color.length > 0 ?
                color.map((item) => {
                  return <div key={item} className="size-tag">{item}</div>
                })
                : <div className="size-tag">One Color</div>
            }
          </div>
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
          <button onClick={() => addItemToCheckout('gid://shopify/ProductVariant/44421623513370', count)}>Add to Cart</button>
          <button>Check Out</button>
        </div>
      </div>
    </div>
  )
}

export default Description