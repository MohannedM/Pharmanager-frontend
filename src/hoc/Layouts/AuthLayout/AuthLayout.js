import React, {Component} from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import classes from './AuthLayout.module.css';
import Logo from '../../../components/Logo/Logo';
class AuthLayout extends Component{

    render(){
        return(
        <Row>
            <Col sm={6} className={classes.AuthLayout + ' primary'}>
                <Logo />
            </Col>
            <Col xs={12} sm={6} className={classes.FormContainer}>
                <Container fluid>
                    {this.props.children}
                </Container>
            </Col>
        </Row>
        );
    }
}

export default AuthLayout;