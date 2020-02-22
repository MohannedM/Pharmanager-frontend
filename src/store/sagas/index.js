import { takeEvery } from "redux-saga/effects";
import * as actionTypes from '../actions/actionTypes';
import { authSaga, logoutSaga, authInitSaga, authTimeoutSaga } from "./auth";
import {createMedicineSaga} from './medicines';
 

export function* rootAuthSaga(){
    yield takeEvery(actionTypes.AUTH, authSaga);
    yield takeEvery(actionTypes.AUTH_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_INIT, authInitSaga);
    yield takeEvery(actionTypes.AUTH_TIMEOUT, authTimeoutSaga);
}


export function* rootMedicineSaga(){
    yield takeEvery(actionTypes.CREATE_MEDICINE, createMedicineSaga);
}
