import brands from "./../assets/json/brands.json";
import products from "./../assets/json/products.json";
import productResponse from "./../assets/json/productResponse.json";

import 'babel-polyfill';

export const API = {
    BRANDS: async () => {
        const data = await brands.facetResponse.facets[0].Values;
        return data;
    }
}