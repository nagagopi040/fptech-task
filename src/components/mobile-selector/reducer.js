import { SELECTOR_TYPES } from "./actionTypes";

const initialState = {
	brands: [],
	models: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SELECTOR_TYPES.GET_BRANDS:
			return {
				...state,
				brands: action.brands
			};
		case SELECTOR_TYPES.GET_MODELS:
			return {
				...state,
				models: action.models
			};
		default:
			return state;
	}
}