import { SELECTOR_TYPES } from "./actionTypes";

export function getBrands() {
    return {
        type: SELECTOR_TYPES.BRANDS.GET_BRANDS
    }
}

export function getModels() {
    return {
        type: SELECTOR_TYPES.BRANDS.GET_MODELS
    }
}