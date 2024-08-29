import  React from 'react';
import Header from '../../components/navigation/header'
import Nav from '../../components/navigation/navigation';
import section1 from '../../images/pexels-pavel-danilyuk-7653310.jpg'
import Heart from '../../images/MedicalHeart.jpg'
import clipBoard from '../../images/clipboard.jpg'
import './aboutUs.css'
import Footer from '../../components/footer/footer'


const AboutUs = () => {
    return(
        <div>
        <Header/>
        <Nav/>
        <div className="aboutUs-container">
            <h1 className='aU-title'>About Us</h1>
        <div className='aU-section1'>
            <h2 className='aU1-title'>Internal Medicine & Primary Care Practice Located in Houston, TX</h2>
            <p className='aU1-text'>Wellness Horizons Clinic provides comprehensive primary care services to individuals living and working in Houston, Texas. 
                Led by experienced internal medicine experts, the team at Wellness Horizons Clinic 
                offers a wide range of multispecialty services for adults and children of all ages. Committed to providing accessible,
                 high-quality care, Wellness Horizons Clinic ensures that all patients receive exceptional care regardless of their insurance status.
                With convenient onsite testing, including fast blood work, 
                X-rays, and other diagnostics, patients benefit from quick results and timely care. The clinic regularly conducts tests for seasonal flu, respiratory syncytial virus (RSV), sexually transmitted diseases (STDs), and polymerase chain reaction (PCR) tests for COVID-19.
                At Wellness Horizons Clinic, the focus is on compassionate care and prevention, with services designed to manage both chronic and acute conditions. Annual check-ups, men’s and women’s health services, and preventive care measures are all part of the clinic’s mission to keep patients healthier and happier. The dedicated team of trained professionals and experienced doctors listens attentively, providing personalized counseling and treatment to help patients maintain and improve their health.
                To experience exceptional primary care tailored to your needs, contact Wellness Horizons Clinic today or book an appointment online</p>
        </div> 
            <div className="aU-section2">
                <img className="auSection2-photo"  alt="section2" src={section1}/> 
                <p className='auSection2-text'>holistic Primary Care, Specialized Care, and Advanced Care.    
                <br/>A mindful approach to wellness and holistic care.<br/>
                Wellness Horizons Clinic is a 501(c)(3) non-profit organization.
                </p>
                
            </div>
            <div className="aU-section3">
               <h1 className='aU3-title'>Primary care, Peak Performance, Specialized Care</h1>
               <h2  className='aU3-title2'> Wellness Horizons Clinic Patients will recievce personalized care by doctors at the top of their fields.</h2>
               <img src={Heart} alt='Medical Heart'  className='aU3-img'/>
               <p className='aU3-text'>“At Wellness Horizons Clinic, we focus on proactive and preventive primary care that puts you in control of your health. 
               Our evidence-based strategies are tailored to your lifestyle, helping you manage and improve your well-being every step of the way.”</p>
               <img src={clipBoard} alt='Clipboard ' className='aU3-img'/>
               <p className='aU3-text'>“At Wellness Horizons Clinic, we prioritize prevention and 
                longevity by utilizing advanced tests and imaging to uncover deeper insights about your health. 
                Our personalized care is designed to help you perform at your peak while extending your healthspan, 
                ensuring that you live a longer, healthier life.”</p>
          </div> 
          
           
        </div>
        <Footer/>
   

    </div>
    )

}

export default AboutUs