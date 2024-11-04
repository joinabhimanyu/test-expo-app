import {Product, PurchasedProduct} from "@/models/product";
import {ActionTypes} from "@/redux/cart/actions";

interface InitialState {
    items: PurchasedProduct[]
}

const initialState: InitialState = {
    items: [],
}

export default function CartReducer(state = initialState, action: {
    payload: Product | PurchasedProduct,
    type: ActionTypes
}) {
    switch (action.type) {
        case ActionTypes.ADD_CART:
            return {
                ...state,
                items: JSON.parse(JSON.stringify(state.items.concat({
                    ...action.payload,
                    purchasedQuantity: 0
                }))),
            };
        case ActionTypes.SET_CART:
            if (action.payload as PurchasedProduct) {
                // mutate a single value in state items depending on id
                const items = JSON.parse(JSON.stringify(state.items));
                for (const item of items) {
                    if (action.payload as PurchasedProduct && item && item.id == action.payload.id) {
                        item.purchasedQuantity = (action.payload as PurchasedProduct).purchasedQuantity;
                        break;
                    }
                }
                return {
                    ...state,
                    items: items,
                }
            }
            break;
        case ActionTypes.DELETE_CART:
            return {
                ...state,
                items: [],
            };
        case ActionTypes.REMOVE_CART:
            if (action.payload as Product) {
                return {
                    ...state,
                    items: JSON.parse(JSON.stringify(
                        state.items.filter((item) => item.id !== (action.payload as Product)
                            .id))),
                };
            }
            break;
        default:
            return state;
    }
}