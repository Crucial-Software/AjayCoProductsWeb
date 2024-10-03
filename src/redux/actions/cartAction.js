import { addToCart, getCartItems, deleteFromCart, updateInCart } from '../../components/api';
import * as Constants from './types';

export const fetchCartItems = (input) => dispatch => {

    const response = getCartItems(input)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (response.ok) {
                dispatch({
                    type: Constants.FETCH_CART_ITEMS,
                    payload: data.data,
                    loading: false,
                });
            }
        })
        .catch(error => {
            console.log("Fetch Cart Items Error: " + error)
        });;
    return response;
}

export const addItemToCart = (item) => dispatch => {

    const response = addToCart(item)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (response.ok) {
                dispatch({
                    type: Constants.ADD_ITEM_TO_CART,
                    payload: data.data,
                    loading: false,
                })
            }
            if (response.status === 400) {
                dispatch({
                    type: Constants.ADD_ITEM_TO_CART,
                    payload: JSON.stringify(data.message),
                    loading: false,
                })
            }
        })
        .catch(error => {
            console.log("Add To Cart Error: " + error)
        });;
    return response;
}
export const removeItemFromCart = (item) => dispatch => {
    const response = deleteFromCart(item)
        .then(async response => {
            //const isJson = response.headers.get('content-type')?.includes('application/json');
            //const data = isJson && await response.json();
            if (response.ok) {
                dispatch({
                    type: Constants.REMOVE_ITEM_FROM_CART,
                    payload: item._id,
                    loading: false,
                })
            }
        })
        .catch(error => {
            console.log("Remove From Cart Error: " + error)
        });;
    return response;

}

export const incrementItemQuantity = (item) => dispatch => {

    const response = updateInCart(item)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (response.ok) {
                dispatch({
                    type: Constants.INCREMENT_ITEM_QUANTITY,
                    payload: data.data,
                    loading: false,
                })
            }
        })
        .catch(error => {
            console.log("Increment Update In Cart Error: " + error)
        });;
    return response;
}
export const decrementItemQuantity = (item) => dispatch => {
    const response = updateInCart(item)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (response.ok) {
                dispatch({
                    type: Constants.DECREMENT_ITEM_QUANTITY,
                    payload: data.data,
                    loading: false,
                })
            }
        })
        .catch(error => {
            console.log("Decrement Update In Cart Error: " + error)
        });;
    return response;
}

