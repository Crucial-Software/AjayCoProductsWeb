import * as Constants from '../actions/types';

const initialState = {
    data: null,
    loading: true,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.FETCH_ALL_PRODUCTS:
            return { ...state, data: action.payload, loading: action.loading };
        default:
            return state;
    }
};

export default productReducer;