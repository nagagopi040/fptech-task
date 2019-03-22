import { combineReducers } from "redux";
import mobileSelectorReducer from "./../components/mobile-selector/reducer";
import filterReducer from "./../components/filter/reducer";
import appReducer from "./../appReducer";

export default combineReducers({
    appReducer,
    mobileSelectorReducer,
    filterReducer
});