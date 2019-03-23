export const APP_TYPES = {
    GET_PRODUCT_DETAILS : "GET_PRODUCT_DETAILS",
    GET_FILTERS_DATA: "GET_FILTERS_DATA"
}

export function getPoductDetails(product) {
    return {
        type: APP_TYPES.GET_PRODUCT_DETAILS,
        product
    }
}

export function getFilterData(data) {
    return {
        type: APP_TYPES.GET_FILTERS_DATA,
        filters: data
    }
}