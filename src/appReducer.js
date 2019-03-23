import { APP_TYPES } from "./appActions";

const initialState = {
	product: {},
	filters: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case APP_TYPES.GET_PRODUCT_DETAILS:
			return {
				...state,
				product: action.product
			};
		case APP_TYPES.GET_FILTERS_DATA:
			return {
				...state,
				filters: action.filters
			};
		default:
			return state;
	}
}