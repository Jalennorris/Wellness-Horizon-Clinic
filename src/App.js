import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Home from  "./page/home/home"
import AboutUs from "./page/AboutUs/aboutUs";
import Provider from "./page/providers/providers";
import Services from "./page/services/services";
import Contact from "./page/contact/contact";
import Login from "./page/login/login"
import Register from "./page/Register/register";
import PatientPortal from "./page/patientPortal/patientPortal";
import Appointment from './page/patientPortal/appointment/appointments/appointment'
import ScheduleAppt from './page/patientPortal/scheduleAppt/scheduleAppt'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={ <AboutUs/>} />
        <Route path="providers" element={<Provider/>} />
        <Route path="services" element={<Services/>} />
        <Route path="contact" element={<Contact/>} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route  path="patientportal/:id" element={<PatientPortal/>} />
        <Route path="patientportal/:id/appointments" element={<Appointment />} />
        <Route path="patientportal/:id/appointments/patientportal/scheduleappt" element={<ScheduleAppt />} />
      
      </Routes>
    </Router>
  );
}

export default App;
