import React from "react"
import "./patientPortal.css"
import Header from "../../components/navigation/header";


const PatientPortal = () => {

    return (
        <div>
            <Header/>
            <div className="patientPortal-container">
                <h1 className="patientPortal-title">Patient Portal</h1>
                <div className="patientPortal">
                    <p className="patientPortal-text">appointments</p>
                </div>
            </div>

        </div>
    )
};

export default PatientPortal
