import React, {Component} from 'react';
import {Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth, authDismissError } from '../../../store/actions';
import { connect } from 'react-redux';
import CustomModal from '../../../components/CustomModal/CustomModal';

class Login extends Component{
            
    setEmail = (event) =>{
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(event.target.value.length <= 50 && event.target.value.length >= 6 && emailRegex.test(event.target.value)){
            this.setState({email: {...this.state.email, value: event.target.value, touched: true, error: false}});
        }else{
            this.setState({email: {...this.state.email, value: event.target.value, touched: true, error: true,  message:'Please enter a valid email that consists of 6 to 50 characters.'}});
        }
    }
    setPassword = (event) =>{
        if(event.target.value.length <= 25 && event.target.value.length >= 6){
            this.setState({password: {...this.state.password, value: event.target.value, touched: true, error: false, message: ''}});
        }else{
            this.setState({password: {...this.state.password, value: event.target.value, touched: true, error: true, message: 'Please enter a password that consists of 6 to 25 charcters'}});
        }
    }
    state = {
        email:{
            placeholder: 'Enter Your Email',
            type: 'email',
            value: '',
            touched: false,
            message: '',
            error: true,
            changeHandler: (event) => this.setEmail(event)
        },
        password:{
            placeholder: 'Enter Your Password',
            type: 'password',
            value: '',
            touched: false,
            message: '',
            error: true,
            changeHandler: (event) => this.setPassword(event)
        }
    }

    
    submitHandler = event =>{
        event.preventDefault();
        this.props.onSignup({email: this.state.email.value, password: this.state.password.value})
    }
    
    handleModalClose = () => {
        this.props.onDismissError();
    }

    render(){
        const inputs = {...this.state}
        const inputsArray = [];
        for(let input in inputs){
            inputsArray.push(inputs[input])
        }
        let inputElements = inputsArray.map(inputEl => {
            return (<Form.Group key={inputEl.placeholder}>
                <Form.Control type={inputEl.type} className={inputEl.error && inputEl.touched ? 'is-invalid' : ''} onChange={inputEl.changeHandler} placeholder={inputEl.placeholder} />
                {inputEl.error && inputEl.touched ? <p className="invalid-feedback">{inputEl.message}</p> : null}
            </Form.Group>);
        })

        let isDisabled;
        for(let inputType in inputs){
            if(inputs[inputType].error){
                isDisabled = true;
                break; 
            }else{
                isDisabled = false;
            }
        }

        let button = <Button className="primary" type="submit">Login</Button>
        if(this.props.requestLoading){
            button = <Button className="primary" disabled><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp; Loading</Button>
        }
        if(isDisabled){
            button = <Button className="primary" disabled>Login</Button>;
        }
        return(
            <div>
                <CustomModal show={this.props.requestError ? true : false} handleClose={this.handleModalClose} modalBody={this.props.requestError} />
                <p className="lead">Enter you credentials to login:</p>
                <Form onSubmit={this.submitHandler}>
                    {inputElements}
                    <Form.Group>
                        {button}
                    </Form.Group>
                </Form>
                <p>Not a member? <Link to="/signup">Register</Link></p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        requestError: state.auth.error,
        requestLoading: state.auth.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSignup: (authData) => dispatch(auth(authData, "login")),
        onDismissError: () => dispatch(authDismissError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);