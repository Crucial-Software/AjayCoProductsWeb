import { getProducts } from '../data';
import * as Constants from './types';

export const fetchProducts = (item) => dispatch => {

    const productItems = getProducts();
    dispatch({
        type: Constants.FETCH_ALL_PRODUCTS,
        payload: productItems,
    });
}