import * as Constants from '../actions/types';

const initialState = {
    cart: [],
}
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.ADD_ITEM_TO_CART: {
            const inCart = state.cart.find((product) => product.id === action.payload.id);
            if (inCart && inCart.size === action.payload.size) {
                inCart.quantity += action.payload.quantity;
                inCart.totalPrice = (inCart.quantity) * inCart.price;
            } else {
                return { ...state, cart: [action.payload, ...state.cart] };
            }
            break;
        }
        case Constants.REMOVE_ITEM_FROM_CART: {
            return { ...state, cart: state.cart.filter((product) => product.id !== action.payload.id) };
        }
        case Constants.INCREMENT_ITEM_QUANTITY: {
            const plusCartItems = state.cart.map((item) => {
                return item.id === action.payload.id && item.size === action.payload.size ? { ...item, quantity: item.quantity + 6, totalPrice: item.price * (item.quantity + 6) } : item;
            });
            return { ...state, cart: plusCartItems };
        }
        case Constants.DECREMENT_ITEM_QUANTITY: {
            const minusCartItems = state.cart.map((item) => {
                    if (item.id === action.payload.id && item.size === action.payload.size) {
                        return { ...item, quantity: item.quantity - 6, totalPrice: item.price * (item.quantity - 6) };
                    }
                    return item;
                })
                .filter((item) => item.quantity > 0);
            return { ...state, cart: minusCartItems };
        }
        default:
            return state;
    }
};

export default cartReducer;