import { combineReducers } from "redux";
import mobileSelectorReducer from "./../components/mobile-selector/reducer";
import filterReducer from "./../components/filter/reducer";

export default combineReducers({
    mobileSelectorReducer,
    filterReducer
});