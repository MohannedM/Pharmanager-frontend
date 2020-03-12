import * as actionTypes from './actionTypes';


export const addToCart = (token, medicineId, quantity) => {
    return{
        type: actionTypes.ADD_TO_CART,
        token,
        medicineId,
        quantity
    }
}


export const addToCartStart = () => {
    return{
        type: actionTypes.ADD_TO_CART_START
    }
}

export const addToCartSuccess = (cart, message) => {
    return{
        type: actionTypes.ADD_TO_CART_SUCCESS,
        cart,
        message
    }
}

export const addToCartFail = error => {
    return{
        type: actionTypes.ADD_TO_CART_FAIL,
        error
    }
}

export const clearModalData = () => {
    return{
        type: actionTypes.CLEAR_MODAL_DATA
    }
}

export const getCart = token => {
    return{
        type: actionTypes.GET_CART,
        token
    }
}

export const getCartStart = () => {
    return{
        type: actionTypes.GET_CART_START
    }
}

export const getCartSuccess = cartData => {
    return{
        type: actionTypes.GET_CART_SUCCESS,
        cartData
    }
}

export const getCartFail = error => {
    return{
        type: actionTypes.GET_CART_FAIL,
        error
    }
}


export const deleteCartItem = (token, cartItemId) => {
    return{
        type: actionTypes.DELETE_CART_ITEM,
        token,
        cartItemId
    }
}

export const deleteCartItemStart = () => {
    return{
        type: actionTypes.DELETE_CART_ITEM_START
    }
}

export const deleteCartItemSuccess = (message, cartItemId) => {
    return{
        type: actionTypes.DELETE_CART_ITEM_SUCCESS,
        message,
        cartItemId
    }
}

export const deleteCartItemFail = error => {
    return{
        type: actionTypes.DELETE_CART_ITEM_FAIL,
        error
    }
}

export const deleteCart = token => {
    return{
        type: actionTypes.DELETE_CART,
        token
    }    
}