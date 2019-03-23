import { combineReducers } from "redux";
import mobileSelectorReducer from "./../components/mobile-selector/reducer";
import appReducer from "./../appReducer";

export default combineReducers({
    appReducer,
    mobileSelectorReducer
});