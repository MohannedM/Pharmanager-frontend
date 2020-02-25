import * as actionTypes from '../actions/actionTypes';

const initialState = {
    medicines: [],
    cart: [],
    loading: false,
    page: 1,
    totalMedicinesCount: null,
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
        default: return state;
    }
}

export default reducer;