import * as Constants from './types';

export const addItemToCart = (item) => dispatch => {
    dispatch({
        type: Constants.ADD_ITEM_TO_CART,
        payload: item
    })
}
export const removeItemFromCart = (item) => dispatch => {
    dispatch({
        type: Constants.REMOVE_ITEM_FROM_CART,
        payload: item
    })
}
export const incrementItemQuantity = (item) => dispatch => {
    dispatch({
        type: Constants.INCREMENT_ITEM_QUANTITY,
        payload: item
    })
}
export const decrementItemQuantity = (item) => dispatch => {
    dispatch({
        type: Constants.DECREMENT_ITEM_QUANTITY,
        payload: item
    })
}