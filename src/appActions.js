export const APP_TYPES = {
    GET_PRODUCT_DETAILS : "GET_PRODUCT_DETAILS"
}

export function getPoductDetails(product) {
    return {
        type: APP_TYPES.GET_PRODUCT_DETAILS,
        product
    }
}