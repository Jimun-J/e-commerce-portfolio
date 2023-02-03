import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

const Card = ({ product }) => {
  const [color, setColor] = useState([]);

  const arr = product.id.split("/");
  const id = arr[arr.length - 1];

  useEffect(() => {
    const colors = product.options.filter((item) => item.name === 'Color');
    if (colors.length > 0) {
      setColor(colors[0].values);
    }
  }, [])

  return (
    <Link to={"/product/" + id} className="card" id={id}>
      <img src={product.images.edges[0].node.url} alt="" />
      <div className="text-wrap">
        <h4>{product.title}</h4>
        <p>{product.productType}</p>
        {color.length > 0 ?
          color.map((item) => {
            return (
              <div className="color-variant-container" key={item}>
                <div
                  className="color-variant"
                  style={{ backgroundColor: `${item}` }}
                ></div>
              </div>
            )
          })
          : <div style={{ marginTop: '52px'}}></div>
        }
        {
          product.compareAtPriceRange.maxVariantPrice.amount !== "0.0" ? 
          <div className="sale">
            <div className="original-price">${Number(product.compareAtPriceRange.maxVariantPrice.amount).toFixed(2)}</div>
            <div className="discounted-price">${Number(product.priceRange.minVariantPrice.amount).toFixed(2)}</div>
          </div>
          :<div className="sale">
            <div className="discounted-price">${Number(product.priceRange.minVariantPrice.amount).toFixed(2)}</div>
          </div> 
        }
      </div>
    </Link>
  )
}

export default Card