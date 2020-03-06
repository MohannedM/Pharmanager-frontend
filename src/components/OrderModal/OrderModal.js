import React, {Component} from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from 'react-redux';
import { addToCart, clearModalData, deleteCartItem } from '../../store/actions';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

class AddModal extends Component{
    state = {
        quantity: {
            error: false,
            touched: false,
            value: 1,
            message: ''
        }
    }

    handlModalHide = () => {
        this.props.handleClose();
        this.setState({quantity:{error: false, touched: false, value: 1, message: ''}});
        this.props.onClearModalData();
    }

    handleAddMedicine = () => {
        this.props.onAddMedicine(this.props.token, this.props.medicine._id, this.state.quantity.value);
    }

    handleDeleteMedicine = () => {
        this.props.onDeleteMedicine(this.props.token, this.props.cartItem._id);
        if(!this.props.loading){
            this.props.handleClose();
            this.props.onClearModalData();
        }
    }

    quantityChangeHandler = event => {
        if(+event.target.value <= +this.props.medicine.quantity && +event.target.value >= 1){
            this.setState({quantity: {...this.state.quantity, value: event.target.value, touched: true, error: false, message: ''}});
        }else{
            this.setState({quantity: {...this.state.quantity, value: event.target.value, touched: true, error: true, message: 'Please enter a quantity more than 1 and less than the suppliers\'s medicines quantity'}});
        }
    }
    render(){
        let buttons = (
            <Auxiliary>
                    <Button variant="primary" onClick={this.handleAddMedicine}>
                        Add Medicine(s)
                    </Button>
                    <Button variant="secondary" onClick={this.handlModalHide}>
                        Close
                    </Button>
            </Auxiliary>
        );
        if(this.props.cart){
            buttons = (
                <Auxiliary>
                        <Button variant="danger" onClick={this.handleDeleteMedicine}>
                            Delete Medicine(s)
                        </Button>
                        <Button variant="secondary" onClick={this.handlModalHide}>
                            Close
                        </Button>
                </Auxiliary>
            );
        }
        let body = (
            <Auxiliary>
                <Modal.Body>
                        {this.props.cart ? <h6 className="text-warning">Are you sure youe want to delete this medicine?</h6> : ( <Form.Group>
                        <Form.Label>Quantity:</Form.Label>
                        <Form.Control type="number" className={this.state.quantity.error && this.state.quantity.touched ? 'is-invalid' : ''} value={this.state.quantity.value} onChange={this.quantityChangeHandler} placeholder="Quantity" />
                        {this.state.quantity.error && this.state.quantity.touched ? <p className="invalid-feedback">{this.state.quantity.message}</p> : null}
                    </Form.Group> )}
                    </Modal.Body>
                    <Modal.Footer>
                    {buttons}
                </Modal.Footer>
            </Auxiliary>
        );
        if(this.props.loading){
            body = (
                <Auxiliary>
                    <Modal.Body>
                        <LoadingSpinner />
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick={this.handleAddMedicine} disabled>
                            Add Medicine(s)
                        </Button>
                        <Button variant="secondary" onClick={this.handlModalHide}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Auxiliary>
            );
        }
        if(this.props.error || this.props.successMessage){
            body = (
                <Auxiliary>
                    <Modal.Body>
                        {this.props.error ? <p className="text-danger">{this.props.error}</p> : <p className="text-primary">{this.props.successMessage}</p>}
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick={this.handleAddMedicine} disabled>
                            Add Medicine(s)
                        </Button>
                        <Button variant="secondary" onClick={this.handlModalHide}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Auxiliary>
            );
        }
        return(
            <Modal show={this.props.show} onHide={this.handlModalHide}>
                {body}
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        loading: state.cart.loading,
        error: state.cart.error,
        successMessage: state.cart.successMessage
    }
} 

const mapDispatchToProps = dispatch => {
    return{
        onAddMedicine: (token, medicineId, quantity) => dispatch(addToCart(token, medicineId, quantity)),
        onClearModalData: () => dispatch(clearModalData()),
        onDeleteMedicine: (token, cartItemId) => dispatch(deleteCartItem(token, cartItemId)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);