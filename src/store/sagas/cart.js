import { put } from 'redux-saga/effects';
import { addToCartStart, addToCartFail, addToCartSuccess, getCartSuccess, getCartStart, getCartFail, deleteCartItemStart, deleteCartItemSuccess, deleteCartItemFail, clearModalData } from '../actions';
import axios from 'axios';

export function* addToCartSaga(action){
    yield put(addToCartStart());

    try{
        const response = yield axios.post("http://localhost:8080/cart", {medicineId: action.medicineId, quantity: action.quantity}, {
            headers:{
                Authorization: "Bearer " + action.token
            }
        });
        yield put(addToCartSuccess(response.data.medicine, response.data._id, response.data.message));
    }catch(error){
        yield put(addToCartFail(error.response.data.message));
    }
}

export function* getCartSaga(action){
    yield put(getCartStart());

    try{
        const response = yield axios.get("http://localhost:8080/cart", {
            headers:{
                Authorization: "Bearer " + action.token
            }
        });

        yield put(getCartSuccess(response.data.cart.medicines));
    }catch(error){
        yield put(getCartFail(error.response.data.message));
    }
}

export function* deleteCartItemSaga(action){
    yield put(deleteCartItemStart());
    try{
        const response = yield axios.delete("http://localhost:8080/cart/" + action.cartItemId, {
            headers:{
                Authorization: 'Bearer ' + action.token
            }
        });
        yield put(deleteCartItemSuccess(response.data.message, action.cartItemId)); 
    }catch(error){
        yield put(deleteCartItemFail(error.response.data.message));
        yield put(clearModalData());
    }
}