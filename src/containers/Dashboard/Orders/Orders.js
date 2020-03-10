import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';


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
                <Col  key={index} sm={12}>
                    <div className="bd-callout bd-callout-primary">
                        {purchase.medicines.map((medicine, indexM)=><p key={indexM}>{medicine.name}  <span className="badge badge-primary badge-pill">$ {medicine.price.toFixed(2)}</span> * <span className="badge badge-primary badge-pill">{medicine.quantity} unit(s)</span></p>)}
                        <p className="lead"><b>Purchase date: </b>{purchase.date}</p>
                        <p className="lead"><b>Order total price: </b>$ {purchase.totalPrice.toFixed(2)}</p>
                        <p className="lead"><b>Supplier: </b>{purchase.supplier}</p>
                    </div>
                </Col>
            )
        });
        return (
        <Row>
            {orders}
        </Row>
        );
        
    }
}

export default Orders;