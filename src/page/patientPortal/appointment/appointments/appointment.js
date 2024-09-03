import React from "react";
import PatientPortalNav from "../../navigation/navigation";
import Header from "../../../../components/header/header";
import './appointments.css'
import { Link } from "react-router-dom";

const Appointment = () => {

    return (
        <div>
            <Header />
            <PatientPortalNav />
            <div className="appointment-container">
            <h1 className="appointment-title">Appointment</h1>
            <h2 className="appointment-subtitle"> If this is a medical emergency, please call 911.</h2>
            <div className="appointment-new-ccontainer">
                <h3 className="appointment-new-title">Need to schedule an appointment?</h3>
                <p className="appointment-new-text"> schedule a new visit online, or call us if you have questions</p>
                <Link to='patientportal/scheduleappt' className="appointment-button">Schedule Appointment</Link>
            </div>
           <p className="appointment-text">Recommond Appointment(0)</p>
        </div>

        </div>
    )
}

export default Appointment