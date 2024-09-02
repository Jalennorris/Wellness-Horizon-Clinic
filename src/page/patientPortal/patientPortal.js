import React, { useEffect, useState } from "react";
import "./patientPortal.css";
import Header from "../../components/header/header";
import PatientPortalNav from "./navigation/navigation";
import axios from "axios";

const PatientPortal = () => {
    const [fullname, setFullname] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("id");
        const response = await axios.get(`/user/${userId}`);
        console.log(response.data);
        const firstname = response.data.user.firstname
        const lastname = response.data.user.lastname

        console.log(firstname, lastname);

        setFullname(`${firstname} ${lastname}`);
       
      
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Header />
      <PatientPortalNav />
      <div className="patientPortal-container">
        <h1 className="patientPortal-title">Hello, {fullname}! </h1>
        <div className="patientPortal-appointments-container">
          <h2 className="patientPortal-subtitle">Appointments</h2>
          <div className="patientPortal-appointments">
             <p className="patientPortal-text">You have no appointments scheduled</p>
             <button className="patientPortal-button">Schedule Appointment</button>
          </div>
        </div>
      </div>
      <div className="patientPortal-billing">
      <h2 className="patientPortal-text">Billing Summary</h2>
        <div className="patientPortal-billing-summary">
        <p className="patientPortal-text">You have no billing information</p>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;
