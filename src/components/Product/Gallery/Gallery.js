import React from 'react'
import './Gallery.css'

const Gallery = ({ product }) => {
    if (product && Object.keys(product).length === 0) {
        return <div>loading...</div>
    }

    return (
        <div className="gallery">
            {product.images.edges.map((item) => {
                return (
                    <div className="desktop-image-render" key={item.node.url}>
                        <img className="thumbnail" src={item.node.url} alt="" />
                    </div>
                )
            })}
        </div>
    )
}

export default Gallery