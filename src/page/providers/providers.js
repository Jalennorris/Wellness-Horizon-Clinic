import React,{useState, useEffect} from 'react';
import Header from '../../components/header/header';
import Nav from '../../components/navigation/navigation';
import './providers.css';
import Footer from '../../components/footer/footer'
import axios from 'axios';

const Provider = () => {
    const [providers, setProviders] = useState([]);
    
useEffect(() => {
    

    const getProviders = async () => {
        try{
            const response = await axios.get('/doctor');
           const data = response.data;
            console.log(data);
            setProviders(response.data);
        } catch(error) {
            console.log("Error fetching providers:", error);

        }
    }
    getProviders()
},[])

    return (    
        <div>
            <Header />
            <Nav />
            <div className="providers-container">
                <h1 className="providers-title">Our Physicians</h1>
                <div className='providers-list'>
                    {providers.length > 0 ? (providers.map((provider) => (
                   <ul key={provider.id} className='providers'>
                       <li className='provider-card'>
                        <img alt='provider' className='provider-img' src='*'/>
                        <p className='provider-name'>{provider.name}</p>
                        <p className='provider-title'>{provider.specialization}</p>
                        <p className='provider-location'>Houston, TX</p>
                        <button className='provider-button'>View Profile</button>
                        </li>
                    
                   </ul>
                ))
                ) : (
                    <p>No Providers Found</p>
                )}
                </div>
            </div>
            <Footer />
        </div>
    );
}   

export default Provider;



