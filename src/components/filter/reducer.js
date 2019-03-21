import { FETCH_USERS, FETCH_USERS_FAILED, FETCH_USERS_SUCCEDED } from "./actionTypes";

const initialState = {
	requesting: null,
	requested: null,
	users: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_USERS:
			return {
				...state,
				requesting: true
			};
		case FETCH_USERS_SUCCEDED:
			return {
				...state,
				requesting: false,
				requested: true,
				users: action.users
			};
		case FETCH_USERS_FAILED:
			return {
				...state,
				requesting: false,
				requested: false,
				users: []
			}
		default:
			return state;
	}
}