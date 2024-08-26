import React from 'react';
import logo from '../../images/clinicLogo.jpg';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
    return(
        <div className="header-container">
           <Link to='/'> <img className="header-logo" src={logo} alt='Clinic Logo' /> </Link>
            <h1 className="header-title">Wellness Horizons Clinic</h1>
        </div>
    );
}

export default Header;
