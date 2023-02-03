import { sendRequest, gql } from "./shopify";

export const getProduct = async (gid) => {
    const query = gql`
    {
        product(id: "gid://shopify/Product/${gid}") {
            id
            handle
            title
            options {
                name
                values
            }
            variants(first: 10) {
                edges {
                    node {
                        title
                        id
                    }
                }
            }
            compareAtPriceRange {
                maxVariantPrice {
                    amount
                }
            }
            priceRange {
                minVariantPrice {
                    amount
                }
            }
            tags
            productType
            images(first: 5) {
                edges {
                    node {
                        url
                        altText
                    }
                }
            }
        }
    }
    `
    const data = await sendRequest(query)
    return data.product;
}