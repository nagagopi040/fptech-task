import { FILTER_TYPES } from "./actiionTypes";

const initialState = {
	filters: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FILTER_TYPES.GET_FILTERS_DATA:
			return {
				...state,
				filters: action.filters
			};
		default:
			return state;
	}
}