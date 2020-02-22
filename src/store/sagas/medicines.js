import {put} from 'redux-saga/effects';
import {createMedicineSuccess,createMedicineStart,createMedicineFail} from '../actions'
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