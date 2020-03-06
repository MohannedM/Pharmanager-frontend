import React, {Component} from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { faSearch, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AdminNavbar extends Component{
    render(){
        let shoppingCart = null;
        if(this.props.isPharmacy){
            shoppingCart = (
                <li className="nav-item">
                    <Link to="/cart" className="nav-link">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span className="badge badge-danger badge-counter">{this.props.cartCount}</span>
                    </Link>
                </li>
            );
        }
        return(
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <form className="d-none d-lg-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    </div>
                </div>
                </form>
                <Nav className="mr-left">
                {shoppingCart}
                <div className="topbar-divider d-none d-lg-block"></div>
                <li className="nav-item">
                <Link className="nav-link" to="/">{this.props.username}</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/logout">Logout</Link>
                </li>
                </Nav>

            </Navbar.Collapse>
    
            </nav>
        );
    }
}


export default AdminNavbar;