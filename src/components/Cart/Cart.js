import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../../client/Client'
import DeleteIcon from '@mui/icons-material/Delete';
import './Cart.css'

const Cart = () => {
    const [{ cart }, removeItem] = useContext(ShopContext);
    const [items, setItems] = useState([]);

    console.log(cart);

    useEffect(() => {
        if (cart && Object.keys(cart).length !== 0) {
            setItems(cart.lineItems);
        }
    }, [items, cart]);

    if (items.length === 0) {
        <div>Loading...</div>
    }

    const increaseQuantity = (id) => {
        const item = items.filter((item) => item.id === id);
        const quantity = item[0].quantity + 1;
    }

    const reduceQuantity = (id) => {
        console.log(cart.id);
        console.log(id);
        const item = items.filter((item) => item.id === id);
        const quantity = item[0].quantity - 1;
        if (quantity === 0) {
            //delete item
        } else {
            console.log(typeof(quantity));
            // updateItem(cart.id, id, quantity);
        }   
    }

    const remove = () => {
        removeItem();
    }

    return (
        <div className="cart-container">
            <div className="cart">
                {
                    items.length === 0 ?
                        <div className="center">Empty Cart</div> :
                        <div className="cart-items">
                            <div className="cart-title">
                                <div className="shopping-cart">Shopping Cart</div>
                                <div className="count-items">{items.length} Items</div>
                            </div>
                            <div className="chart">
                                <div>PRODUCTS</div>
                                <div>QUANTITY</div>
                                <div>TOTAL</div>
                            </div>
                            {
                                items.map((item) => {
                                    return (
                                        <div className="cart-item" key={item.id}>
                                            <div className="first-column">
                                                <img src={item.variant.image.src} alt="" />
                                                <div className="cart-item-description">
                                                    <h2>{item.title}</h2>
                                                    <p>${item.variant.price.amount} CAD</p>
                                                    <h3>
                                                        {item.variant.title === 'Default Title' ?
                                                            <div></div> :
                                                            <div>{item.variant.title}</div>
                                                        }
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="cart-count-container">
                                                <div className="cart-count">
                                                    <button onClick={() => reduceQuantity(item.id)}>-</button>
                                                    <div>{item.quantity}</div>
                                                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                                                </div>
                                                <DeleteIcon className="icon-delete" onClick={remove}/>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                ${(Number(item.variant.price.amount) * (item.quantity)).toFixed(2)} CAD
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className="total">
                                ${cart.totalPrice.amount} CAD
                            </div>  
                            <div className="checkout-container">
                                <a href={cart.webUrl} target="_blank" rel="noreferrer"><button className="checkout">Check Out</button></a>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default Cart