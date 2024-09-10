import React from 'react'
import Header from '../../components/header/header';
import Nav from '../../components/navigation/navigation';
import './services.css'
import Footer from '../../components/footer/footer'


const Services = () => {
    return (  
        <div>
            <Header />
            <Nav />
            <div className="services-container">
            <h1 className="services-title">Our Services</h1>
                <ul className='services-list'>
                <li className='services-card'>
                        <img className="services-img" src='*' alt="Services" />
                        <h2 className="services-card-title">Cardiology</h2>
                        <p className="services-card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                        <button className="services-button">View Profile</button>

            </li>
            </ul>
            </div>
            <Footer />  
            
        </div>
    );
}

export default Services


