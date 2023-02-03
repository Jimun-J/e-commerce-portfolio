import { sendRequest, gql } from "./shopify";

export const getBlog = async () => {
    const query = gql`
    {
        blogs(first: 1) {
            edges {
                node {
                    id
                    title
                    articles(first: 1) {
                        edges {
                            node {
                                title
                                excerpt
                                contentHtml
                                authorV2 {
                                    name
                                }
                                image {
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
    return data.blogs.edges;
}