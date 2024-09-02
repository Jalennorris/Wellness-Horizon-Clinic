import React from 'react'
import Header from '../../components/header/header';
import Nav from '../../components/navigation/navigation';
import './contact.css'
import Footer from '../../components/footer/footer'


const Contact = () => {
    return (
        <div>
            <Header />
            <Nav />
            <div className="contact-container">
                <h1 className="contact-title">Contact Us</h1>
                <h2 className='contact-subtitle'> Wellness Horizons Clinic located in Houston, TX</h2>
                <div className='contact-schedule'>
                    <h2 className='contact-address'> 1234 North Ave, Houston, TX  12345</h2>
                    <h3 className='contact-schedule-title'>Clinic Hours:</h3>
                    <p className='contact-schedule-text'>Monday - Friday: 9:00 AM - 7:00 PM</p>
                    <p className='contact-schedule-text'>Saturday-Sunday: 9:00 AM - 2:00 PM</p>

                    <button className='contact-button'>Schedule Appointment</button>
                    <p className='contact-text'>123-456-7890 </p>

                </div>
                <div className='contact-form-container'>
                    <h2 className='contact-subtitle'>Contact Us</h2>
                    <form className='contact-form'>
                        <label className='contact-label'>First Name</label>
                        <input className='contact-input' type="text" placeholder='Enter Name' required />
                        <label className='contact-label'>Last Name</label>
                        <input className='contact-input' type="text" placeholder='Enter Name' required />

                        <label className='contact-label'>Email</label>
                        <input className='contact-input' type="email" placeholder='Enter Email' required />

                        <label className='contact-label'>Phone</label>
                        <input className='contact-input' type="tel" placeholder='Enter Phone Number' required />

                        <label className='contact-label'>Message</label>
                        <textarea className='contact-textarea' type="text-area" cols="50" rows="10" placeholder='Enter Message' required />

                        <label className='contact-checkbox'> <input className='contact-checkbox' type="checkbox" required /> I agree to the terms and conditions</label>

                        <p className='contact-form-text'>I understand and agree that any information submitted will be forwarded to our office by email and not via a secure messaging system.
                             This form should not be used to transmit 
                            private health information, and we disclaim all warranties with respect to 
                            the privacy and confidentiality of any information submitted through this form.</p>

                    </form>
                    <button className='contact-button'>Submit</button>

                </div>

            </div>
            <Footer />


        </div>
    )
}

export default Contact
