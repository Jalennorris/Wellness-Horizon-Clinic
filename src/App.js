import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Home from  "./page/home/home"
import AboutUs from "./page/home/AboutUs/aboutUs";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={ <AboutUs/>} />
      </Routes>
    </Router>
  );
}

export default App;
