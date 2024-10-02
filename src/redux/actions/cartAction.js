import { addToCart } from '../../components/api';
import * as Constants from './types';

export const addItemToCart = (item) => dispatch => {
    
    const response = addToCart(item)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (response.ok) {
                    console.log("data: " + JSON.stringify(data));
                    dispatch({
                        type: Constants.ADD_ITEM_TO_CART,
                        payload: data.data
                    })
                }
            })
            .catch(error => {
                console.log("Products Error: " + error)
            });;
        return response;
    
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