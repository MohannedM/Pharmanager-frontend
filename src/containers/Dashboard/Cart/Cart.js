import React, {Component} from 'react';
import { connect } from 'react-redux';
import MedicineCard from '../../../components/MedicineCard/MedicineCard';
import { Row, Col } from 'react-bootstrap';
import { getMedicinesMarket, marketMedicinesDismissError, marketPageChanged } from '../../../store/actions';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import CustomModal from '../../../components/CustomModal/CustomModal';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Pagination from '../../../components/Pagination/Pagination';
import OrderModal from '../../../components/OrderModal/OrderModal';

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
                    <OrderModal medicine={this.state.currentMedicine} show={this.state.showMedicineModal} cart handleClose={this.handleModalClose} cartItem={this.state.currentMedicine}  />
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
        reqError: state.cart.error
    }
}

const mapDispatchToProps = dispatch => {
    return{

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);