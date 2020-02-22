import * as actionTypes from './actionTypes';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = authData => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        authData
    }
}
export const authFail = error => {
    return{
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const auth = (authData, authRoute) => {
    return{
        type: actionTypes.AUTH,
        authData,
        authRoute
    }
}


export const authDismissError = () => {
    return{
        type: actionTypes.AUTH_DISMISS_ERROR
    }
}

export const authLogout = () => {
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authClear = () => {
    return{
        type: actionTypes.AUTH_CLEAR
    }
}

export const authInit = () => {
    return{
        type: actionTypes.AUTH_INIT
    }
}

export const authTimeout = (expirationTime) => {
    return{
        type: actionTypes.AUTH_TIMEOUT,
        expirationTime
    }
}