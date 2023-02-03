import { sendRequest, gql } from "./shopify";

export const getFeaturedProducts = async () => {
    const query = gql`
    {
        collection(id: "gid://shopify/Collection/434886246682") {
            title
            products(first: 5) {
                edges {
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
    }
    `
    const data = await sendRequest(query);
    return data.collection.products.edges;
}

export const getCollection = async (handle) => {
    const query = gql`
    {
        collection(handle: "${handle}") {
            products (first: 50) {
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
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    `
    const data = await sendRequest(query);
    return data.collection.products.edges;
}

export const getCollectionNext = async (handle, cursor) => {
    const query = gql`
    {
        collection(handle: "${handle}") {
            products (first: 50, after: "${cursor}") {
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
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    `
    const data = await sendRequest(query);
    return data.collection.products.edges;
}
