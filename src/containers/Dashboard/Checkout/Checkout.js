import React, {Component} from 'react';
import ItemDetails from '../../../components/ItemDetails/ItemDetails';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { orderMedicines, marketMedicinesDismissError } from '../../../store/actions';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { Redirect } from 'react-router-dom';
import CustomModal from '../../../components/CustomModal/CustomModal';

class Checkout extends Component{
    render(){

        let totalPrice = 0;

        let body = <Redirect to="/medicines" />;

        if(this.props.cart){
            this.props.cart.medicines.forEach(medicine=>{
                totalPrice += medicine.quantity * medicine.medicine.price;
            });
            body = (        
            <Auxiliary>
                <CustomModal show={this.props.reqError ? true : false} handleClose={()=>this.props.onDismissError()} modalBody={this.props.reqError} />
                <ItemDetails item={this.props.cart} totalPrice={totalPrice} />
                <button className="btn btn-primary" onClick={()=>this.props.onOrderMedicines(this.props.token, this.props.cart._id)}>Complete Order</button>
            </Auxiliary>)
        }
        if(this.props.loading){
            body = <LoadingSpinner />
        }
        return (
        <Row>
            <Col>
                {body}
            </Col>
        </Row>
        );
        
    }
}

const mapStateToProps = state => {
    return{
        cart: state.cart.cart,
        token: state.auth.token,
        loading: state.orders.loading,
        reqError: state.orders.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderMedicines: (token, cartId) => dispatch(orderMedicines(token, cartId)),
        onDismissError: () => dispatch(marketMedicinesDismissError()) 
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Checkout);