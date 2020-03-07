import React, {Component} from 'react';
import { Modal, Button } from "react-bootstrap";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { connect } from 'react-redux';


class DeleteModal extends Component{


    render(){
        let body = <h6 className="text-warning">Are you sure youe want to delete this medicine?</h6>;
        if(this.props.loadingItem){
           body = <LoadingSpinner />;
        }
        if(this.props.successMessage){
           body = <h6 className="text-primary">{this.props.successMessage}</h6>;
        }
        
        if(this.props.reqError){
           body = <h6 className="text-primary">{this.props.reqError}</h6>;
        }

        return(
            <Modal show={this.props.show} onHide={this.handlModalHide}>
                    <Modal.Body>
                         {body}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={this.props.deleteCartItem} disabled={this.props.reqError || this.props.successMessage || this.props.loadingItem ? true : false}>
                            Delete Medicine(s)
                        </Button>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return{
        reqError: state.cart.error,
        loadingItem: state.cart.loadingItem,
        successMessage: state.cart.successMessage
    }
}

export default connect(mapStateToProps)(DeleteModal);