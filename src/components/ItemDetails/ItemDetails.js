import React, {Component} from 'react';

class ItemDetails extends Component{
    render(){
        return(
            <div className="bd-callout bd-callout-primary">
                {this.props.item.medicines.map((item)=><p key={item._id}>{item.medicine.name}  <span className="badge badge-primary badge-pill">$ {item.medicine.price.toFixed(2)}</span> * <span className="badge badge-primary badge-pill">{item.quantity} unit(s)</span></p>)}
                {this.props.date ? <p className="lead"><b>Purchase date: </b>{this.props.date}</p> : null }
                <p className="lead"><b>Order total price: </b>$ {this.props.totalPrice.toFixed(2)}</p>
                {this.props.supplier ? <p className="lead"><b>Supplier: </b>{this.props.supplier}</p> : null}
            </div>
        );
    }
}

export default ItemDetails;