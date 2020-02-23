import * as actionTypes from './actionTypes';

export const createMedicine = (medicineData, token) => {
    return {
        type: actionTypes.CREATE_MEDICINE,
        medicineData,
        token
    }
}

export const createMedicineStart = () => {
    return {
        type: actionTypes.CREATE_MEDICINE_START
    }
}

export const createMedicineSuccess = (medicineData) => {
    return {
        type: actionTypes.CREATE_MEDICINE_SUCCESS,
        medicineData
    }
}


export const createMedicineFail = error => {
    return {
        type: actionTypes.CREATE_MEDICINE_FAIL,
        error
    }
}

export const medicinesReached = () => {
    return {
        type: actionTypes.MEDICINES_REACHED
    }
}

export const medicinesDismissError = () => {
    return {
        type: actionTypes.MEDICINES_DISMISS_ERROR
    }
}

export const getMedicines = token => {
    return {
        type: actionTypes.GET_MEDICINES,
        token
    }
}

export const getMedicinesStart = () => {
    return {
        type: actionTypes.GET_MEDICINES_START
    }
}

export const getMedicinesSuccess = medicines => {
    return {
        type: actionTypes.GET_MEDICINES_SUCCESS,
        medicines
    }
}

export const getMedicinesFail = error => {
    return {
        type: actionTypes.GET_MEDICINES_FAIL,
        error
    }
}

export const editMedicineFeilds = (medicineData) => {
    return {
        type: actionTypes.EDIT_MEDICINE_FIELDS,
        medicineData
    }
}

export const editMedicine = (medicineData, medicineId, token) => {
    return {
        type: actionTypes.EDIT_MEDICINE,
        medicineData,
        medicineId,
        token
    }
}

export const editMedicineStart = () => {
    return {
        type: actionTypes.EDIT_MEDICINE_START
    }
}

export const editMedicineSuccess = () => {
    return {
        type: actionTypes.EDIT_MEDICINE_SUCCESS
    }
}


export const editMedicineFail = error => {
    return {
        type: actionTypes.EDIT_MEDICINE_FAIL,
        error
    }
}

export const deleteMedicine = (medicineId, token) => {
    return {
        type: actionTypes.DELETE_MEDICINE,
        medicineId,
        token
    }
}
