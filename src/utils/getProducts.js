import { sendRequest, gql } from "./shopify";

export const getFirstProductList = async () => {
    const query = gql`
    {
        products(first: 50) {
            edges {
                cursor
                node {
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
                    images(first: 1) {
                        edges {
                            node {
                                url
                                altText
                            }
                        }
                    }
                }   
            }
        }
    }
    `
    const data = await sendRequest(query);
    return data.products.edges;
}

export const getNextProductList = async (cursor) => {
    const query = gql`
    {
        products(first: 50, after: "${cursor}") {
            edges {
                cursor
                node {
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
                    images(first: 1) {
                        edges {
                            node {
                                url
                                altText
                            }
                        }
                    }
                }   
            }
        }
    }
    `
    const data = await sendRequest(query);
    return data.products.edges;
}