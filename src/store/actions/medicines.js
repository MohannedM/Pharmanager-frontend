import * as actionTypes from './actionTypes';

export const createMedicine = (medicineData, token) => {
    return{
        type: actionTypes.CREATE_MEDICINE,
        medicineData,
        token
    }
}

export const createMedicineStart = () => {
    return{
        type: actionTypes.CREATE_MEDICINE_START
    }
}

export const createMedicineSuccess = (medicineData) => {
    return{
        type: actionTypes.CREATE_MEDICINE_SUCCESS,
        medicineData
    }
}


export const createMedicineFail = error => {
    return{
        type: actionTypes.CREATE_MEDICINE_FAIL,
        error
    }
}

export const medicinesReached = () => {
    return{
        type: actionTypes.MEDICINES_REACHED
    }
}

export const medicinesDismissError = () => {
    return{
        type: actionTypes.MEDICINES_DISMISS_ERROR
    }
}