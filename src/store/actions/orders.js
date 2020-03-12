import * as actionTypes from './actionTypes';

export const getMedicinesMarket = (token, page) => {
    return{
        type: actionTypes.GET_MEDICINES_MARKET,
        page,
        token
    }
}

export const getMedicinesMarketStart = () => {
    return{
        type: actionTypes.GET_MEDICINES_MARKET_START
    }
}

export const getMedicinesMarketSuccess = (medicines, totalMedicinesCount, page) => {
    return{
        type: actionTypes.GET_MEDICINES_MARKET_SUCCESS,
        medicines,
        totalMedicinesCount,
        page
    }
}

export const getMedicinesMarketFail = error => {
    return{
        type: actionTypes.GET_MEDICINES_MARKET_FAIL,
        error
    }
}

export const marketMedicinesDismissError = () => {
    return{
        type: actionTypes.MARKET_MEDICINES_DISMISS_ERROR
    }
}

export const marketPageChanged = (token, page) =>{
    return{
        type: actionTypes.MARKET_PAGE_CHANGED,
        token,
        page
    }
}

export const orderMedicines = (token, cartId) =>{
    return{
        type: actionTypes.ORDER_MEDICINES,
        token,
        cartId
    }
}

export const orderMedicinesStart = () => {
    return{
        type: actionTypes.ORDER_MEDICINES_START
    }
}

export const orderMedicinesFail = (error) => {
    return{
        type: actionTypes.ORDER_MEDICINES_FAIL,
        error
    }
}

export const orderMedicinesSucces = () => {
    return{
        type: actionTypes.ORDER_MEDICINES_SUCCESS
    }
}