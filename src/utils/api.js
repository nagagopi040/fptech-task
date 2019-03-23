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
        return items.reduce((result, item) => ({
            ...result,
            [item.attributes.brand[0]]: [
                ...(result[item.attributes.brand[0]] || []),
                item,
            ],
        }), {})
    },
    getBrandModels: async (brandName) => {
        const res = API.groupModels();
        const data = await res[brandName]
        return data;
    },
    getProductDetails: async (catalog_id, product_id) => {
        return productResponse.filter(product => product.product_id === product_id && product.product_details.catalog_details.catalog_id === catalog_id)
    },
    groupFilters: async (items, key) =>
        items.reduce(
            (result, item) => ({
                ...result,
                [item[key]]: [
                    ...(result[item[key]] || []),
                    item
                ],
            }), {}
        ),
    getAllFilters: async () => {
        let data = [];
        productResponse.forEach(result => {
            const res = result.product_details.catalog_details.attribute_map;
            for (var item in res) {
                data.push(res[item])
            }
        });
        data = data.filter((item, index, self) =>
            index === self.findIndex((t) => (
                t.display_string === item.display_string
            ))
        )
        return data.reduce(
            (result, item) => ({
                ...result,
                [item.attribute_category_name]: [
                    ...(result[item.attribute_category_name] || []),
                    item,
                ],
            }),
            {}
        )
    }
}