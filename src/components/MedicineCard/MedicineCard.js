import React, {Component} from 'react';
import { Card, Button } from 'react-bootstrap';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

class MedicineCard extends Component{

    render(){
        let buttons = (
            <Auxiliary>
                <Button block variant="secondary" onClick={this.props.editMedicineClicked}>Edit</Button>
                <Button block variant="danger"  onClick={this.props.deleteMedicineClicked}>Delete</Button>
            </Auxiliary>
        );
        if(this.props.companyType === 'pharmacy'){
            buttons = <Button block variant="primary"  onClick={this.props.deleteMedicineClicked}>Add To Cart</Button>
        }
        const medDate = new Date(this.props.medicine.expirationDate);
        return(
            <Card style={{width: "100%"}}>
                <Card.Body>
                    <Card.Title>{this.props.medicine.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Expiration Date: {medDate.getDate()+'/'+(medDate.getMonth()+1)+'/'+medDate.getFullYear()}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Price: $ {this.props.medicine.price.toFixed(2)}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Quantity: {this.props.medicine.quantity} unit</Card.Subtitle>
                    { this.props.user ?  <Card.Subtitle className="mb-2 text-muted">Company: {this.props.medicine.user.companyName}</Card.Subtitle> : null} 
                    <Card.Text>
                    {this.props.medicine.description}
                    </Card.Text>
                    {buttons}
                </Card.Body>
            </Card>
        );
    }
}



export default MedicineCard;