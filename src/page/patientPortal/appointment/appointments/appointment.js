import React from "react";
import PatientPortalNav from "../../navigation/navigation";
import Header from "../../../../components/header/header";
import './appointments.css'

const Appointment = () => {
    return (
        <div>
            <Header />
            <PatientPortalNav />
            <h1>Appointment</h1>
        </div>
    )
}

export default Appointment