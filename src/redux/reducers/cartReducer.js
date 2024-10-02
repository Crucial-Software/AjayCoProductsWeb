import * as Constants from '../actions/types';

const initialState = {
    cart: []
}
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.ADD_ITEM_TO_CART: {
            const inCart = state.cart.find((product) => product.variantID === action.payload.variantID);
            if (inCart && inCart.variantID === action.payload.variantID) {
                inCart.quantity += action.payload.quantity;
            } else {

                return { ...state, cart: [action.payload, ...state.cart] };
            }
            break;
        }
        case Constants.REMOVE_ITEM_FROM_CART: {
            return { ...state, cart: state.cart.filter((product) => product.variantID !== action.payload.variantID) };
        }
        case Constants.INCREMENT_ITEM_QUANTITY: {
            const plusCartItems = state.cart.map((item) => {
                return item.variantID === action.payload.variantID && item.selectedVariant === action.payload.selectedVariant ? { ...item, quantity: item.quantity + item.incrementQuantity,} : item;
            });
            return { ...state, cart: plusCartItems };
        }
        case Constants.DECREMENT_ITEM_QUANTITY: {
            const minusCartItems = state.cart.map((item) => {
                    if (item.variantID === action.payload.variantID && item.selectedVariant === action.payload.selectedVariant) {
                        return { ...item, quantity: item.quantity - item.incrementQuantity };
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