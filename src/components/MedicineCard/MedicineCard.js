import React, {Component} from 'react';
import { Card, Button } from 'react-bootstrap';


class MedicineCard extends Component{

    render(){
        return(
            <Card style={{width: "100%"}}>
                <Card.Body>
                    <Card.Title>{this.props.medicine.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Expiration Date: {this.props.medicine.expDate}</Card.Subtitle>
                    <Card.Text>
                    {this.props.medicine.description}
                    </Card.Text>
                    <Button block variant="secondary">Edit</Button>
                    <Button block variant="danger">Delete</Button>
                </Card.Body>
            </Card>
        );
    }
}



export default MedicineCard;