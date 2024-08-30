import React from 'react'
import Header from '../../components/navigation/header';
import Nav from '../../components/navigation/navigation';
import './register.css'
import Footer from '../../components/footer/footer'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';




const Register = () => {
    const [register, setRegister] = useState({firstname: '', lastname: '', email: '', sex : '',  phone : '', username: '', password: ''});
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if(register.firstname === '' || register.lastname === '' || register.email === '' || register.sex === '' || register.phone === '' || register.username === '' || register.password === '') {
                return setError('All fields are required');
            }
            const response = await axios.post('/user/register', register);
            console.log(response.data);
            navigate('/home');
        } catch (error) {
            console.log(`Something went wrong with register from frontend`,error);
            setError('Something went wrong with register from frontend');
        }
        finally{
            console.log('register attempted has been completed');
        }
    }
    const handleChange = (e) => {
        setRegister({...register, [e.target.name]: e.target.value});
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        if(register.password !== e.target.value) {
            setError('Passwords do not match');
        } else {
            setError('');
        }
    }
    return (
        <div>
            <Header />
            <Nav />
            <div className="register-container">
                <h1 className="register-title">Register</h1>
                <h2 className='register-subtitle'> Create an account</h2>
                
                <form className='register-form' onSubmit={handleRegister}>
                    <label className='register-label'> Legal First Name</label>
                    <input className='register-input' type="text" placeholder='Enter Name' name='firstname' vakue={register.firstname} onChange={handleChange} required />
                    <label className='register-label'>Legal Last Name</label>
                    <input className='register-input' type="text" placeholder='Enter Name'  name='lastname' value={register.lastname} onChange={handleChange} required />

                    <label className='register-label'>Email</label>
                    <input className='register-input' type="email" placeholder='Enter Email' name='email' value={register.email} onChange={handleChange} required />

                    <label className='register-label'>Legal Sex</label>
                    <select className='register-select' required name='sex' value={register.sex} onChange={handleChange}>
                        <option className='register-option' value="Male">Male</option>
                        <option className='register-option' value="Female">Female</option>
                    </select>

                    <label className='register-label'>Phone</label>
                    <input className='register-input' type="text" placeholder='(xxx)xxx-xxxx' required  name='phone' value={register.phone} onChange={handleChange} />
                    <label className='register-label'>Username</label>
                    <input className='register-input' type="text" placeholder='Enter Username'  name='username' value={register.username} onChange={handleChange} required />

                    <label className='register-label'>Password</label>
                    <input className='register-input' type="password" placeholder='Enter Password' name='password' value={register.password} onChange={handleChange} required />

                    <label className='register-label'>Confirm Password</label>
                    <input className='register-input' type="password" placeholder='Enter Password' value={confirmPassword} onChange={handleConfirmPassword} required />

                    <button className='register-button' type='submit'>Register</button>
                </form>
                <p className='register-text'> Already have an account? <Link to="/login">Login</Link></p>
            </div>
            <Footer />
        </div>
    );
}

export default Register
