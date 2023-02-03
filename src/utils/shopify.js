export const gql = String.raw;

export const sendRequest = async (query) => {
  const response = await fetch(process.env.REACT_APP_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
      'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_ACCESS_TOKEN
    },
    body: query
  })
  const { data } = await response.json();
  return data;
}
