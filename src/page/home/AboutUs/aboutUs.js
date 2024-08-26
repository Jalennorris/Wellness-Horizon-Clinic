import  React from 'react';
import Header from '../../../components/navigation/header'
import Nav from '../../../components/navigation/navigation';
import section1 from '../../../images/pexels-pavel-danilyuk-7653310.jpg'
import './aboutUs.css'


const AboutUs = () => {
    return(
        <div>
        <Header/>
        <Nav/>
        <div className="aboutUs-container">
            <div className="aU-section1">
                <img className="auSection1-photo"  alt="section1" src={section1}/> 
                <p className='au-overlay'>holistic Primary Care, Specialized Care, and Advanced Care.    
                <br/>A mindful approach to wellness and holistic care.
                Wellness Horizons Clinic is a 501(c)(3) non-profit organization.
                </p>
                
            </div>
            <div className="aU-section2">
               <h1>Primary care, Peak Performance, Specialized Care</h1>
               <h2> Wellness Horizons Clinic Patients will recievce personalized care by doctors at the top of their fields.</h2>

          </div>  
            <h1>About Us</h1>
        </div>

    </div>
    )

}

export default AboutUs