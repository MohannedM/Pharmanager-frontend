import React, {Component} from 'react';
import {Form, Button } from 'react-bootstrap';
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import { createMedicine, medicinesDismissError } from '../../../../store/actions';
import { Redirect } from 'react-router-dom';
import CustomModal from '../../../../components/CustomModal/CustomModal';


class AddMedicine extends Component{
        setName = (event) =>{
            if(event.target.value.length <= 25 && event.target.value.length >= 4){
                this.setState({name: {...this.state.name, value: event.target.value, touched: true, error: false}});
            }else{
                this.setState({name: {...this.state.name, value: event.target.value, touched: true, error: true,  message:'Please enter a valid name that consists of 4 to 25 characters.'}});
            }
        }
        setDescription = (event) =>{
            if(event.target.value.length <= 120 && event.target.value.length >= 10){
                this.setState({description: {...this.state.description, value: event.target.value, touched: true, error: false, message: ''}});
            }else{
                this.setState({description: {...this.state.description, value: event.target.value, touched: true, error: true, message: 'Please enter a description that consists of 10 to 120 charcters'}});
            }
        }  
        setExpirationDate = (event) =>{
            if(event.target.value.length <= 25 && event.target.value.length >= 1){
                this.setState({expirationDate: {...this.state.expirationDate, value: event.target.value, touched: true, error: false, message: ''}});
            }else{
                this.setState({expirationDate: {...this.state.expirationDate, value: event.target.value, touched: true, error: true, message: 'Please choose an expiration date.'}});
            }
        }
        setQuantity = (event) =>{
            if(event.target.value.length <= 10 && event.target.value.length >= 1){
                this.setState({quantity: {...this.state.quantity, value: event.target.value, touched: true, error: false, message: ''}});
            }else{
                this.setState({quantity: {...this.state.quantity, value: event.target.value, touched: true, error: true, message: 'Please enter a quantity of 1 to 10 characters.'}});
            }
        }
        setPrice = (event) =>{
            if(event.target.value.length <= 10 && event.target.value.length >= 1){
                this.setState({price: {...this.state.price, value: event.target.value, touched: true, error: false, message: ''}});
            }else{
                this.setState({price: {...this.state.price, value: event.target.value, touched: true, error: true, message: 'Please enter a price of 1 to 10 charcters'}});
            }
        }
        state = {
            name:{
                placeholder: 'Enter Medicine Name',
                type: 'text',
                value: '',
                touched: false,
                message: '',
                error: true,
                changeHandler: (event) => this.setName(event)
            },
            description:{
                placeholder: 'Enter Short Medicine Description',
                type: 'text',
                value: '',
                touched: false,
                message: '',
                error: true,
                changeHandler: (event) => this.setDescription(event)
            },
            expirationDate:{
                placeholder: 'Enter Medicine\'s Expiration Date',
                type: 'date',
                value: '',
                touched: false,
                message: '',
                error: true,
                changeHandler: (event) => this.setExpirationDate(event)
            },
            quantity:{
                placeholder: 'Enter Medicines Quantity',
                type: 'number',
                value: '',
                touched: false,
                message: '',
                error: true,
                changeHandler: (event) => this.setQuantity(event)
            },
            price:{
                placeholder: 'Enter Medicine\'s Price',
                type: 'number',
                value: '',
                touched: false,
                message: '',
                error: true,
                changeHandler: (event) => this.setPrice(event)
            }
        }
    
        
        submitHandler = event =>{
            event.preventDefault();
            const medicineData = {
                name: this.state.name.value,
                description: this.state.description.value,
                expirationDate: this.state.expirationDate.value,
                quantity: this.state.quantity.value,
                price: this.state.price.value
            }
            this.props.onCreateMedicine(medicineData, this.props.token);
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
                    <Form.Label>{inputEl.placeholder}</Form.Label>
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
    
            let button = <Button className="primary" type="submit">Add Medicine</Button>
            if(this.props.isAddLoading){
                button = <Button className="primary" disabled><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp; Loading</Button>
            }
            if(isDisabled){
                button = <Button className="primary" disabled>Add Medicine</Button>;
            }
            let redirectToAll = null;
            if(this.props.isRedirect){
                redirectToAll = <Redirect to="/medicines" />
            }
            return(
                <Auxiliary>
                    {redirectToAll}
                    <CustomModal show={this.props.requestError ? true : false} handleClose={this.handleModalClose} modalBody={this.props.requestError} />
                    <p className="lead">Add Medicine:</p>
                    <Form onSubmit={this.submitHandler}>
                        {inputElements}
                        <Form.Group>
                            {button}
                        </Form.Group>
                    </Form>
                </Auxiliary>
            );
        }
}
const mapStateToProps = state => {
    return{
        token: state.auth.token,
        isAddLoading: state.medicines.loading,
        isRedirect: state.medicines.redirect,
        requestError: state.medicines.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateMedicine: (medicineData, token) => dispatch(createMedicine(medicineData, token)),
        onDismissError: () => dispatch(medicinesDismissError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMedicine);