import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Home from  "./page/home/home"
import AboutUs from "./page/AboutUs/aboutUs";
import Provider from "./page/providers/providers";
import Services from "./page/services/services";
import Contact from "./page/contact/contact";
import Login from "./page/login/login"
import Register from "./page/Register/register";



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
      </Routes>
    </Router>
  );
}

export default App;
