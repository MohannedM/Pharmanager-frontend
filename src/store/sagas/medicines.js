import {put} from 'redux-saga/effects';
import {createMedicineSuccess,createMedicineStart,createMedicineFail, getMedicinesSuccess, getMedicinesStart, getMedicinesFail} from '../actions'
import axios from 'axios';

export function* createMedicineSaga(action){
    yield put(createMedicineStart());
    try{
        const response = yield axios.post("http://localhost:8080/medicines", action.medicineData,{
            headers: {
                Authorization: "Bearer " + action.token
            }
        });
        yield put(createMedicineSuccess(response.data.medicine));
    }catch(error){
        yield put(createMedicineFail(error.response.data.message));
    }

}

export function* getMedicinesSaga(action){
    yield put(getMedicinesStart());
    try{
        const response = yield axios.get("http://localhost:8080/medicines", {
            headers: {
                Authorization: "Bearer " + action.token
            }
        });
        yield put(getMedicinesSuccess(response.data.medicines));
    }catch(error){
        yield put(getMedicinesFail(error.response.data.message));
    }
}