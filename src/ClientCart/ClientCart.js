import Client from "shopify-buy";
import { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext();

const client = Client.buildClient({
    domain: 'jj-multi-shop.myshopify.com',
    storefrontAccessToken: process.env.REACT_APP_ACCESS_TOKEN,
})

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState({});

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

    const updateItem = async (checkoutId, itemId, quantity) => {
        const lineItemsToUpdate = [{ id: itemId, quantity }]

        client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then((checkout) => {
            setCart(checkout);
        })
    }

    const removeItem = (checkoutId, itemId) => {
        const lineItemIdsToRemove = [
            itemId
        ]
        client.checkout.removeLineItems(checkoutId, lineItemIdsToRemove).then((checkout) => {
            setCart(checkout);
        })
    }

    return (
    <ShopContext.Provider value={[{ cart }, addItemToCheckout, updateItem, removeItem ]}>
            {children}
        </ShopContext.Provider>
    )
}