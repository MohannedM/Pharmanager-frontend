import { put } from 'redux-saga/effects';
import { getMedicinesMarketStart, getMedicinesMarketSuccess, getMedicinesMarketFail } from '../actions';
import axios from 'axios';

export function* getMedicinesMarketSaga(action){
    yield put(getMedicinesMarketStart());

    try{
        const response = yield axios.get("http://localhost:8080/order/medicines?page=" + action.page, {
            headers:{
                Authorization: "Bearer " + action.token 
            }
        });
        yield put(getMedicinesMarketSuccess(response.data.medicines, response.data.totalMedicinesCount));
    }catch(error){
        yield put(getMedicinesMarketFail(error.response.data.message));
    }
    
}