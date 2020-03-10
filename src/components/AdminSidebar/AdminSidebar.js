import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AdminSidebar extends Component{
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
      }
    render(){
        let addMedicine = null;
        let orderMedicines = (
            <li className={"nav-item " + this.getNavLinkClass("/orders/medicines")}>
                <Link className="nav-link" to="/orders/medicines">
                <span>Order Medicines</span></Link>
            </li>
        );
        if(this.props.companyType === 'supplier'){
            addMedicine = (   
        <li className={"nav-item " + this.getNavLinkClass("/medicines/create")}>
            <Link className="nav-link" to="/medicines/create">
            <span>Add Medicine</span></Link>
        </li>
        );
        orderMedicines = null;
        }
        return(
            <ul className="navbar-nav primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Pharmanger  <sup>2</sup></div>
            </a>
        
            <hr className="sidebar-divider my-0" />

            <li className={"nav-item " + this.getNavLinkClass("/")}>
                <Link className="nav-link" to="/">
                <FontAwesomeIcon icon={faTachometerAlt} /> &nbsp;
                <span>Dashboard</span></Link>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Medicines
            </div>

            <li className={"nav-item " + this.getNavLinkClass("/medicines")}>
                <Link className="nav-link" to="/medicines">
                <span>{this.props.companyType === 'supplier' ? 'All' : 'My'} Medicines</span></Link>
            </li>

            {addMedicine}

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Orders
            </div>

            <li className={"nav-item " + this.getNavLinkClass("/orders")}>
                <Link className="nav-link" to="/orders">
                <span>All Orders</span></Link>
            </li>

            {orderMedicines}
            <hr className="sidebar-divider" />

    
        </ul>
        );
    }
}

export default withRouter(AdminSidebar);