import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";
import { useLanguage } from './LanguageContext';
import { API_ENDPOINTS } from './config/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("migrant");
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(digits);
  };

  const handlePastePhone = (e) => {
    const pasted = (e.clipboardData || window.clipboardData)
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 10);
    e.preventDefault();
    setPhone(pasted);
  };

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      alert("Please enter a 10-digit mobile number");
      return;
    }
    
    try {
      const response = await fetch(API_ENDPOINTS.SEND_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowOtp(true);
        setOtp("");
        alert(`OTP sent to ${phone}! Check your backend terminal for the 6-digit code.`);
      } else {
        alert(data.message || 'Failed to send OTP. User may not be registered.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please check your internet connection and try again!');
    }
  };

  const handleOtpChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(digits);
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      alert("Please enter the 6-digit OTP");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(API_ENDPOINTS.VERIFY_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store token and user info in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Navigate based on user role
        const userRole = data.user.role;
        if (userRole === 'officer') {
          navigate('/officer');
        } else if (userRole === 'official') {
          navigate('/official-dashboard');
        } else if (userRole === 'worker') {
          navigate('/migrant-dashboard');
        } else if (userRole === 'supervisor') {
          // Supervisors can also access officer dashboard
          navigate('/officer');
        } else {
          alert('Unknown user role: ' + userRole);
        }
      } else {
        alert(data.message || 'Invalid OTP. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Failed to verify OTP. Please check your internet connection!');
      setIsLoading(false);
    }
  };


  const handleRegisterClick = () => {
    if (selectedUserType === "officer") {
      navigate("/register-officer");
    } else if (selectedUserType === "official") {
      navigate("/register-official");
    }
  };

  const handleUserTypeChange = (e) => {
    setSelectedUserType(e.target.value);
  };

  const handleQRScan = () => {
    // Toggle camera for QR scanning
    setShowCamera(!showCamera);
    if (!showCamera) {
      // Request camera permissions
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            // Camera access granted
            console.log('Camera access granted');
            // You can add actual QR scanning logic here
            // For now, just show camera is active
            setTimeout(() => {
              stream.getTracks().forEach(track => track.stop());
              setShowCamera(false);
              alert('QR Code scanning feature will be implemented with a QR scanner library');
            }, 3000);
          })
          .catch((err) => {
            console.error('Camera access denied:', err);
            alert('Camera access denied. Please enable camera permissions.');
            setShowCamera(false);
          });
      } else {
        alert('Camera not supported on this device');
        setShowCamera(false);
      }
    }
  };

  if (isLoading) {
    return <LoadingAnimation message={`Logging in as ${selectedUserType}...`} />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col overflow-hidden">
      <header className="flex font-[Quicksand] justify-center px-4 py-4">
        <div className="w-full max-w-3xl flex items-center flex-col">
          <div className="mb-3">
            <img
              className="h-24 w-24 object-contain"
              src="/Cooked-Coders/assets/logo 2.png"
              alt="Swaasthyam Logo"
            />
          </div>
          <h1 className="text-blue-600 font-bold text-2xl md:text-3xl text-center">{t('swaasthyam')}</h1>
          <p className="text-gray-700 text-center text-sm md:text-base mt-1 px-4">
            {t('digitalHealthRecord')}
          </p>
        </div>
      </header>

      <main className="flex-1 flex justify-center px-4 py-2 overflow-hidden">
        <article className="font-[Quicksand] w-full max-w-xl">
          <div className="bg-white p-4 md:p-6 border-blue-200 border border-solid rounded-2xl shadow-xl h-full overflow-y-auto">
            <div className="mb-3">
            <h2 className="text-blue-600 text-center font-bold text-base md:text-lg mb-1">
              {t('welcomeToSwaasthyam')}
            </h2>
            <p className="text-center text-gray-600 text-xs mb-3">
              {t('secureHealthRecord')}
            </p>
              <p className="font-semibold text-blue-600 mb-2 text-sm">{t('selectUserType')}</p>
              
              <div className="relative">
                <select
                  className="w-full h-10 px-3 border border-blue-200 rounded-lg text-gray-700 bg-white cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none text-sm"
                  value={selectedUserType}
                  onChange={handleUserTypeChange}
                >
                  <option value="migrant">{t('migrantWorker')}</option>
                  <option value="officer">{t('officer')}</option>
                  <option value="official">{t('official')}</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <p className="font-semibold text-blue-600 mb-2 text-sm">{t('loginWithMobile')}</p>
              <input
                required
                className="w-full outline-none text-black bg-white border border-blue-200 text-sm h-10 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={handlePhoneChange}
                onPaste={handlePastePhone}
                placeholder={t('enterMobile')}
              />

              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full mt-2 h-10 text-sm font-medium rounded-lg shadow-md transition-all duration-200 active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                style={
                  phone.length === 10
                    ? {
                        background: "linear-gradient(90deg, #1D4ED8 0%, #000000 100%)",
                        color: "white",
                      }
                    : {
                        background: "linear-gradient(90deg, #9CA3AF 0%, #6B7280 100%)",
                        color: "white",
                        cursor: "not-allowed"
                      }
                }
                disabled={phone.length !== 10}
              >
                {t('sendOTP')}
              </button>
            </div>

            {showOtp && (
              <div className="mb-3">
                <input
                  required
                  className="w-full outline-none text-black bg-white border border-blue-200 text-sm h-10 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                  type="tel"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder={t('enterOTP')}
                />

                <button
                  type="button"
                  onClick={handleVerify}
                  className="w-full h-10 text-sm font-medium rounded-lg shadow-md transition-all duration-200 active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                  style={
                    otp.length === 6
                      ? {
                          background: "linear-gradient(90deg, #1D4ED8 0%, #000000 100%)",
                          color: "white",
                        }
                      : {
                          background: "linear-gradient(90deg, #9CA3AF 0%, #6B7280 100%)",
                          color: "white",
                          cursor: "not-allowed"
                        }
                  }
                  disabled={otp.length !== 6}
                >
                  {t('verifyLogin')}
                </button>
              </div>
            )}

            {/* Alternative Login Methods */}
            <div className="mb-3">
              <button
                type="button"
                onClick={() => navigate('/digilocker', { 
                  state: { 
                    userName: 'Rajesh Kumar',
                    userQRId: 'SW-2024-KL-001234'
                  } 
                })}
                className="w-full h-10 flex items-center justify-center border border-blue-200 rounded-lg text-sm text-gray-700 bg-white shadow-sm transition-all duration-200 hover:bg-blue-50 active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <img
                  src="/Cooked-Coders/assets/lock.png"
                  className="h-4 w-4 mr-2"
                  alt="DigiLocker"
                />
                {t('loginWithDigiLocker')}
              </button>
            </div>

            {/* QR Scanner - Only for migrant workers and officers */}
            {selectedUserType !== "official" && (
              <button
                type="button"
                onClick={handleQRScan}
                className={`w-full h-28 flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-200 mb-3 ${
                  showCamera 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-blue-400 text-gray-700 bg-blue-50 hover:bg-blue-100'
                } active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {showCamera ? (
                  <>
                    <div className="animate-pulse">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <p className="text-green-600 font-medium mt-1 text-sm">Camera Active</p>
                    <p className="text-xs text-green-600">Scanning for QR Code...</p>
                  </>
                ) : (
                  <>
                    <img
                      src="/Cooked-Coders/assets/camera.png"
                      className="h-8 w-8 mb-1"
                    alt="Camera"
                  />
                  <p className="text-blue-600 font-medium text-sm">{t('scanQRCode')}</p>
                  <p className="text-xs text-gray-600">{t('tapToActivate')}</p>
                  </>
                )}
              </button>
            )}

            {/* Registration Button */}
            {selectedUserType !== "migrant" && (
              <button
                type="button"
                onClick={handleRegisterClick}
                className="w-full h-10 flex items-center justify-center rounded-lg border border-green-600 text-green-600 bg-green-50 font-medium shadow-sm transition-all duration-200 hover:bg-green-100 active:scale-98 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
                {selectedUserType === "officer"
                  ? t('registerNewOfficer')
                  : t('registerNewOfficial')}
              </button>
            )}
          </div>
        </article>
      </main>
      
      {/* Footer */}
      <footer className="flex justify-center items-center gap-2 px-4 py-2">
        <span className="text-xs px-2 py-1 rounded-full text-green-700 bg-green-100 border border-green-300">
          🔒 {t('secure')}
        </span>
        <span className="text-xs px-2 py-1 rounded-full text-blue-700 bg-blue-100 border border-blue-300">
          🏛️ {t('officialGovt')}
        </span>
        <span className="text-xs px-2 py-1 rounded-full text-gray-700 bg-gray-100 border border-gray-300">
          🏞️ {t('govtInitiative')}
        </span>
      </footer>
    </div>
  );
};

export default LoginPage;
