import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLaptopMedical} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Logo = props => <h5 className="text-white m-2"><Link to="/" style={{color:"#fff", textDecoration: "none"}}><FontAwesomeIcon icon={faLaptopMedical} /> PharManager</Link></h5>

export default Logo;
 