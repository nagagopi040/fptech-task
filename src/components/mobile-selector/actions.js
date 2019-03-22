import { SELECTOR_TYPES } from "./actionTypes";

export function getBrands(brands) {
    return {
        type: SELECTOR_TYPES.GET_BRANDS,
        brands
    }
}

export function getModels(models) {
    return {
        type: SELECTOR_TYPES.GET_MODELS,
        models
    }
}