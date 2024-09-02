import Header from '../../components/header/header';
import Nav from '../../components/navigation/navigation';
import photo1 from '../../images/pexels-mart-production-7088524.jpg';
import './home.css';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer'
import React, { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        const section2TextElements = document.querySelectorAll('.section2-text');
        
        section2TextElements.forEach((section2Text) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        section2Text.classList.add('animate-slide');
                    } else {
                        section2Text.classList.remove('animate-slide');
                    }
                });
            });

            observer.observe(section2Text);

            return () => {
                observer.unobserve(section2Text);
            };
        });
    }, []);
  
    return (
        <div>
           
            <Header />
            <Nav />
            <div className="home-container">
                <div className="section1-container">
                    <img className="section1-photo" src={photo1} alt="Clinic" />
                    <p className="section1-text">"Your health, our priority—answers and care when you need them most."</p>
                    <div className="grid-container">
                        <p className="grid-text">Schedule an appointment</p>
                        <Link to={'/login'}><p className="grid-text">Login to Patient Account</p></Link>
                        
                    </div>
                </div>
                <div className="section2-container">
                    <h1 className="section2-title">Welcome to Wellness Horizons Clinic</h1>
                    <p className="section2-text">
                        At Wellness Horizons Clinic, we offer accessible, compassionate, 
                        and top-tier medical care tailored to your needs. 
                        Located conveniently near you, we proudly serve 
                        [City Name] and the surrounding areas. Our dedicated team of 
                        healthcare professionals is committed to supporting your journey toward better health and well-being. Every step we take is centered
                        around you, ensuring personalized, effective treatment for a healthier tomorrow.
                    </p>
                    <h1 className='section2-title'> Primary Care Doctor</h1>
                    <p className='section2-text'>Our primary care doctors are here to diagnose your symptoms, t
                        reat both serious and ongoing conditions, and provide the care you need. We also 
                        focus on preventative care to 
                        help you stay healthy and avoid getting sick.</p>
                    <h1 className='section2-title'> Primary Doctor</h1>
                    <p className='section2-text'>Wellness Horizons Clinic offers primary care doctors in Houston, TX, 
                        and surrounding areas, making it easy for you to get the care and medical advice you need close to home. We also provide same-day access to our Internet Medicine specialists, 
                        so you can receive specialized care without waiting.</p>
                    <h1 className='section2-title'> Primary Care Pyhsicans</h1>
                    <p className='section2-text'>
                    Our experienced primary care physicians are highly skilled in diagnosing and treating a 
                    wide range of conditions and illnesses, ensuring you receive top-quality care. 
                    We're dedicated to helping you recover and stay as healthy as possible.
                    </p>
                    <h1 className='section2-title'>Adult Primary Care Services</h1>
                    <p className='section2-text'>We offer top-notch adult primary care services, 
                        including regular check-ups, same-day on-site testing, medication prescriptions for illnesses and conditions, 
                        management of chronic health issues, and screenings for common medical concerns.</p>

                        
                </div>
              
            </div>
            <Footer />
    
        </div>
    );
};

export default Home;
