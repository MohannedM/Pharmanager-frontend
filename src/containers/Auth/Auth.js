import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import AuthLayout from '../../hoc/Layouts/AuthLayout/AuthLayout';
const Signup = asyncComponent(()=>{
    return import('./Signup/Signup');
});
const Login = asyncComponent(()=>{
    return import('./Login/Login');
});


const Auth = props =>{
    return(
        <AuthLayout>
        <h1 className="display-4 my-3">Welcome To PharManager</h1>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </AuthLayout>
    );
}

export default Auth;