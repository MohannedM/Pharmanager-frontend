import React, {Component} from 'react';
import { connect } from 'react-redux';
import MedicineCard from '../../../components/MedicineCard/MedicineCard';
import { Row, Col } from 'react-bootstrap';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import CustomModal from '../../../components/CustomModal/CustomModal';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import { addToCart, clearModalData, deleteCartItem } from '../../../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

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
        const cartMedicines = this.props.cartMedicines.medicines.map(medicine=>{
            return(
                <Col  key={medicine._id} className="m-3" xs={12} lg={3}>
                    <MedicineCard 
                    companyType={this.props.companyType}
                    cart
                    user={medicine.user}
                    medicine={medicine.medicine} 
                    quantity={medicine.quantity}
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
                    <Col sm={12}>
                        {this.props.cartMedicines.medicines.length > 0 ? <Link to="/checkout" className="d-sm-inline-block btn btn-sm btn-primary shadow-sm">Proceed to checkout <FontAwesomeIcon icon={faArrowRight} /></Link> : <p className="display-4">No products in cart</p>}
                    </Col>
                </Row>
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
        cartMedicines: state.cart.cart ? state.cart.cart : {medicines:[]},
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