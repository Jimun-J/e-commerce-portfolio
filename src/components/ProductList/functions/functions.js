import { getFirstProductList, getNextProductList } from '../../../utils/getProducts';
import { getCollection, getCollectionNext } from '../../../utils/getCollection';

export const getAllProducts = async () => {
    let productsArray = [];
    let data = await getFirstProductList();

    if (data.length !== 0) {
        let cursor = data[data.length - 1].cursor;
        data.forEach((data) => {
            productsArray.push(data);
        })

        while (data.length !== 0) {
            data = await getNextProductList(cursor);
            if (data.length !== 0) {
                cursor = data[data.length - 1].cursor;
                data.forEach((data) => {
                    productsArray.push(data);
                })
            }
        }
        return { products: productsArray }
    } else {
        return { products: [] }
    }
}

export const getAllCollectionProducts = async (id) => {
    let productsArray = [];
    let data = await getCollection(id);

    if (data.length !== 0) {
        let cursor = data[data.length - 1].cursor;
        data.forEach((data) => {
            productsArray.push(data);
        })

        while (data.length !== 0) {
            data = await getCollectionNext(id, cursor);
            if (data.length !== 0) {
                cursor = data[data.length - 1].cursor;
                data.forEach((data) => {
                    productsArray.push(data);
                })
            }
        }
        return { products: productsArray }
    } else {
        return { products: [] }
    }
}

export const handleFilterChange = (e, products) => {
    let newArray;
    switch (e.target.value) {
        case '0':
            newArray = sortArrayById(products);
            return newArray;
        case '1':
            newArray = sortArrayAtoZ(products);
            return newArray;
        case '2':
            newArray = sortArrayZtoA(products);
            return newArray;
        case '3':
            newArray = sortArrayPriceHtoL(products);
            return newArray;
        case '4':
            newArray = sortArrayPriceLtoH(products);
            return newArray;
        default:
            return products;
    }
}

export const sortArrayById = (products) => {
    let sortedArray = products.sort((p1, p2) =>
        (p1.node.id < p2.node.id) ? 1 : (p1.node.id > p2.node.id) ? -1 : 0
    );
    return sortedArray;
}

export const sortArrayAtoZ = (products) => {
    let sortedArray = products.sort((p1, p2) =>
        (p1.node.title > p2.node.title) ? 1 : (p1.node.title < p2.node.title) ? -1 : 0
    );
    return sortedArray;
}

export const sortArrayZtoA = (products) => {
    let sortedArray = products.sort((p1, p2) =>
        (p1.node.title < p2.node.title) ? 1 : (p1.node.title > p2.node.title) ? -1 : 0
    );
    return sortedArray;
}

export const sortArrayPriceHtoL = (products) => {
    let sortedArray = products.sort((p1, p2) =>
        (Number(p1.node.priceRange.minVariantPrice.amount) > Number(p2.node.priceRange.minVariantPrice.amount)) ? 1 :
            (Number(p1.node.priceRange.minVariantPrice.amount) < Number(p2.node.priceRange.minVariantPrice.amount)) ? -1 : 0
    );
    return sortedArray;
}

export const sortArrayPriceLtoH = (products) => {
    let sortedArray = products.sort((p1, p2) =>
        (Number(p1.node.priceRange.minVariantPrice.amount) < Number(p2.node.priceRange.minVariantPrice.amount)) ? 1 :
            (Number(p1.node.priceRange.minVariantPrice.amount) > Number(p2.node.priceRange.minVariantPrice.amount)) ? -1 : 0
    );
    return sortedArray;
}