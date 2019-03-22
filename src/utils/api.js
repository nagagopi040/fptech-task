import brands from "./../assets/json/brands.json";
import products from "./../assets/json/products.json";
import productResponse from "./../assets/json/productResponse.json";

import 'babel-polyfill';

export const API = {
    getAllBrands: async () => {
        const data = await brands.facetResponse.facets[0].Values;
        return data;
    },
    groupModels: () => {
        const items = products.productResponse.products;
        return items.reduce( (result, item) => ({
            ...result,
            [item.attributes.brand[0]]: [
                ...(result[item.attributes.brand[0]] || []),
                item,
            ],
        }),{})
    },
    getBrandModels: async (brandName) => {
        const res = API.groupModels();
        const data = await res[brandName]
        return data;
    },
    getProductDetails: async (catalog_id, product_id) => {
        return productResponse.filter(product => product.product_id === product_id && product.product_details.catalog_details.catalog_id === catalog_id)
    }
}