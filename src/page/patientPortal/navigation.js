
import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css'


const PatientPortalNav = () => {

    return (    
        <div className='nav'>
           <ul className='nav-list'>
               <li className='nav-item'>
                   <Link to="/patientportal" className="nav-link">Home</Link>
               </li>
               <li>
                   <Link to="/patientportal/appointments" className="nav-link">Appointments</Link>
               </li>
           </ul>
        </div>
    )
}