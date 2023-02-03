import Client from "shopify-buy";
import { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext();

const client = Client.buildClient({
    domain: 'jj-multi-shop.myshopify.com',
    storefrontAccessToken: process.env.REACT_APP_ACCESS_TOKEN,
})

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState({});
    const [products, setProducts] = useState({});

    useEffect(() => {
        if (localStorage.getItem('checkout') !== null) {
            fetchCart(localStorage.getItem('checkout'));
        } else {
            createCart();
        }
    }, [])

    const createCart = async () => {
        const checkout = await client.checkout.create();
        localStorage.setItem('checkout', checkout.id);
        setCart(checkout);
        console.log('created');
    }

    const fetchCart = async (checkoutId) => {
        const checkout = await client.checkout.fetch(checkoutId);
        setCart(checkout);
        console.log('fetched');
    };

    
    const addItemToCheckout = async (variantId, quantity) => {
        const lineItemsToAdd = [{ variantId, quantity }];
        const checkout = await client.checkout.addLineItems(cart.id, lineItemsToAdd);
        setCart(checkout);
    }

    const fetchAllProducts = async () => {
        const products = await client.product.fetchAll();
        console.log(products);
        setProducts(products);
    }

    return (
        <ShopContext.Provider value={[{ cart, products }, addItemToCheckout]}>
            {children}
        </ShopContext.Provider>
    )
}