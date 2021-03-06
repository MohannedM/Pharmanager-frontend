import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cart: null,
    loading: false,
    loadingItem: false,
    error: null,
    successMessage: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_CLEAR:
            return{
                ...state,
                cart: null,
                loading: false,
                loadingItem: false,
                error: null,
                successMessage: null
            }
        case actionTypes.ADD_TO_CART_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.ADD_TO_CART_SUCCESS:
            return{
                ...state,
                loading: false,
                cart: {...action.cart},
                successMessage: action.message
            }
        case actionTypes.ADD_TO_CART_FAIL:
            return{
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.CLEAR_MODAL_DATA:
            return{
                ...state,
                successMessage: null,
                error: null,
                loadingItem: false,
                loading: false
            }
        case actionTypes.GET_CART_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.GET_CART_SUCCESS:
            return{
                ...state,
                loading: false,
                cart: action.cartData
            }
        case actionTypes.GET_CART_FAIL:
            return{
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.DELETE_CART_ITEM_START:
            return{
                ...state,
                loadingItem: true
            }
        case actionTypes.DELETE_CART_ITEM_SUCCESS:
            const cartItems = [];
            state.cart.medicines.forEach(item=> {
                if(item._id !== action.cartItemId){
                    cartItems.push(item);
                }
            });
            return{
                ...state,
                loadingItem: false,
                cart: {...state.cart, medicines: cartItems},
                successMessage: action.message
            }
        case actionTypes.DELETE_CART_ITEM_FAIL:
            return{
                ...state,
                loadingItem: false,
                error: action.error
            }
        case actionTypes.ORDER_MEDICINES_SUCCESS:
            return{
                ...state,
                cart: null
            }
        default: return state;
    }
}

export default reducer;