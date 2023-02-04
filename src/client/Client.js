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
        const lineItemsToUpdate = [{ id: itemId, quantity: 3 }]

        client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then((checkout) => {
            setCart(checkout);
        })
    }

    const removeItem = async () => {
    //     const result = await fetch(process.env.REACT_APP_API_URL, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-Shopify-Storefront-Access-Token':
    //                 process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    //         },
    //         body: JSON.stringify({
    //             query: `
    //                 mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    //                     checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
    //                         checkout {
    //                             id
    //                         }
    //                         checkoutUserErrors {
    //                             message
    //                         }
    //                     }
    //                 }
    //         `, variables: {
    //             "checkoutId": "gid://shopify/Checkout/d12f8d2e9ebe40abf689b761a4c98b97?key=76163d9247dbc9942d54c00c1ef0c2cc",
    //             "lineItemIds": [
    //                 "gid://shopify/CheckoutLineItem/444210500078340?checkout=d12f8d2e9ebe40abf689b761a4c98b97"
    //             ]
    //         }
    //     }),
    // })
    // console.log(result);
}

return (
    <ShopContext.Provider value={[{ cart }, addItemToCheckout, updateItem, removeItem]}>
        {children}
    </ShopContext.Provider>
)
}