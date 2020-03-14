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

class OrderMedicine extends Component{

    state = {
        showMedicineModal: false,
        currentMedicine: null
    }

    componentDidMount(){
        this.props.onGetMedicines(this.props.token, 1);
    }
    handleModalClose = () => {
        this.props.onDismissError();
    }

    onPageChange = toPage => {
        this.props.onPageChanged(this.props.token, toPage)
    }

    addMedicineHandler = (medicine) =>{
        this.setState({showMedicineModal: true});
        this.setState({currentMedicine: medicine});
    }

    handleModalClose = () => {
        this.setState({showMedicineModal: false});
        this.setState({currentMedicine: null});
        this.props.onDismissError();
    }

    render(){
        const marketMedicines = this.props.marketMedicines.map(medicine=>{
            return(
                <Col  key={medicine._id} className="m-3" xs={12} lg={3}>
                    <MedicineCard 
                    orderMedicines
                    companyType={this.props.companyType}
                    user={medicine.user}
                    medicine={medicine} 
                    addMedicineClicked={()=>this.addMedicineHandler(medicine)}
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
                    {marketMedicines}
                    {spinner}
                    <OrderModal medicine={this.state.currentMedicine} show={this.state.showMedicineModal} handleClose={this.handleModalClose}  />
                </Row>
                <Row>
                    <Col className="align-self-center">
                        <nav aria-label="...">
                            {this.props.totalMedicinesCount ? <ul className="pagination pagination-sm"><Pagination totalMedicinesCount={this.props.totalMedicinesCount} page={this.props.page} pageChanged={this.onPageChange} /></ul> : null}
                        </nav>
                    </Col>
                </Row>
            </Auxiliary>
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
        totalMedicinesCount: state.orders.totalMedicinesCount,
        reqError: state.orders.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onGetMedicines: (token, page) => dispatch(getMedicinesMarket(token, page)),
        onDismissError: () => dispatch(marketMedicinesDismissError()),
        onPageChanged: (token, page) => dispatch(marketPageChanged(token, page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderMedicine);