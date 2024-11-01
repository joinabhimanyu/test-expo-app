import {combineReducers} from "redux";
import CartReducer from "@/redux/cart/reducer";

const rootReducer=combineReducers({
    cart: CartReducer
});

export default rootReducer;