import React from 'react'
import Header from '../../components/navigation/header';
import Nav from '../../components/navigation/navigation';
import './register.css'
import Footer from '../../components/footer/footer'
import { Link } from 'react-router-dom';


const Register = () => {
    return (
        <div>
            <Header />
            <Nav />
            <div className="register-container">
                <h1 className="register-title">Register</h1>
                <h2 className='register-subtitle'> Create an account</h2>
                
                <form className='register-form'>
                    <label className='register-label'> Legal First Name</label>
                    <input className='register-input' type="text" placeholder='Enter Name' required />
                    <label className='register-label'>Legal Last Name</label>
                    <input className='register-input' type="text" placeholder='Enter Name' required />

                    <label className='register-label'>Email</label>
                    <input className='register-input' type="email" placeholder='Enter Email' required />

                    <label className='register-label'>Legal Sex</label>
                    <select className='register-select' required>
                        <option className='register-option' value="Male">Male</option>
                        <option className='register-option' value="Female">Female</option>
                    </select>

                    <label className='register-label'>Phone</label>
                    <input className='register-input' type="text" placeholder='(xxx)xxx-xxxx' required />

                    <label className='register-label'>Password</label>
                    <input className='register-input' type="password" placeholder='Enter Password' required />

                    <label className='register-label'>Confirm Password</label>
                    <input className='register-input' type="password" placeholder='Enter Password' required />

                    <button className='register-button'>Register</button>
                </form>
                <p className='register-text'> Already have an account? <Link to="/login">Login</Link></p>
            </div>
            <Footer />
        </div>
    );
}

export default Register
