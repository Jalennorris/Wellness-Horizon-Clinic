
import React,{useState} from 'react';
import './login.css';
import Header from '../../components/navigation/header';
import Nav from '../../components/navigation/navigation';
import Footer from '../../components/footer/footer'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [login, setLogin] = useState({username: '', password: ''});
    const [error, setError] = useState('');

    const navigate = useNavigate();


   const handlelogin = async () => {
    try {
        if(login.username === '' || login.password === '') {
            return setError('All fields are required');
        }
        const response = await axios.post('/user/login', login);
        console.log(response.data);
        navigate('/home');
    } catch (error) {
        console.log(`Something went wrong with login from frontend`,error);
    }
   }

   const handleChange = (e) => {
    e.preventDefault();
    setLogin({...login, [e.target.name]: e.target.value});
   }
    return (
        <div>
            <Header />
                <Nav />
        <div className='login-container'>
            <div className='login-form-container'>
                <h1 className='login-title'> Welcome</h1>
                <h2 className='login-title2'>Login  to Patient Portal</h2>
                <form className='login-form'>
                    <label className='login-label'  id='username'>Username</label>
                    <input className='login-input' type="text" name='username' placeholder='Enter Username' value={login.username} onChange={handleChange} required />
                    <label className='login-label' id='password'>Password</label>
                    <input className='login-input' type="password" name='password' placeholder='Enter Password' value={login.password}  onChange={handleChange}required />
                    <button className='login-button ' onClick={handlelogin} >Login</button>
                </form>

                <p className='login-error-text' >{error}</p>
                <p className='login-text'> Dont have an account? <a href="/register">Register</a></p>
               
            </div>
        </div>
        <Footer />
        </div>
    );
};
export default Login