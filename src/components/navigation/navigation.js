import React from 'react'
import { Link } from 'react-router-dom';
import './navigation.css'

const Nav = () => {
    return (
        <nav className="nav-container">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/" className="nav-link">HOME</Link>
                </li>
                <li className="nav-item">
                    <Link to="/aboutUs" className="nav-link">ABOUT US</Link>
                </li>
                <li className="nav-item">
                    <Link to="/providers" className="nav-link">PROVIDERS</Link>
                </li>
                <li className="nav-item">
                    <Link to="/services" className="nav-link">SERVICES</Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className="nav-link">CONTACT </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;