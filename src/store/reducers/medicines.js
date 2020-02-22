import * as actionTypes from '../actions/actionTypes';
const initalState = {
    medicines: [],
    loading: false,
    error: null,
    redirect: false,
    isFirstLoad: true
}

const reducer = (state = initalState, action)=>{
    switch(action.type){
        case actionTypes.CREATE_MEDICINE_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.CREATE_MEDICINE_SUCCESS:
            return{
                ...state,
                loading: false,
                medicines: state.medicines.concat(action.medicineData),
                redirect: true
            }
        case actionTypes.CREATE_MEDICINE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.MEDICINES_DISMISS_ERROR:
            return{
                ...state,
                error: null
            }
        case actionTypes.MEDICINES_REACHED:
            return{
                ...state,
                redirect: false
            }
        case actionTypes.GET_MEDICINES_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.GET_MEDICINES_SUCCESS:
            return{
                ...state,
                loading: false,
                medicines: [...state.medicines, ...action.medicines],
                isFirstLoad: false
            }
        case actionTypes.GET_MEDICINES_FAIL:
            return{
                ...state,
                loading: false,
                error: action.error
            }
        default: return state;
    }
}

export default reducer;