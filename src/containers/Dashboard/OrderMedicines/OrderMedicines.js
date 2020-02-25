import React, {Component} from 'react';
import { connect } from 'react-redux';
import MedicineCard from '../../../components/MedicineCard/MedicineCard';
import { Row, Col } from 'react-bootstrap';
import { getMedicinesMarket, marketMedicinesDismissError } from '../../../store/actions';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import CustomModal from '../../../components/CustomModal/CustomModal';

class OrderMedicine extends Component{

    componentDidMount(){
        this.props.onGetMedicines(this.props.token, this.props.page);
    }
    handleModalClose = () => {
        this.props.onDismissError();
    }
    render(){
        const marketMedicines = this.props.marketMedicines.map(medicine=>{
            return(
                <Col  key={medicine._id} className="m-3" xs={12} lg={3}>
                    <MedicineCard 
                    companyType={this.props.companyType}
                    user={medicine.user}
                    medicine={medicine} 
                    editMedicineClicked={()=>this.editMedicineHandler(medicine)}
                    deleteMedicineClicked={()=>this.deleteMedicineHandler(medicine._id)} 
                    ></MedicineCard>
                </Col>
            )
        })
        let spinner = <LoadingSpinner />;
        if(!this.props.isLoading){
            spinner = null;
        }
        return(
            <Row>
                <CustomModal show={this.props.reqError ? true : false} handleClose={this.handleModalClose} modalBody={this.props.reqError} />
                {marketMedicines}
                {spinner}
            </Row>
        );
    }
}
const mapStateToProps = state => {
    return {
        marketMedicines: state.orders.medicines,
        isLoading: state.orders.loading,
        page: state.orders.page,
        token: state.auth.token,
        companyType: state.auth.companyType,
        reqError: state.orders.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onGetMedicines: (token, page) => dispatch(getMedicinesMarket(token, page)),
        onDismissError: () => dispatch(marketMedicinesDismissError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderMedicine);