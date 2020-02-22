import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth, authDismissError } from '../../../store/actions';
import { connect } from 'react-redux';
import CustomModal from '../../../components/CustomModal/CustomModal';

/**********************
 * ********************
 * ********************
 * Please Refactor this code as there is many duplicate functionalities 
 * ********************
 * ********************
 **********************/


class Signup extends Component{
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyType: '',
        companyName: '',
        companyAddress: '',
        companyNumber: '',
        errors: {
            name: {
                touched: false,
                message: '',
                error: true
            },
            email: {
                touched: false,
                message: '',
                error: true
            },
            password: {
                touched: false,
                message: '',
                error: true
            },
            confirmPassword: {
                touched: false,
                message: '',
                error: true
            },
            companyType: {
                touched: false,
                message: '',
                error: true
            },
            companyName: {
                touched: false,
                message: '',
                error: true
            },
            companyAddress: {
                touched: false,
                message: '',
                error: true
            },
            companyNumber: {
                touched: false,
                message: '',
                error: true
            }
        }
    }
    selectChangedHandler = event => {
        if(event.target.value.length !== 8){
            this.setState({companyType: event.target.value, errors: {...this.state.errors, companyType: {error: true, touched: true, message: 'Please choose your company type.'}}});
        }else{
            this.setState({companyType: event.target.value, errors: {...this.state.errors, companyType: {error: false, touched: true, message: ''}}});
        }
    }
    setName = (event) =>{
        if(event.target.value.length <= 25 && event.target.value.length >= 6){
            this.setState({name: event.target.value, errors: {...this.state.errors, name: {error: false, touched: true, message: ''}}});
        }else{
            this.setState({name: event.target.value, errors: {...this.state.errors, name: {error: true, touched: true, message: 'Please enter your full name that consists of 6 to 25 charcters'}}});
        }
    }
    
    setEmail = (event) =>{
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(event.target.value.length <= 50 && event.target.value.length >= 6 && emailRegex.test(event.target.value)){
            this.setState({email: event.target.value, errors: {...this.state.errors, email: {error: false, touched: true, message: ''}}});
        }else{
            this.setState({email: event.target.value, errors: {...this.state.errors, email: {error: true, touched: true, message:'Please enter a valid email that consists of 6 to 50 characters.'}}});
        }
    }
    setPassword = (event) =>{
        if(event.target.value.length <= 25 && event.target.value.length >= 6){
            this.setState({password: event.target.value, errors: {...this.state.errors, password: {error: false, touched: true, message: ''}}});
        }else{
            this.setState({password: event.target.value, errors: {...this.state.errors, password: {error: true, touched: true, message: 'Please enter a password that consists of 6 to 25 charcters'}}});
        }
    }
    
    setConfirmPassword = (event) =>{
        if(event.target.value !== this.state.password){
            this.setState({confirmPassword: event.target.value, errors: {...this.state.errors, confirmPassword: {error: true, touched: true, message: 'Passwords dont match'}}});
        }else{
            this.setState({confirmPassword: event.target.value, errors: {...this.state.errors, confirmPassword: {error: false, touched: true, message: ''}}});
        }
    }

    
    setCompanyName = (event) =>{
        if(event.target.value.length <= 25 && event.target.value.length >= 6){
            this.setState({companyName: event.target.value, errors: {...this.state.errors, companyName: {error: false, touched: true, message: ''}}});
        }else{
            this.setState({companyName: event.target.value, errors: {...this.state.errors, companyName: {error: true, touched: true, message: 'Please enter your company name that consists of 6 to 25 charcters'}}});
        }
    }
    
    setCompanyAddress = (event) =>{
        if(event.target.value.length <= 25 && event.target.value.length >= 6){
            this.setState({companyAddress: event.target.value, errors: {...this.state.errors, companyAddress: {error: false, touched: true, message: ''}}});
        }else{
            this.setState({companyAddress: event.target.value, errors: {...this.state.errors, companyAddress: {error: true, touched: true, message: 'Please enter your company address that consists of 6 to 25 charcters'}}});
        }
    }
    
    setCompanyNumber = (event) =>{
        if(event.target.value.length <= 25 && event.target.value.length >= 4){
            this.setState({companyNumber: event.target.value, errors: {...this.state.errors, companyNumber: {error: false, touched: true, message: ''}}});
        }else{
            this.setState({companyNumber: event.target.value, errors: {...this.state.errors, companyNumber: {error: true, touched: true, message: 'Please enter your company number that consists of 4 to 25 charcters'}}});
        }
    }
    submitHandler = event =>{
        event.preventDefault();
        this.props.onSignup({...this.state})
    }
    handleModalClose = () => {
        this.props.onDismissError();
    }
    render(){
        let isDisabled;
        const errors = {...this.state.errors};
        for(let inputType in errors){
            if(errors[inputType].error){
                isDisabled = true;
                break; 
            }else{
                isDisabled = false;
            }
        }
        let button = <Button className="primary" type="submit">Register</Button>
        if(this.props.requestLoading){
            button = <Button className="primary" disabled><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp; Loading</Button>
        }
        if(isDisabled){
            button = <Button className="primary" disabled>Register</Button>;
        }
        return(
            <div>
              <CustomModal show={this.props.requestError ? true : false} handleClose={this.handleModalClose} modalBody={this.props.requestError} />
                <p className="lead">Complete Form To Register:</p>
                <Form onSubmit={this.submitHandler}>
                    <Form.Group>
                        <Form.Control className={errors.name.error && errors.name.touched ? 'is-invalid' : ''} type="text" placeholder="Your Fullname" value={this.state.name} onChange={this.setName} />
                            <p className={errors.name.error && errors.name.touched ? 'invalid-feedback' : ''}>{errors.name.message}</p>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="email" className={errors.email.error && errors.email.touched ? 'is-invalid' : ''} placeholder="Your Email" value={this.state.email} onChange={this.setEmail} />
                        <p className={errors.email.error && errors.email.touched ? 'invalid-feedback' : ''}>{errors.email.message}</p>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="password" className={errors.password.error && errors.password.touched ? 'is-invalid' : ''} placeholder="Choose a Password" value={this.state.password} onChange={this.setPassword} />
                        <p className={errors.password.error && errors.password.touched ? 'invalid-feedback' : ''}>{errors.password.message}</p>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="password" className={errors.confirmPassword.error && errors.confirmPassword.touched ? 'is-invalid' : ''} placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.setConfirmPassword} />
                        <p className={errors.confirmPassword.error && errors.confirmPassword.touched ? 'invalid-feedback' : ''}>{errors.confirmPassword.message}</p>
                    </Form.Group>
                    <Form.Group>
                        <select placeholder="Your Role" className={errors.companyType.error && errors.companyType.touched ? 'form-control is-invalid' : 'form-control'}onChange={this.selectChangedHandler}>
                            <option value="">(Please Choose Your Business Type)</option>
                            <option value="pharmacy">Pharmacy</option>
                            <option value="supplier">Supplier</option>
                        </select>
                        <p className={errors.companyType.error && errors.companyType.touched ? 'invalid-feedback' : ''}>{errors.companyType.message}</p>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" className={errors.companyName.error && errors.companyName.touched ? 'is-invalid' : ''} placeholder="Business Name" value={this.state.companyName} onChange={this.setCompanyName} />
                        <p className={errors.companyName.error && errors.companyName.touched ? 'invalid-feedback' : ''}>{errors.companyName.message}</p>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" className={errors.companyAddress.error && errors.companyAddress.touched ? 'is-invalid' : ''} placeholder="Business Address" value={this.state.companyAddress} onChange={this.setCompanyAddress} />
                        <p className={errors.companyAddress.error && errors.companyAddress.touched ? 'invalid-feedback' : ''}>{errors.companyAddress.message}</p>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" className={errors.companyNumber.error && errors.companyNumber.touched ? 'is-invalid' : ''} placeholder="Business Number" value={this.state.companyNumber} onChange={this.setCompanyNumber} />
                        <p className={errors.companyNumber.error && errors.companyNumber.touched ? 'invalid-feedback' : ''}>{errors.companyNumber.message}</p>
                    </Form.Group>
                    <Form.Group>
                        {button}
                    </Form.Group>
                </Form>
                <p>Already have an account? <Link to="login">Login</Link></p>
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
        onSignup: (authData) => dispatch(auth(authData, "signup")),
        onDismissError: () => dispatch(authDismissError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);