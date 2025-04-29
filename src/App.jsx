import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Resorts from './pages/Resorts.jsx';
import Contact from './pages/Contact.jsx';
import Management from './pages/Management.jsx';
import Login from './pages/Login.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import Admin from './pages/Admin.jsx';
import Guest from './pages/Guest.jsx';
import PropertyDetails from './pages/PropertyDetails.jsx';
import ResortsDetails from './pages/ResortsDetails.jsx';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/resorts" element={<Resorts />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/management" element={<Management />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/guest" element={<Guest />} />
            <Route path="/property-details" element={<PropertyDetails />} />
            <Route path="/resorts-details" element={<ResortsDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
