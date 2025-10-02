import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./Home.jsx";
import LoginPage from "./LoginPage.jsx";
import OfficerRegistration from "./OfficerRegistration.jsx";
import OfficialRegistration from "./OfficialRegistration.jsx";
import OfficerDashboard from "./OfficerDashboard.jsx";
import WorkerRegistration from "./WorkerRegistration.jsx";
import OfficialDashboard from "./OfficialDashboard.jsx";
import MigrantDashboard from "./MigrantDashboard.jsx";
import DigiLockerMock from "./DigiLockerMock.jsx";
import Chatbot from "./components/Chatbot.jsx";
import DarkModeToggle from "./components/DarkModeToggle.jsx";

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/' || location.pathname === '/home';

  return (
    <>
      {/* Show Dark Mode Toggle on all pages except landing */}
      {!isLandingPage && <DarkModeToggle />}
      
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Officer & Official registrations */}
        <Route path="/register-officer" element={<OfficerRegistration />} />
        <Route path="/register-official" element={<OfficialRegistration />} />

        {/* Dashboard routes */}
        <Route path="/officer" element={<OfficerDashboard />} />
        <Route path="/official-dashboard" element={<OfficialDashboard />} />
        <Route path="/migrant-dashboard" element={<MigrantDashboard />} />
        <Route path="/register-worker" element={<WorkerRegistration />} />
        
        {/* DigiLocker Mock */}
        <Route path="/digilocker" element={<DigiLockerMock />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      
      {/* Global Chatbot - Available on all pages */}
      <Chatbot />
    </>
  );
}

export default App;
