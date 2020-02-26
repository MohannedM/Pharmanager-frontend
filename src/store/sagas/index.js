import { takeEvery } from "redux-saga/effects";
import * as actionTypes from '../actions/actionTypes';
import { authSaga, logoutSaga, authInitSaga, authTimeoutSaga } from "./auth";
import {createMedicineSaga, getMedicinesSaga, editMedicineSaga, deleteMedicineSaga} from './medicines';
import { getMedicinesMarketSaga, marketPageChangedSaga } from "./orders";
 

export function* rootAuthSaga(){
    yield takeEvery(actionTypes.AUTH, authSaga);
    yield takeEvery(actionTypes.AUTH_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_INIT, authInitSaga);
    yield takeEvery(actionTypes.AUTH_TIMEOUT, authTimeoutSaga);
}


export function* rootMedicineSaga(){
    yield takeEvery(actionTypes.CREATE_MEDICINE, createMedicineSaga);
    yield takeEvery(actionTypes.GET_MEDICINES, getMedicinesSaga);
    yield takeEvery(actionTypes.EDIT_MEDICINE, editMedicineSaga);
    yield takeEvery(actionTypes.DELETE_MEDICINE, deleteMedicineSaga);
}

export function* rootOrdersSaga(){
    yield takeEvery(actionTypes.GET_MEDICINES_MARKET, getMedicinesMarketSaga);
    yield takeEvery(actionTypes.MARKET_PAGE_CHANGED, marketPageChangedSaga);
}