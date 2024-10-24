import * as Constants from '../actions/types';

const initialState = {
    cart: [],
    loading: true,
}
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.FETCH_CART_ITEMS:
            return { ...state, cart: action.payload, loading: action.loading, };
        case Constants.ADD_ITEM_TO_CART: {
            const inCart = state.cart.find((product) => product.variantID._id === action.payload.variantID._id);
            if (inCart) {
                return {
                    ...state,
                    cart: state.cart.map(item => item.variantID._id === action.payload.variantID._id ? {
                        ...item,
                        quantity: item.quantity + item.variantID.quantityIncreament,
                    } : item),
                    loading: false
                }
            } else {
                return { ...state, cart: [action.payload, ...state.cart], loading: action.loading }
            }
        }
        case Constants.REMOVE_ITEM_FROM_CART: {
            return { ...state, cart: state.cart.filter((product) => product._id !== action.payload) };
        }
        case Constants.INCREMENT_ITEM_QUANTITY: {
            const plusCartItems = state.cart.map((item) => {
                return item._id === action.payload._id && item.variantID._id === action.payload.variantID._id ? { ...item, quantity: parseInt(item.quantity) + (item.variantID ? item.variantID.quantityIncreament : 0) } : item;
            });
            return { ...state, cart: plusCartItems };
        }
        case Constants.DECREMENT_ITEM_QUANTITY: {
            const minusCartItems = state.cart.map((item) => {
                if (item._id === action.payload._id && item.variantID._id === action.payload.variantID._id) {
                    return { ...item, quantity: parseInt(item.quantity) - (item.variantID ? item.variantID.quantityIncreament : 0) };
                }
                return item;
            })
                .filter((item) => item.quantity > 0);
            return { ...state, cart: minusCartItems };
        }
        case Constants.CART_RESET:
            return { ...state, cart: action.payload, loading: action.loading, };
        default:
            return state;
    }
};

export default cartReducer;