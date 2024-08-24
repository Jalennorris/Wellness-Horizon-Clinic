import React from 'react';
import logo from '../../images/clinicLogo.jpg';
import './header.css';

const Header = () => {
    return(
        <div className="header-container">
            <img className="header-logo" src={logo} alt='Clinic Logo' />
            <h1 className="header-title">Wellness Horizons Clinic</h1>
        </div>
    );
}

export default Header;
