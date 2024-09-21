import * as Constants from '../actions/types';

const initialState = {
    data: null,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.FETCH_ALL_PRODUCTS:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default productReducer;