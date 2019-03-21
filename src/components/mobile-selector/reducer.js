import { SELECTOR_TYPES } from "./actionTypes";

const initialState = {
	requesting: null,
	requested: null,
	brands: [],
	models: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SELECTOR_TYPES.BRANDS.GET_BRANDS:
			return {
				...state,
				requesting: true
			};
		case SELECTOR_TYPES.BRANDS.GET_BRANDS_SUCCEDED:
			return {
				...state,
				requesting: false,
				requested: true,
				brands: action.brands
			};
		case SELECTOR_TYPES.BRANDS.GET_BRANDS_FAILED:
			return {
				...state,
				requesting: false,
				requested: false,
				brands: []
			}

			case SELECTOR_TYPES.BRANDS.GET_MODELS:
			return {
				...state,
				requesting: true
			};
		case SELECTOR_TYPES.BRANDS.GET_MODELS_SUCCEDED:
			return {
				...state,
				requesting: false,
				requested: true,
				models: action.models
			};
		case SELECTOR_TYPES.BRANDS.GET_MODELS_FAILED:
			return {
				...state,
				requesting: false,
				requested: false,
				models: []
			}
		default:
			return state;
	}
}