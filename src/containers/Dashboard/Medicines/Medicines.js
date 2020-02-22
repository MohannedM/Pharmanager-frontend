import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import MedicineCard from '../../../components/MedicineCard/MedicineCard';
import { medicinesReached, getMedicines, medicinesDismissError } from '../../../store/actions';
import { connect } from 'react-redux';
import CustomModal from '../../../components/CustomModal/CustomModal';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';


class Medicines extends Component{
    componentDidMount(){
        this.props.onMedicinesReached();
        if(this.props.isFirstLoad){
            this.props.onGetMedicines(this.props.token);
        }
    }

            
    handleModalClose = () => {
        this.props.onDismissError();
    }

    render(){
        const medicineComponents = this.props.medicines.map(medicine=>{
            return(
                <Col  key={medicine._id} className="m-3" xs={12} lg={3}>
                    <MedicineCard medicine={medicine}></MedicineCard>
                </Col>

            )
        });
        let spinner = <LoadingSpinner />;
        if(!this.props.isLoading){
            spinner = null;
        }
        return(
            <Row>
                <CustomModal show={this.props.isError ? true : false} handleClose={this.handleModalClose} modalBody={this.props.isError} />
                {spinner}
                {medicineComponents}
            </Row>
        );
    }
} 

const mapStateToProps = state => {
    return{
        medicines: state.medicines.medicines,
        isFirstLoad: state.medicines.isFirstLoad,
        isLoading: state.medicines.loading,
        isError: state.medicines.error,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onMedicinesReached: () => dispatch(medicinesReached()),
        onGetMedicines: (token) => dispatch(getMedicines(token)),
        onDismissError: () => dispatch(medicinesDismissError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Medicines);