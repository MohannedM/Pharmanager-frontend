import {put, delay} from 'redux-saga/effects';
import {authStart, authFail, authSuccess, authClear, authLogout, authTimeout} from '../actions';
import axios from 'axios';

export function* authSaga(action){
    yield put(authStart());
    const authData = {...action.authData, errors: null}
    try{
        const response = yield axios.post("http://localhost:8080/" + action.authRoute, authData)
        yield put(authSuccess(response.data.userData));
        yield localStorage.setItem("token", response.data.userData.token);
        yield localStorage.setItem("name", response.data.userData.name);
        yield localStorage.setItem("email", response.data.userData.email);
        yield localStorage.setItem("companyType", response.data.userData.companyType);
        yield localStorage.setItem("companyName", response.data.userData.companyName);
        yield localStorage.setItem("companyAddress", response.data.userData.companyAddress);
        yield localStorage.setItem("companyNumber", response.data.userData.companyNumber);
        const expirationTime = yield new Date().getTime() + (3600 * 1000);
        yield localStorage.setItem("expirationTime", expirationTime);
        yield put(authTimeout(expirationTime));

    }catch(error){
        yield put(authFail(error.response.data.message));
    }
}

export function* logoutSaga(action){
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("name");
    yield localStorage.removeItem("email");
    yield localStorage.removeItem("companyType");
    yield localStorage.removeItem("companyName");
    yield localStorage.removeItem("companyAddress");
    yield localStorage.removeItem("companyNumber");
    yield localStorage.removeItem("expirationTime");
    yield put(authClear());
}

export function* authInitSaga(action){
    const expirationTime = yield localStorage.getItem("expirationTime"); 
    const currentTime = yield new Date().getTime();
    if(+expirationTime > currentTime){
        const token = yield localStorage.getItem("token");
        const name = yield localStorage.getItem("name");
        const email = yield localStorage.getItem("email");
        const companyType = yield localStorage.getItem("companyType");
        const companyName = yield localStorage.getItem("companyName");
        const companyAddress = yield localStorage.getItem("companyAddress");
        const companyNumber = yield localStorage.getItem("companyNumber");
        yield put(authSuccess({
            token,
            name,
            email,
            companyType,
            companyName,
            companyAddress,
            companyNumber
        }));
        yield put(authTimeout(+expirationTime));
    }else{
        yield put(authLogout());
    }
}

export function* authTimeoutSaga(action){
    const currentTime = yield new Date().getTime();
    yield delay(action.expirationTime - currentTime);
    yield put(authLogout());
}