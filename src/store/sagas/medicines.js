import {put} from 'redux-saga/effects';
import {createMedicineSuccess,createMedicineStart,createMedicineFail, getMedicinesSuccess, getMedicinesStart, getMedicinesFail, editMedicineStart, editMedicineSuccess, editMedicineFail} from '../actions'
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
        const medicinesArr = [];
        console.log(response)
        response.data.medicines.forEach(medicineInfo=>{
            if(medicineInfo.medicine){
                if(medicineInfo.quantity){
                    medicineInfo.medicine.availableQuantity = medicineInfo.quantity
                }
                medicineInfo.medicine.userMedicineId = medicineInfo._id;
                medicinesArr.push(medicineInfo.medicine)
            }
            
        });
        yield put(getMedicinesSuccess(medicinesArr));
    }catch(error){
        if(error.response){
            yield put(getMedicinesFail(error.response.data.message));
        }
    }
}

export function* editMedicineSaga(action){
    yield put(editMedicineStart());
    try{
        const response = yield axios.put("http://localhost:8080/medicines/" + action.medicineId, action.medicineData,{
            headers: {
                Authorization: "Bearer " + action.token
            }
        });
        console.log(response)
        yield put(editMedicineSuccess());
    }catch(error){
        console.log(error)
        if(error.response){
            yield put(editMedicineFail(error.response.data.message));
        }
    }
}

export function* deleteMedicineSaga(action){
    yield put(getMedicinesStart());
    try{
        yield axios.delete("http://localhost:8080/medicines/" + action.medicineId + '?user_medicine_id='+action.userMedicineId, {
            headers: {
                Authorization: "Bearer " + action.token
            }
        });
        const response = yield axios.get("http://localhost:8080/medicines", {
            headers: {
                Authorization: "Bearer " + action.token
            }
        });
        yield put(getMedicinesSuccess(response.data.medicines));
    }catch(error){
        if(error.response){
            yield put(getMedicinesFail(error.response.data.message));
        }
    }
}