import * as actionTypes from '../actions/actionTypes';

const initialState = {
    medicines: [],
    loading: false,
    page: 1,
    totalMedicinesCount: null,
    orders: [],
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_MEDICINES_MARKET_START:
            return{
                ...state,
                medicines: [],
                loading: true
            }
        case actionTypes.GET_MEDICINES_MARKET_SUCCESS:
            return{
                ...state,
                medicines: state.medicines.concat(action.medicines),
                totalMedicinesCount: action.totalMedicinesCount,
                page: action.page,
                loading: false
            }
        case actionTypes.GET_MEDICINES_MARKET_FAIL:
            return{
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.MARKET_MEDICINES_DISMISS_ERROR:
            return{
                ...state,
                error: null
            }
        case actionTypes.ORDER_MEDICINES_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.ORDER_MEDICINES_SUCCESS:
            return{
                ...state,
                loading: false
            }
        case actionTypes.ORDER_MEDICINES_FAIL:
            return{
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.GET_MEDICINES_MARKET_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.GET_ORDERS_SUCCESS:
            return{
                ...state,
                loading: false,
                orders: action.orders
            }
        case actionTypes.GET_ORDERS_FAIL:
            return{
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.AUTH_CLEAR:
            return{
                medicines: [],
                orders: [],
                loading: false,
                page: 1,
                totalMedicinesCount: null,
                error: null
            }
        default: return state;
    }
}

export default reducer;