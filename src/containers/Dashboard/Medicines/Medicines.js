import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import MedicineCard from '../../../components/MedicineCard/MedicineCard';
import { medicinesReached, getMedicines, medicinesDismissError, editMedicineFeilds, deleteMedicine } from '../../../store/actions';
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

    editMedicineHandler = medicineData => {
        this.props.onEditMedicineFields(medicineData);
        this.props.history.push("/medicines/edit");
    }

    deleteMedicineHandler = (medicineId, userMedicineId) => {
        this.props.onDeleteMedicine(medicineId, userMedicineId, this.props.token)
    }

    render(){
        const medicineComponents = this.props.medicines.map(medicine=>{
            return(
                <Col  key={medicine._id} className="m-3" xs={12} lg={3}>
                    <MedicineCard 
                    companyType={this.props.companyType}
                    medicine={medicine} 
                    editMedicineClicked={()=>this.editMedicineHandler(medicine)}
                    deleteMedicineClicked={()=>this.deleteMedicineHandler(medicine._id, medicine.userMedicineId)} 
                    ></MedicineCard>
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
        companyType: state.auth.companyType,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onMedicinesReached: () => dispatch(medicinesReached()),
        onGetMedicines: (token) => dispatch(getMedicines(token)),
        onDismissError: () => dispatch(medicinesDismissError()),
        onEditMedicineFields: (medicineData) => dispatch(editMedicineFeilds(medicineData)),
        onDeleteMedicine: (medicineId, userMedicineId, token)  => dispatch(deleteMedicine(medicineId, userMedicineId, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Medicines);