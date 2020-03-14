import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import ItemDetails from '../../../components/ItemDetails/ItemDetails';
import { getOrders, ordersPageChanged, marketMedicinesDismissError } from '../../../store/actions';
import { connect } from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Pagination from '../../../components/Pagination/Pagination';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import CustomModal from '../../../components/CustomModal/CustomModal';


class Orders extends Component{
    componentDidMount(){
        this.props.onGetOrders(this.props.token, 1);
    }
    
    onPageChange = toPage => {
        this.props.onPageChanged(this.props.token, toPage)
    }
    render(){
        let spinner = <LoadingSpinner />;
        if(!this.props.isLoading){
            spinner = null;
        }
        const orders = this.props.orders.map((purchase)=>{
            return(
                <Col sm={12} key={purchase._id}>
                    <ItemDetails item={purchase} date={purchase.createdAt} totalPrice={purchase.orderPrice}  supplier={purchase.supplier.companyName} />
                </Col>
            );
        });
        return (
            <Auxiliary>
                <Row>
                    <CustomModal show={this.props.reqError ? true : false} handleClose={()=>this.props.onDismissError()} modalBody={this.props.reqError} />
                    {spinner}
                    {orders}
                </Row>
                <Row>
                    <Col className="align-self-center">
                        <nav aria-label="...">
                            {this.props.totalOrdersCount ? <ul className="pagination pagination-sm"><Pagination totalMedicinesCount={this.props.totalOrdersCount} page={this.props.page} pageChanged={this.onPageChange} /></ul> : null}
                        </nav>
                    </Col>
                </Row>
            </Auxiliary>
        );
        
    }
}
const mapStateToProps = state => {
    return{
        token: state.auth.token,
        orders: state.orders.orders,
        totalOrdersCount: state.orders.totalOrdersCount,
        page: state.orders.ordersPage,
        isLoading: state.orders.loading,
        reqError: state.orders.error
    }
}

const mapDisptchToProps = dispatch => {
    return{
        onGetOrders: (token, page) => dispatch(getOrders(token, page)),
        onPageChanged: (token, page) => dispatch(ordersPageChanged(token, page)),
        onDismissError: () => dispatch(marketMedicinesDismissError())
    }
}

export default connect(mapStateToProps, mapDisptchToProps)(Orders);