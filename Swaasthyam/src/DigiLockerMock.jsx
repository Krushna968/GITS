import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DigiLockerMock = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  
  // Get user info from location state or use default (Rajesh Kumar)
  const userName = location.state?.userName || "Rajesh Kumar";
  const userQRId = location.state?.userQRId || "SW-2024-KL-001234";

  // Mock documents
  const documents = [
    {
      id: 1,
      name: "Aadhaar Card",
      issuer: "UIDAI",
      icon: "🆔",
      date: "2020-01-15",
      verified: true,
    },
    {
      id: 2,
      name: "PAN Card",
      issuer: "Income Tax Department",
      icon: "💳",
      date: "2019-06-20",
      verified: true,
    },
    {
      id: 3,
      name: "Driving License",
      issuer: "Transport Department",
      icon: "🚗",
      date: "2021-03-10",
      verified: true,
    },
    {
      id: 4,
      name: "Voter ID",
      issuer: "Election Commission",
      icon: "🗳️",
      date: "2018-11-05",
      verified: true,
    },
    {
      id: 5,
      name: "Health Card - Swaasthyam",
      issuer: "Ministry of Health & Swaasthyam",
      icon: "🏥",
      date: "2023-08-22",
      verified: true,
      details: `Worker: ${userName} | QR ID: ${userQRId}`,
    },
  ];

  const handleAadhaarChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 12);
    setAadhaar(digits);
  };

  const handleSendOtp = () => {
    if (aadhaar.length !== 12) {
      alert("Please enter valid 12-digit Aadhaar number");
      return;
    }
    setShowOtp(true);
  };

  const handleOtpChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(digits);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      alert("Please enter 6-digit OTP");
      return;
    }
    setIsLoggedIn(true);
  };

  const handleBackToSwaasthyam = () => {
    // Return to migrant dashboard (user's profile)
    navigate("/migrant-dashboard");
  };

  const handleDocumentClick = (doc) => {
    setSelectedDoc(doc);
  };

  const handleCloseDocument = () => {
    setSelectedDoc(null);
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md px-6 py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">DigiLocker</h1>
                <p className="text-xs text-gray-600">Digital India Initiative</p>
              </div>
            </div>
            <button
              onClick={handleBackToSwaasthyam}
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center space-x-1"
            >
              <span>←</span>
              <span>Back to Swaasthyam</span>
            </button>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
                D
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Sign in to DigiLocker
              </h2>
              <p className="text-sm text-gray-600">
                Access your digital documents securely
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Aadhaar Number
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={12}
                  value={aadhaar}
                  onChange={handleAadhaarChange}
                  placeholder="Enter 12-digit Aadhaar"
                  className="w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg tracking-wider"
                />
              </div>

              {!showOtp ? (
                <button
                  onClick={handleSendOtp}
                  disabled={aadhaar.length !== 12}
                  className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Request OTP
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Enter OTP
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={handleOtpChange}
                      placeholder="Enter 6-digit OTP"
                      className="w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg tracking-wider"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      OTP sent to registered mobile number
                    </p>
                  </div>
                  <button
                    onClick={handleVerifyOtp}
                    disabled={otp.length !== 6}
                    className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Verify & Sign In
                  </button>
                </div>
              )}

              <div className="text-center pt-4">
                <p className="text-xs text-gray-500">
                  🔒 Secured by Government of India
                </p>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t py-3 text-center">
          <p className="text-xs text-gray-600">
            © 2024 DigiLocker - A Digital India Initiative | Ministry of
            Electronics & IT
          </p>
        </footer>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <header className="bg-blue-600 text-white shadow-lg px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center text-blue-600 font-bold text-xl">
              D
            </div>
            <div>
              <h1 className="text-xl font-bold">DigiLocker</h1>
              <p className="text-xs text-blue-100">Digital Document Wallet</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold">{userName}</p>
              <p className="text-xs text-blue-100">QR ID: {userQRId}</p>
            </div>
            <button
              onClick={handleBackToSwaasthyam}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
            >
              Return to Swaasthyam
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Documents</p>
                  <p className="text-2xl font-bold text-gray-800">{documents.length}</p>
                </div>
                <div className="text-3xl">📄</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {documents.filter((d) => d.verified).length}
                  </p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Storage Used</p>
                  <p className="text-2xl font-bold text-gray-800">2.5 MB</p>
                </div>
                <div className="text-3xl">💾</div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">My Documents</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2">
                <span>+</span>
                <span>Add Document</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => handleDocumentClick(doc)}
                  className="bg-gradient-to-br from-blue-50 to-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{doc.icon}</div>
                    {doc.verified && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                        <span>✓</span>
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{doc.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{doc.issuer}</p>
                  <p className="text-xs text-gray-500">Issued: {doc.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
                <div className="text-3xl mb-2">📤</div>
                <p className="text-sm font-medium text-gray-700">Share</p>
              </button>
              <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
                <div className="text-3xl mb-2">⬇️</div>
                <p className="text-sm font-medium text-gray-700">Download</p>
              </button>
              <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
                <div className="text-3xl mb-2">🔗</div>
                <p className="text-sm font-medium text-gray-700">Link Account</p>
              </button>
              <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
                <div className="text-3xl mb-2">📋</div>
                <p className="text-sm font-medium text-gray-700">Activity Log</p>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Document Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-5xl">{selectedDoc.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedDoc.name}
                  </h3>
                  <p className="text-sm text-gray-600">{selectedDoc.issuer}</p>
                </div>
              </div>
              <button
                onClick={handleCloseDocument}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-gray-600">Document ID</span>
                <span className="text-sm font-medium text-gray-800">
                  DOC{selectedDoc.id}2024
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-gray-600">Issue Date</span>
                <span className="text-sm font-medium text-gray-800">
                  {selectedDoc.date}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-gray-600">Status</span>
                <span className="inline-flex items-center space-x-1 text-sm">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    ✓ Verified
                  </span>
                </span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 text-center">
                🔒 This document is government-verified and digitally signed
              </p>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Download
              </button>
              <button className="flex-1 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t py-3 text-center">
        <p className="text-xs text-gray-600">
          © 2024 DigiLocker - A Digital India Initiative
        </p>
      </footer>
    </div>
  );
};

export default DigiLockerMock;

