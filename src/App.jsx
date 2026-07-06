import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Home';
import AccommodationPage from './components/AccommodationPage';
import AmenitiesPage from './components/AmenitiesPage';
import ContactPage from './components/ContactPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import BookingWizard from './components/BookingWizard';
import AdminLoginPage from './components/AdminLoginPage';
import AdminDashboardPage from './components/AdminDashboardPage'; // 1. Import Dashboard

const AppContent = () => {
  const location = useLocation();

  // Cleanly isolate minimal view frameworks from common resort headers/footers
  const isMinimalLayout =
    location.pathname === '/booking' ||
    location.pathname === '/admin/login' ||
    location.pathname === '/admin/dashboard'; // Added here

  return (
    <>
      {!isMinimalLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accommodation" element={<AccommodationPage />} />
        <Route path="/amenities" element={<AmenitiesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/booking" element={<BookingWizard />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} /> {/* 2. Register Dashboard */}
      </Routes>
      {!isMinimalLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;