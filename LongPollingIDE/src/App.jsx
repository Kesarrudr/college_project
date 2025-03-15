import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/SignIn";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/SignUp";
import LandingPage from "./Pages/LandingPage";
import MyRepls from "./Pages/MyRepls";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Deployments from "./Pages/Deployments";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Services />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/myrepls" element={<MyRepls />} />
        <Route path="/deployments" element={<Deployments />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
