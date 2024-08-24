import React from 'react'
import { Link } from 'react-router-dom';
import './navigation.css'

const Nav = () => {
    return (
        <nav className="nav-container">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/aboutUs" className="nav-link">About Us</Link>
                </li>
                <li className="nav-item">
                    <Link to="/Pyhsicans" className="nav-link">Providers</Link>
                </li>
                <li className="nav-item">
                    <Link to="/services" className="nav-link">Services</Link>
                </li>
                <li className="nav-item">
                    <Link to="/contactUs" className="nav-link">Contact Us</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;