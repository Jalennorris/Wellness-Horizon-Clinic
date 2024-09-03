import React, { useState,useEffect } from "react";
import axios from "axios";
import "./scheduleAppt.css";
import { Link } from "react-router-dom";

const ScheduleAppt = () => {
    const id = localStorage.getItem("id");
    const [doctor, setDoctor] = useState([]);  // This is the user's ID
    const [error, setError] = useState('');
    const [appointment, setAppointment] = useState({

        date: "",
        time: "",
        specialization: "",
        doctor_id: "",
        description: "",
        notes: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            [id]: value,
        }));
    };

    const handleApptSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/appointment/create', {
                user_id: id,
                ...appointment
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
            setError('Something went wrong with the appointment.');
        }
    };

    useEffect(() => {
    

        const getDoctors = async () => {
            try{
                const response = await axios.get('/doctor');
               const data = response.data;
                console.log(data);
                setDoctor(response.data);
            } catch(error) {
                console.log("Error fetching providers:", error);
    
            }
        }
        getDoctors()
    },[])
    


    return (
        <div>
            <div className="scheduleAppt-container">
                <h1 className="scheduleAppt-title">Schedule the care you need</h1>
                <Link to={`/patientportal/${id}/appointments`}>
                    <button className="scheduleAppt-exit-button">Exit</button>
                </Link>
                <div className="scheduleAppt-form-container">
                    <form className="scheduleAppt-form" onSubmit={handleApptSubmit}>
                        <label htmlFor="date" className="scheduleAppt-label">Date</label>
                        <input
                            type="date"
                            className="scheduleAppt-input"
                            id="date"
                            value={appointment.date}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="time" className="scheduleAppt-label">Time</label>
                        <input
                            type="time"
                            id="time"
                            className="scheduleAppt-input"
                            value={appointment.time}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="specialization" className="scheduleAppt-label">Specialization</label>
                        <select
                            id="specialization"
                            className="scheduleAppt-input"
                            value={appointment.specialization}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Specialization</option>
                            <option value="Internal Medicine">Internal Medicine</option>
                            <option value="Family Practice">Family Practice</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="Emergency Medicine">Emergency Medicine</option>
                            <option value="Endocrinology">Endocrinology</option>
                            <option value="Gastroenterology">Gastroenterology</option>
                            {/* Add other specializations */}
                        </select>

                        <label htmlFor="doctor_id" className="scheduleAppt-label">Doctor</label>
                        <select
                            id="doctor_id"
                            className="scheduleAppt-input"
                            value={appointment.doctor_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Doctor</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            {/* Add other doctors based on your database */}
                        </select>

                        <label htmlFor="description" className="scheduleAppt-label">Reason for visit</label>
                        <select
                            id="description"
                            className="scheduleAppt-input"
                            value={appointment.description}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Reason</option>
                            <option value="Covid-19 Testing">Covid-19 Testing</option>
                            <option value="General Care">General Care</option>
                            <option value="Nutrition">Nutrition</option>
                            <option value="Physical">Physical</option>
                            <option value="Mental">Mental</option>
                            <option value="Rehabilitation">Rehabilitation</option>
                            <option value="Lab Work">Lab Work</option>
                            <option value="New Patient">New Patient</option>
                            <option value="Problem Visit">Problem Visit</option>
                            <option value="Sick Visit">Sick Visit</option>
                            <option value="Testing">Testing</option>
                        </select>

                        <label htmlFor="notes" className="scheduleAppt-label">Notes</label>
                        <textarea
                            id="notes"
                            className="scheduleAppt-input"
                            value={appointment.notes}
                            onChange={handleChange}
                        />

                        <button type="submit" className="scheduleAppt-button">Schedule</button>
                    </form>
                </div>
                <p>{error}</p>
            </div>
        </div>
    );
};

export default ScheduleAppt;
