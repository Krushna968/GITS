import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";

const MigrantDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogout = () => {
    setIsLoading(true);
    // Simulate logout process
    setTimeout(() => {
      // Clear any authentication data here if needed
      // localStorage.removeItem('authToken'); // example
      navigate('/login');
      setIsLoading(false);
    }, 800);
  };

  // Custom SVG Icons as components
  const HomeIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );

  const HeartIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );

  const UserIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  const QuestionIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const LogoutIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );

  const PhoneIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );

  const EmailIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  const CalendarIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  const WarningIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    </svg>
  );

  const DocumentIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  const EditIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );

  const LocationIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  const BookIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );

  const ChatIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );

  // Health History Component
  const HealthHistory = () => (
    <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 tracking-tight">
        Health History
      </h1>

      {/* Recent Medical Visits */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-all duration-300 mb-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <CalendarIcon />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Recent Medical Visits
          </h2>
        </div>

        <div className="space-y-6">
          {/* General Checkup */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-xl pl-6 pr-4 py-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg text-gray-900">General Checkup</h3>
              <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Sept 10, 2024</span>
            </div>
            <div className="space-y-2 mb-3">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-gray-900">Doctor:</span> Dr. Priya Nair
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold text-gray-900">Result:</span> <span className="text-green-600 font-semibold">Normal</span>
              </p>
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-sm font-bold text-gray-800 mb-2">
                💊 Prescriptions:
              </p>
              <ul className="text-sm text-gray-700 ml-4 space-y-1">
                <li>• Vitamin D supplement</li>
              </ul>
            </div>
          </div>

          {/* Lab Test */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 rounded-r-xl pl-6 pr-4 py-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg text-gray-900">Lab Test</h3>
              <span className="text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">Aug 15, 2024</span>
            </div>
            <div className="space-y-2 mb-3">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-gray-900">Doctor:</span> Dr. Kumar
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold text-gray-900">Result:</span> <span className="text-amber-600 font-semibold">Blood sugar slightly elevated</span>
              </p>
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-sm font-bold text-gray-800 mb-2">
                💊 Prescriptions:
              </p>
              <ul className="text-sm text-gray-700 ml-4 space-y-1">
                <li>• Diet modification</li>
                <li>• Metformin 500mg</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Healthcare Support */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-2 border-green-200 p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
            <PhoneIcon />
          </div>
          <h2 className="text-xl font-bold text-green-800">
            Healthcare Support
          </h2>
        </div>

        <div className="space-y-4">
          {/* 24/7 Helpline */}
          <div className="bg-white rounded-xl p-5 shadow-md border border-green-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <PhoneIcon />
              </div>
              <div>
                <h3 className="font-bold text-green-900 text-base">
                  24/7 Healthcare Helpline
                </h3>
                <p className="text-sm text-green-700 font-medium">
                  Available in English & Malayalam
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Hotline */}
          <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-green-100">
            <div className="p-2 bg-green-100 rounded-lg">
              <PhoneIcon />
            </div>
            <div>
              <p className="font-bold text-green-900">Emergency Hotline</p>
              <p className="text-sm text-green-700 font-semibold">+91 1800 425 1425</p>
            </div>
          </div>

          {/* Health Support */}
          <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-green-100">
            <div className="p-2 bg-green-100 rounded-lg">
              <EmailIcon />
            </div>
            <div>
              <p className="font-bold text-green-900">Health Support</p>
              <p className="text-sm text-green-700 font-semibold">
                health@swaasthyam.gov.in
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="text-blue-600">
                <WarningIcon />
              </div>
              <p className="text-sm text-blue-800 font-medium">
                For health data updates, contact your assigned healthcare officer
              </p>
            </div>
          </div>

          <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300">
            📞 Contact Healthcare Officer
          </button>
        </div>
      </div>
    </div>
  );

  // Profile Component
  const ProfileSection = () => (
    <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 tracking-tight">
        My Profile
      </h1>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <UserIcon />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm flex items-center space-x-2 shadow-md hover:shadow-lg transition-all duration-300">
            <EditIcon />
            <span>Edit</span>
          </button>
        </div>

        <div className="flex items-start space-x-6 mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
            RK
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-2xl text-gray-900 mb-2">Rajesh Kumar</h3>
            <p className="text-sm text-gray-500 mb-3 font-medium">
              QR ID: <span className="text-blue-600 font-bold">SW-2024-KL-001234</span>
            </p>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-bold shadow-md">
              <span className="mr-2">✓</span> Verified Worker
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">Date of Birth</p>
              <p className="font-bold text-gray-900 text-lg">15 January 1988</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">Gender</p>
              <p className="font-bold text-gray-900 text-lg">Male</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl">
              <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">Blood Group</p>
              <p className="font-bold text-gray-900 text-lg">B+</p>
            </div>
          </div>
          <div className="space-y-5">
            <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl">
              <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">Mobile Number</p>
              <p className="font-bold text-gray-900 text-lg">+91 98765 43210</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl">
              <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">Emergency Contact</p>
              <p className="font-bold text-gray-900 text-lg">+91 98765 43211</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
              <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">Email</p>
              <p className="font-bold text-gray-900 text-base">rajesh.kumar@email.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Work Information */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
            <LocationIcon />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Work Information</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
            <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">Current State</p>
            <p className="font-bold text-gray-900 text-lg">Kerala</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
            <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">Home State</p>
            <p className="font-bold text-gray-900 text-lg">Bihar</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl">
            <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">Occupation</p>
            <p className="font-bold text-gray-900 text-lg">Construction Worker</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
            <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">Registered Since</p>
            <p className="font-bold text-gray-900 text-lg">March 2024</p>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
            <DocumentIcon />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Documents</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer border border-green-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                <DocumentIcon />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base">Aadhaar Card</p>
                <p className="text-xs text-gray-600 font-medium">Verified • XXXX-XXXX-1234</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full shadow-sm">✓ Verified</span>
          </div>

          <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer border border-blue-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                <DocumentIcon />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base">Health Card</p>
                <p className="text-xs text-gray-600 font-medium">Active • SW-2024-KL-001234</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full shadow-sm">✓ Active</span>
          </div>

          <button 
            onClick={() => navigate('/digilocker', { 
              state: { 
                userName: 'Rajesh Kumar',
                userQRId: 'SW-2024-KL-001234'
              } 
            })}
            className="w-full mt-3 p-5 border-2 border-dashed border-blue-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 text-blue-600 font-bold flex items-center justify-center space-x-3 hover:shadow-md"
          >
            <img src="/Cooked-Coders/assets/lock.png" className="h-6 w-6" alt="DigiLocker" />
            <span className="text-base">View All Documents in DigiLocker</span>
          </button>
        </div>
      </div>

      {/* Medical Conditions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl">
            <HeartIcon />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Medical Conditions</h2>
        </div>

        <div className="space-y-4">
          <div className="p-5 bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 rounded-r-xl shadow-sm">
            <p className="font-bold text-amber-900 text-base mb-2">Pre-Diabetes</p>
            <p className="text-sm text-amber-700 font-medium">Monitoring required • Under medication</p>
          </div>

          <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-r-xl shadow-sm">
            <p className="font-bold text-blue-900 text-base mb-2">Vitamin D Deficiency</p>
            <p className="text-sm text-blue-700 font-medium">Supplements prescribed</p>
          </div>
        </div>

        <div className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
          <div className="flex items-start space-x-3">
            <div className="text-gray-600">
              <WarningIcon />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 mb-1">View Only Access</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Contact your assigned healthcare officer to update medical information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Help Component
  const HelpSection = () => (
    <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 tracking-tight">
        Help & Support
      </h1>

      {/* Emergency Contacts */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border-2 border-red-200 p-6 md:p-8 mb-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl">
            <PhoneIcon />
          </div>
          <h2 className="text-xl font-bold text-red-900">Emergency Contacts</h2>
        </div>

        <div className="space-y-4">
          <a href="tel:112" className="block p-5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="font-bold text-xl mb-1">Emergency Services</p>
                <p className="text-sm text-red-100 font-medium">Police, Ambulance, Fire</p>
              </div>
              <p className="font-black text-4xl">112</p>
            </div>
          </a>

          <a href="tel:18004251425" className="block p-5 bg-white border-2 border-red-200 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-lg text-red-900 mb-1">Healthcare Helpline</p>
                <p className="text-sm text-red-700 font-medium">24/7 Medical Support</p>
              </div>
              <p className="font-black text-2xl text-red-900">1800-425-1425</p>
            </div>
          </a>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
            <QuestionIcon />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Quick Actions</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-300 text-left border border-blue-200 shadow-sm hover:shadow-md">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <PhoneIcon />
              </div>
              <div>
                <p className="font-bold text-blue-900 mb-1 text-base">Contact Healthcare Officer</p>
                <p className="text-sm text-blue-700 font-medium">Get in touch with your assigned officer</p>
              </div>
            </div>
          </button>

          <button className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition-all duration-300 text-left border border-green-200 shadow-sm hover:shadow-md">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CalendarIcon />
              </div>
              <div>
                <p className="font-bold text-green-900 mb-1 text-base">Schedule Checkup</p>
                <p className="text-sm text-green-700 font-medium">Book your next health checkup</p>
              </div>
            </div>
          </button>

          <button className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl transition-all duration-300 text-left border border-purple-200 shadow-sm hover:shadow-md">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DocumentIcon />
              </div>
              <div>
                <p className="font-bold text-purple-900 mb-1 text-base">Request Health Report</p>
                <p className="text-sm text-purple-700 font-medium">Download your medical records</p>
              </div>
            </div>
          </button>

          <button className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 rounded-xl transition-all duration-300 text-left border border-orange-200 shadow-sm hover:shadow-md">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ChatIcon />
              </div>
              <div>
                <p className="font-bold text-orange-900 mb-1 text-base">Live Chat Support</p>
                <p className="text-sm text-orange-700 font-medium">Chat with support team</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
            <BookIcon />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-5">
          <div className="p-5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border-l-4 border-blue-400">
            <h3 className="font-bold text-gray-900 mb-2 text-base">How do I access my health records?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              You can view your health records in the "Health" section of this dashboard. For detailed documents, click on "View All Documents in DigiLocker" in your profile section.
            </p>
          </div>

          <div className="p-5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border-l-4 border-green-400">
            <h3 className="font-bold text-gray-900 mb-2 text-base">Can I update my personal information?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Yes, you can request updates by contacting your healthcare officer. Some basic information can be edited directly through the profile section.
            </p>
          </div>

          <div className="p-5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border-l-4 border-purple-400">
            <h3 className="font-bold text-gray-900 mb-2 text-base">How do I schedule a health checkup?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              You can schedule checkups by calling the healthcare helpline at 1800-425-1425 or by contacting your assigned healthcare officer directly.
            </p>
          </div>

          <div className="p-5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border-l-4 border-red-400">
            <h3 className="font-bold text-gray-900 mb-2 text-base">What should I do in case of a medical emergency?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Immediately call 112 for emergency services or 1800-425-1425 for the 24/7 healthcare helpline. Show your QR ID (SW-2024-KL-001234) to medical staff for quick access to your records.
            </p>
          </div>

          <div className="p-5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border-l-4 border-indigo-400">
            <h3 className="font-bold text-gray-900 mb-2 text-base">Is my health data secure?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Yes, all your health data is encrypted and stored securely. Access is restricted to authorized healthcare personnel and you. We follow strict government data protection guidelines.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
            <EmailIcon />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Contact Information</h2>
        </div>

        <div className="space-y-5">
          <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
            <div className="p-2 bg-blue-100 rounded-lg">
              <PhoneIcon />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-base">Phone Support</p>
              <p className="text-base text-blue-600 font-semibold mt-1">1800-425-1425 (Toll-Free)</p>
              <p className="text-xs text-gray-600 mt-2 font-medium">Available 24/7 in English, Hindi & Malayalam</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
            <div className="p-2 bg-purple-100 rounded-lg">
              <EmailIcon />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-base">Email Support</p>
              <p className="text-base text-purple-600 font-semibold mt-1">support@swaasthyam.gov.in</p>
              <p className="text-xs text-gray-600 mt-2 font-medium">Response within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
            <div className="p-2 bg-green-100 rounded-lg">
              <LocationIcon />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-base">Office Address</p>
              <p className="text-sm text-gray-700 mt-2 leading-relaxed font-medium">
                Swaasthyam Health Services<br />
                Ministry of Health & Family Welfare<br />
                Government of India
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-5 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-800 flex items-center space-x-3 font-medium">
            <span className="text-2xl">💡</span>
            <span className="leading-relaxed">
              For fastest support, use the 24/7 helpline. Our team is ready to assist you in multiple languages.
            </span>
          </p>
        </div>
      </div>
    </div>
  );

  // Home Dashboard Component
  const HomeDashboard = () => (
    <>
      {/* Welcome Header with Modern Gradient */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 tracking-tight">
            Welcome back, Rajesh Kumar
          </h1>
          <p className="text-blue-50 text-base md:text-lg font-medium">Your health is our priority</p>
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-6 bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Worker Profile Card - Enhanced */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <div className="w-6 h-6 text-white">
                <UserIcon />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Worker Profile
            </h2>
          </div>

          <div className="flex items-start space-x-4 md:space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              RK
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-900 mb-1">
                Rajesh Kumar
              </h3>
              <p className="text-sm text-gray-500 mb-3 font-medium">
                QR ID: <span className="text-blue-600">SW-2024-KL-001234</span>
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="font-semibold mr-2">📞</span> +91 98765 43210
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="font-semibold mr-2">🚨</span> +91 98765 43211 (Emergency)
                </p>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="flex items-center space-x-2 text-blue-700">
                  <WarningIcon />
                  <span className="text-sm font-semibold">View Only Access</span>
                </div>
                <p className="text-xs text-blue-600 mt-2 leading-relaxed">
                  Health data can only be viewed. Contact healthcare officer for updates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Health Status Card - Enhanced */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Current Health Status
            </h2>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-bold shadow-md">
              <span className="mr-2">✓</span> Fit for Work
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <p className="text-sm text-gray-600 font-semibold mb-2">Last Check-up</p>
              <p className="text-2xl font-bold text-gray-900">Sept 10, 2024</p>
              <p className="text-xs text-blue-600 mt-1">✓ Completed</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <p className="text-sm text-gray-600 font-semibold mb-2">Next Check-up</p>
              <p className="text-2xl font-bold text-gray-900">Sept 25, 2024</p>
              <p className="text-xs text-purple-600 mt-1">📅 Scheduled</p>
            </div>
          </div>
        </div>

        {/* Emergency Alerts Card - Enhanced */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl">
              <div className="w-6 h-6 text-white">
                <WarningIcon />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Health Alerts
            </h2>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-xl p-5 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <WarningIcon />
              </div>
              <div className="flex-1">
                <p className="text-base font-bold text-amber-900 mb-1">
                  Blood pressure monitoring required
                </p>
                <div className="inline-flex items-center px-3 py-1 bg-amber-200 rounded-full text-xs font-bold text-amber-800 mb-2">
                  Medium Risk
                </div>
                <p className="text-sm text-amber-700 mt-2">📅 Sept 12, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (isLoading) {
    return <LoadingAnimation message="Logging out..." />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-gradient-to-r from-blue-700 to-black text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/Cooked-Coders/assets/logo 2.png"
              alt="Swaasthyam Logo"
              className="w-8 h-8 object-contain"
            />
            <div>
              <h2 className="font-semibold text-lg">Swaasthyam</h2>
              <p className="text-sm text-blue-200">Migrant Worker</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 hover:bg-red-600 rounded-lg transition-colors"
          >
            <LogoutIcon />
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="mt-4">
          <div className="flex space-x-1 overflow-x-auto">
            <button
              onClick={() => setActiveSection("home")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeSection === "home"
                  ? "bg-blue-600 text-white"
                  : "text-blue-200 hover:bg-blue-600"
              }`}
            >
              <HomeIcon />
              <span className="text-sm">Home</span>
            </button>
            <button
              onClick={() => setActiveSection("health")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeSection === "health"
                  ? "bg-blue-600 text-white"
                  : "text-blue-200 hover:bg-blue-600"
              }`}
            >
              <HeartIcon />
              <span className="text-sm">Health</span>
            </button>
            <button
              onClick={() => setActiveSection("profile")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeSection === "profile"
                  ? "bg-blue-600 text-white"
                  : "text-blue-200 hover:bg-blue-600"
              }`}
            >
              <UserIcon />
              <span className="text-sm">Profile</span>
            </button>
            <button
              onClick={() => setActiveSection("help")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeSection === "help"
                  ? "bg-blue-600 text-white"
                  : "text-blue-200 hover:bg-blue-600"
              }`}
            >
              <QuestionIcon />
              <span className="text-sm">Help</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-gradient-to-t from-black to-blue-700 text-white flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-blue-600">
          <div className="flex items-center space-x-3">
            <img
              src="/Cooked-Coders/assets/logo 2.png"
              alt="Swaasthyam Logo"
              className="w-8 h-8 object-contain rounded-lg bg-white p-1"
            />
            <div>
              <h2 className="font-semibold text-lg">Swaasthyam</h2>
              <p className="text-sm text-blue-200">Migrant Worker</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveSection("home")}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${
                  activeSection === "home"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-600"
                }`}
              >
                <HomeIcon />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("health")}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${
                  activeSection === "health"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-600"
                }`}
              >
                <HeartIcon />
                <span>Health</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("profile")}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${
                  activeSection === "profile"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-600"
                }`}
              >
                <UserIcon />
                <span>Profile</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("help")}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${
                  activeSection === "help"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-600"
                }`}
              >
                <QuestionIcon />
                <span>Help</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-600">
          <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors w-full text-left">
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {activeSection === "home" && <HomeDashboard />}
        {activeSection === "health" && <HealthHistory />}
        {activeSection === "profile" && <ProfileSection />}
        {activeSection === "help" && <HelpSection />}
      </div>
    </div>
  );
};

export default MigrantDashboard;
