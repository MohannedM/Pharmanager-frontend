import React, {Component} from 'react';
import { Card, Button } from 'react-bootstrap';


class MedicineCard extends Component{

    render(){
        const medDate = new Date(this.props.medicine.expirationDate);
        return(
            <Card style={{width: "100%"}}>
                <Card.Body>
                    <Card.Title>{this.props.medicine.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Expiration Date: {medDate.getDate()+'/'+(medDate.getMonth()+1)+'/'+medDate.getFullYear()}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Price: $ {this.props.medicine.price.toFixed(2)}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Quantity: {this.props.medicine.quantity} unit</Card.Subtitle>
                    <Card.Text>
                    {this.props.medicine.description}
                    </Card.Text>
                    <Button block variant="secondary" onClick={this.props.editMedicineClicked}>Edit</Button>
                    <Button block variant="danger">Delete</Button>
                </Card.Body>
            </Card>
        );
    }
}



export default MedicineCard;