import { APP_TYPES } from "./appActions";

const initialState = {
	product: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case APP_TYPES.GET_PRODUCT_DETAILS:
			return {
				...state,
				product: action.product
			};
		default:
			return state;
	}
}