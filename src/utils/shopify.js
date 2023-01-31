
export async function fetchData() {
    const response = await fetch('https://jj-multi-shop.myshopify.com/api/2023-01/graphql.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/graphql',
            'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_ACCESS_TOKEN,
        },
        body: `{
          shop {
            name
          }
        }`
    })
    const { data } = await response.json();
    console.log(data);
    return data;
}