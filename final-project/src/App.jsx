import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/SignIn";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/SignUp";
import LandingPage from "./Pages/LandingPage";
import MyRepls from "./Pages/MyRepls";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Deployments from "./Pages/Deployments";
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={authUser ? <LandingPage /> : <Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={authUser ? <Navigate to="/landingpage" /> : <Services />} />
          <Route path="/signup" element={authUser ? <Navigate to="/landingpage" /> : <SignUp />} />
          <Route path="/landingpage" element={authUser ? <LandingPage /> : <Navigate to="/signin" />} />
          <Route path="/myrepls" element={authUser ? <MyRepls /> : <Navigate to="/signin" />} />
          <Route path="/deployments" element={authUser ? <Deployments /> : <Navigate to="/signin" />} />
          <Route path="*" element={authUser ? <Navigate to="/landingpage" /> : <Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
      <Toaster />
    </div>
  );
};

export default App;

