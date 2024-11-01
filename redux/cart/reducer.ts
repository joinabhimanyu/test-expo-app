import {Product} from "@/models/product";
import {ActionTypes} from "@/redux/cart/actions";

interface InitialState {
    items: Product[]
}

const initialState: InitialState = {
    items: [],
}

export default function CartReducer(state = initialState, action: { payload: Product, type: ActionTypes }) {
    switch (action.type) {
        case ActionTypes.ADD_CART:
            return {
                ...state,
                items: JSON.parse(JSON.stringify(state.items.concat(action.payload))),
            };
        case ActionTypes.DELETE_CART:
            return {
                ...state,
                items: [],
            };
        case ActionTypes.REMOVE_CART:
            return {
                ...state,
                items: JSON.parse(JSON.stringify(state.items.filter((item) => item.id !== action.payload.id))),
            };
        default:
            return state;
    }
}