
import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css'


const PatientPortalNav = () => {
    const id = localStorage.getItem('id');

    return (    
        <div className='PatientPortalnav-container'>
           <ul className='PatientPortalnav-list'>
               <li className='PatientPortalnav-item'>
                   <Link to={`/patientportal/${id}`} className="PatientPortalnav-link">Home</Link>
               </li>
               <li className='PatientPortalnav-item'>
                   <Link to={`/patientportal/${id}/appointments` } className="PatientPortalnav-link">Appointments</Link>
               </li>
           </ul>
        </div>
    )
}
export default PatientPortalNav