import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import ItemDetails from '../../../components/ItemDetails/ItemDetails';


class Orders extends Component{
    render(){
        const purchases = [
                {
                    medicines:[
                        {name: 'Cataflam', price: 25, quantity: 40},
                        {name: 'Hemojet', price: 15, quantity: 20},
                        {name: 'Congestal', price: 10, quantity: 50},
                    ],
                    supplier: "Purex",
                    totalPrice: 1800,
                    date: "05/02/2020"
                },
                {
                    medicines:[
                        {name: 'Panadol', price: 20, quantity: 100},
                        {name: 'Morphen', price: 300, quantity: 10},
                        {name: 'Eucarbon', price: 5, quantity: 30},
                    ],
                    supplier: "EgyPahrma",
                    totalPrice: 3150,
                    date: "20/10/2019"
            },

        ];
        const orders = purchases.map((purchase, index)=>{
            return(
                <Col sm={12}>
                    <ItemDetails item={purchase} date={purchase.date} totalPrice={purchase.totalPrice}  supplier={purchase.supplier} />
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

export default Orders;