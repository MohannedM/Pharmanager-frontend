import { put } from 'redux-saga/effects';
import { getMedicinesMarketStart,
         getMedicinesMarketSuccess,
         getMedicinesMarketFail,
         getMedicinesMarket,
         orderMedicinesStart,
         orderMedicinesSucces,
         orderMedicinesFail,
         getOrdersStart,
         getOrdersSuccess,
         getOrdersFail
         } from '../actions';
import axios from 'axios';

export function* getMedicinesMarketSaga(action){
    yield put(getMedicinesMarketStart());

    try{
        const response = yield axios.get("http://localhost:8080/order/medicines?page=" + action.page, {
            headers:{
                Authorization: "Bearer " + action.token 
            }
        });
        yield put(getMedicinesMarketSuccess(response.data.medicines, response.data.totalMedicinesCount, action.page));
    }catch(error){
        yield put(getMedicinesMarketFail(error.response.data.message));
    }
}
export function* marketPageChangedSaga(action){
    yield put(getMedicinesMarket(action.token, action.page));
}

export function* orderMedicinesSaga(action){
    yield put(orderMedicinesStart());
    try{
        yield axios.post("http://localhost:8080/orders",{cartId: action.cartId},{
            headers:{
                Authorization: "Bearer " + action.token
            }
        });
        yield put(orderMedicinesSucces());
    }catch(error){
        yield put(orderMedicinesFail(error.response.data.message))
    }
}

export function* getOrdersSaga(action){
    yield put(getOrdersStart());
    try{
        const response = yield axios.get("http://localhost:8080/orders",{
            headers: {
                Authorization: "Bearer " + action.token
            }
        });
        yield put(getOrdersSuccess(response.data.orders));
    }catch(error){
        yield put(getOrdersFail(error.response.data.message));
    }

}