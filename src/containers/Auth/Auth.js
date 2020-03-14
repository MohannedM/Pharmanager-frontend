import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import AuthLayout from '../../hoc/Layouts/AuthLayout/AuthLayout';
import { connect } from 'react-redux';
const Signup = asyncComponent(()=>{
    return import('./Signup/Signup');
});
const Login = asyncComponent(()=>{
    return import('./Login/Login');
});


class Auth extends Component{
    render(){
        return(
            <AuthLayout>
            <h1 className="display-4 my-3">Welcome To PharManager</h1>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                </Switch>
                    {this.props.token ? <Redirect to="/" /> : null}
            </AuthLayout>
        );
    }
}
const mapStateToProps = state => {
    return{
        token: state.auth.token
    }
}
export default connect(mapStateToProps)(Auth);