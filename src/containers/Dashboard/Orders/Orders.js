import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import ItemDetails from '../../../components/ItemDetails/ItemDetails';
import { getOrders } from '../../../store/actions';
import { connect } from 'react-redux';


class Orders extends Component{
    componentDidMount(){
        this.props.onGetOrders(this.props.token);
    }
    render(){

        const orders = this.props.orders.map((purchase)=>{
            return(
                <Col sm={12} key={purchase._id}>
                    <ItemDetails item={purchase} date={purchase.createdAt} totalPrice={purchase.orderPrice}  supplier={purchase.supplier.companyName} />
                </Col>
            );
        });
        return (
        <Row>
            {orders}
        </Row>
        );
        
    }
}
const mapStateToProps = state => {
    return{
        token: state.auth.token,
        orders: state.orders.orders
    }
}

const mapDisptchToProps = dispatch => {
    return{
        onGetOrders: (token) => dispatch(getOrders(token))
    }
}

export default connect(mapStateToProps, mapDisptchToProps)(Orders);