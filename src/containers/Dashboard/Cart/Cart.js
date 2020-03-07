import React, {Component} from 'react';
import { connect } from 'react-redux';
import MedicineCard from '../../../components/MedicineCard/MedicineCard';
import { Row, Col } from 'react-bootstrap';
import { getMedicinesMarket, marketMedicinesDismissError, marketPageChanged } from '../../../store/actions';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import CustomModal from '../../../components/CustomModal/CustomModal';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Pagination from '../../../components/Pagination/Pagination';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import { addToCart, clearModalData, deleteCartItem } from '../../../store/actions';

class Cart extends Component{

    state = {
        showMedicineModal: false,
        currentMedicine: null
    }

    handleModalClose = () => {
        this.props.onDismissError();
    }


    deleteMedicineHandler = (medicine) =>{
        this.setState({showMedicineModal: true});
        this.setState({currentMedicine: medicine});
    }
    
    handleModalClose = () => {
        this.setState({showMedicineModal: false});
        this.setState({currentMedicine: null});
        this.props.onClearModalData();
    }

    deleteMedicine = () => {
        this.props.onDeleteMedicine(this.props.token, this.state.currentMedicine._id);
    }

    render(){
        const cartMedicines = this.props.cartMedicines.map(medicine=>{
            return(
                <Col  key={medicine._id} className="m-3" xs={12} lg={3}>
                    <MedicineCard 
                    companyType={this.props.companyType}
                    cart
                    user={medicine.user}
                    medicine={medicine.medicine} 
                    deleteMedicineClicked={()=>this.deleteMedicineHandler(medicine)}
                    show={this.state.showMedicineModal}
                    ></MedicineCard>
                </Col>
            )
        })
        let spinner = <LoadingSpinner />;
        if(!this.props.isLoading){
            spinner = null;
        }
        return(
            <Auxiliary>
                <Row>
                    <CustomModal show={this.props.reqError ? true : false} handleClose={this.handleModalClose} modalBody={this.props.reqError} />
                    {cartMedicines}
                    {spinner}
                    <DeleteModal medicine={this.state.currentMedicine} show={this.state.showMedicineModal}  handleClose={this.handleModalClose} deleteCartItem={this.deleteMedicine}  />
                </Row>
            </Auxiliary>
        );
    }
}
const mapStateToProps = state => {
    return {
        cartMedicines: state.cart.cart,
        isLoading: state.cart.loading,
        token: state.auth.token,
        companyType: state.auth.companyType,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddMedicine: (token, medicineId, quantity) => dispatch(addToCart(token, medicineId, quantity)),
        onClearModalData: () => dispatch(clearModalData()),
        onDeleteMedicine: (token, cartItemId) => dispatch(deleteCartItem(token, cartItemId)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);