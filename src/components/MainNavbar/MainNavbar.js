import React, {Component} from 'react';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import {Navbar} from 'react-bootstrap'
import { connect } from 'react-redux';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MainNavbar extends Component{
  render(){
    let links = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Log In</Link>
        </li>
      </ul>
    );
    if(this.props.isAuth){
      links = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link"> <FontAwesomeIcon icon={faChartLine} /> {this.props.nameAuth}</Link>
        </li>
        <li className="nav-item">
          <Link to="/logout" className="nav-link">Logout</Link>
        </li>
        
      </ul>
      )
    }
        return(
            <Navbar expand="sm" className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
            <div className="container">
              <Logo />
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              {links}
            </Navbar.Collapse>
            </div>
          </Navbar>
        );
    }
}

const mapStateToProps = state => {
  return{
    isAuth: state.auth.token !== null,
    nameAuth: state.auth.name
  }
}

export default connect(mapStateToProps)(MainNavbar);