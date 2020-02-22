import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    name: null,
    email: null,
    companyType: null,
    companyName: null,
    companyAddress: null,
    companyNumber: null,
    loading: false,
    error: null
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.AUTH_DISMISS_ERROR:
            return {
                ...state,
                error: null
            }
        case actionTypes.AUTH_START:
            return {...state, loading: true}
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.authData.token,
                name: action.authData.name,
                email: action.authData.email,
                companyType: action.authData.companyType,
                companyName: action.authData.companyName,
                companyAddress: action.authData.companyAddress,
                companyNumber: action.authData.companyNumber,
                loading: false
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.AUTH_CLEAR:
            return{
                ...state,
                token: null,
                name: null,
                email: null,
                companyType: null,
                companyName: null,
                companyAddress: null,
                companyNumber: null
            }
        default: 
            return state;
    }
}

export default reducer;