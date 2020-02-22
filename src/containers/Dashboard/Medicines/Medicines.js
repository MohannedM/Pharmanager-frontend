import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import MedicineCard from '../../../components/MedicineCard/MedicineCard';
import { medicinesReached } from '../../../store/actions';
import { connect } from 'react-redux';


const medicines = [
    {name: "Panadol", expDate: "20/10/2021", price: "7.5", quantity: 75, description: "The best medicine in town doctors recommend it from all over the world"},
    {name: "Hemojet", expDate: "20/07/2020", price: "20", quantity: 50, description: "The best medicine in town doctors recommend it from all over the world"},
    {name: "Depvoit", expDate: "05/10/2020", price: "5", quantity: 52, description: "The best medicine in town doctors recommend it from all over the world"},
    {name: "Strepciles", expDate: "01/01/2022", price: "45", quantity: 70, description: "The best medicine in town doctors recommend it from all over the world"}
];

class Medicines extends Component{
    componentDidMount(){
        this.props.onMedicinesReached();
    }
    render(){
        const medicineComponents = medicines.map(medicine=>{
            return(
                <Col  key={medicine.name} className="m-3" xs={12} lg={3}>
                    <MedicineCard medicine={medicine}></MedicineCard>
                </Col>

            )
        });
        return(
            <Row>
                {medicineComponents}
            </Row>
        );
    }
} 

const mapDispatchToProps = dispatch => {
    return{
        onMedicinesReached: () => dispatch(medicinesReached())
    }
}

export default connect(null, mapDispatchToProps)(Medicines);