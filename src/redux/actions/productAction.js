import { getAllProducts } from '../../components/api';
import * as Constants from './types';

export const fetchProducts = () => dispatch => {

        const response = getAllProducts()
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (response.ok) {
                    dispatch({
                        type: Constants.FETCH_ALL_PRODUCTS,
                        payload: data.data,
                        loading: false
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: Constants.FETCH_ALL_PRODUCTS,
                    payload: "",
                    loading: false
                });
                //console.log("Products Error: " + error)
            });;
        return response;

}