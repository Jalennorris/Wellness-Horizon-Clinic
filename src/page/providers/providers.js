import React from 'react';
import Header from '../../components/navigation/header';
import Nav from '../../components/navigation/navigation';
import './providers.css';
import Footer from '../../components/footer/footer'

const Provider = () => {
    return (    
        <div>
            <Header />
            <Nav />
            <div className="providers-container">
                <h1 className="providers-title">Our Physicians</h1>
                <div className='providers-list'>
                   <ul className='providers'>
                       <li className='provider-card'>
                        <img alt='provider' className='provider-img' src='*'/>
                        <p className='provider-name'>Dr. John Doe</p>
                        <p className='provider-title'>Internal Medicine</p>
                        <p className='provider-location'>Houston, TX</p>
                        <button className='provider-button'>View Profile</button>
                        </li>
                    
                   </ul>
                    
                </div>
            </div>
            <Footer />
        </div>
    );
}   

export default Provider;



