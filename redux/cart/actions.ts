import {Product} from "@/models/product";

export enum ActionTypes {
    ADD_CART = 'ADD_CART',
    REMOVE_CART = 'REMOVE_CART',
    DELETE_CART = 'DELETE_CART',
}

export const addItemsToCart = (payload:Product)=>({
    type: ActionTypes.ADD_CART,
    payload,
});

export const deleteCart = ()=>({
    type: ActionTypes.DELETE_CART,
});

export const removeItemsFromCart = (payload:Product)=>({
    type: ActionTypes.REMOVE_CART,
    payload,
})