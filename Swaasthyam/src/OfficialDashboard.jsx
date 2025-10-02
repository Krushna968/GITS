import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";

const OfficialDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle return from worker registration
  useEffect(() => {
    if (location.state?.activeTab) {
      setSelectedTab(location.state.activeTab);
      // Clear the state to avoid re-triggering
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);
  
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
  
  const handleRegisterNewWorker = () => {
    setIsLoading(true);
    // Simulate loading before navigation
    setTimeout(() => {
      navigate('/register-worker', { state: { returnTo: '/official-dashboard', tab: 'workers' } });
      setIsLoading(false);
    }, 500);
  };

  // Sample data based on your screenshots
  const areas = [
    {
      id: "kochi",
      name: "Kochi Metropolitan Area",
      location: "Ernakulam, Kochi",
      workers: 3420,
      activeAlerts: 3,
      officers: [
        {
          id: "1",
          name: "Dr. Rajesh Kumar",
          role: "Healthcare Officer",
          specialization: "Occupational Health",
          totalAssigned: 198,
          activeAlerts: 3,
          phone: "+91 98765 43213",
          email: "rajesh.k@health.gov.in",
        },
        {
          id: "2",
          name: "Lakshmi Nair",
          role: "Supervisor",
          specialization: "Industrial Safety",
          totalAssigned: 156,
          activeAlerts: 1,
          phone: "+91 98765 43214",
          email: "lakshmi.n@health.gov.in",
        },
        {
          id: "3",
          name: "NGO Officer",
          role: "NGO Officer",
          specialization: "Community Health",
          totalAssigned: 85,
          activeAlerts: 0,
        },
      ],
    },
    {
      id: "tvm",
      name: "Thiruvananthapuram South",
      location: "Thiruvananthapuram, Kollam",
      workers: 2850,
      activeAlerts: 4,
      officers: [
        {
          id: "4",
          name: "Dr. Rajesh Kumar",
          role: "Healthcare Officer",
          specialization: "Occupational Health",
          totalAssigned: 198,
          activeAlerts: 3,
          phone: "+91 98765 43213",
          email: "rajesh.k@health.gov.in",
        },
        {
          id: "5",
          name: "Lakshmi Nair",
          role: "Supervisor",
          specialization: "Industrial Safety",
          totalAssigned: 156,
          activeAlerts: 1,
          phone: "+91 98765 43214",
          email: "lakshmi.n@health.gov.in",
        },
      ],
    },
    {
      id: "malabar",
      name: "Malabar North Region",
      location: "Kozhikode, Kannur, Kasaragod",
      workers: 4180,
      activeAlerts: 4,
      officers: [
        {
          id: "6",
          name: "Dr. Priya Nair",
          role: "Healthcare Officer",
          specialization: "General Medicine",
          totalAssigned: 220,
          activeAlerts: 2,
          phone: "+91 98765 43215",
          email: "priya.n@health.gov.in",
        },
      ],
    },
  ];

  const workers = [
    {
      id: "w1",
      name: "Rajesh Kumar",
      status: "Fit",
      alerts: 1,
      qrId: "SW-2024-KL-001234",
      phone: "+91 98765 43210",
      workplace: "Metro Construction Site 1",
      lastCheckup: "2024-09-10",
      nextCheckup: "2024-09-25",
      healthScore: 92,
      documents: 3,
      emergencyContact: "+91 98765 43211",
    },
    {
      id: "w2",
      name: "Anil Varma",
      status: "Attention",
      alerts: 2,
      qrId: "SW-2024-KL-001235",
      phone: "+91 98765 43220",
      workplace: "Metro Construction Site 1",
      lastCheckup: "2024-09-08",
      nextCheckup: "2024-09-22",
      healthScore: 78,
      documents: 2,
      emergencyContact: "+91 98765 43221",
    },
    {
      id: "w3",
      name: "Suresh Kumar",
      status: "Fit",
      alerts: 0,
      qrId: "SW-2024-KL-001236",
      phone: "+91 98765 43230",
      workplace: "Construction Sites",
      lastCheckup: "2024-09-12",
      nextCheckup: "2024-09-28",
      healthScore: 89,
      documents: 3,
      emergencyContact: "+91 98765 43231",
    },
  ];

  const providers = [
    {
      id: 1,
      name: "Dr. Priya Nair",
      field: "General Medicine",
      location: "Kochi",
      phone: "+91 98765 43210",
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      field: "Occupational Health",
      location: "Thiruvananthapuram",
      phone: "+91 98765 43211",
    },
    {
      id: 3,
      name: "Dr. Maya Menon",
      field: "Industrial Safety",
      location: "Kozhikode",
      phone: "+91 98765 43212",
    },
    {
      id: 4,
      name: "Dr. Arun Nair",
      field: "Emergency Medicine",
      location: "Kollam",
      phone: "+91 98765 43213",
    },
  ];

  const chartData = {
    diseaseCategories: [
      "Tuberculosis",
      "Fever",
      "Respiratory Issues",
      "Diabetes",
      "Skin Infections",
      "Hypertension",
      "Malaria",
      "Dengue",
    ],
    diseaseValues: [45, 75, 35, 25, 55, 65, 30, 40],
    diseaseColors: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"],
    complianceData: [95, 92, 88, 90, 94, 96, 93, 91, 89, 92, 94, 95],
    monthlyLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    healthStatusData: [
      { status: "Fit", count: 12450, percentage: 80.5, color: "#22c55e" },
      { status: "Attention", count: 2100, percentage: 13.6, color: "#f59e0b" },
      { status: "Critical", count: 870, percentage: 5.6, color: "#ef4444" },
      { status: "Pending", count: 485, percentage: 3.1, color: "#6b7280" }
    ],
    districtData: [
      { name: "Ernakulam", workers: 3420, alerts: 3, healthScore: 85, color: "#22c55e" },
      { name: "Thiruvananthapuram", workers: 2850, alerts: 4, healthScore: 78, color: "#f59e0b" },
      { name: "Kozhikode", workers: 2180, alerts: 2, healthScore: 88, color: "#22c55e" },
      { name: "Thrissur", workers: 1950, alerts: 1, healthScore: 92, color: "#22c55e" },
      { name: "Kollam", workers: 1680, alerts: 3, healthScore: 82, color: "#f59e0b" },
      { name: "Kannur", workers: 1420, alerts: 2, healthScore: 86, color: "#22c55e" },
      { name: "Palakkad", workers: 1280, alerts: 1, healthScore: 90, color: "#22c55e" },
      { name: "Malappuram", workers: 1150, alerts: 2, healthScore: 84, color: "#f59e0b" },
      { name: "Kasaragod", workers: 980, alerts: 1, healthScore: 87, color: "#22c55e" },
      { name: "Wayanad", workers: 750, alerts: 0, healthScore: 94, color: "#22c55e" },
      { name: "Idukki", workers: 680, alerts: 1, healthScore: 89, color: "#22c55e" },
      { name: "Pathanamthitta", workers: 520, alerts: 0, healthScore: 91, color: "#22c55e" },
      { name: "Alappuzha", workers: 480, alerts: 1, healthScore: 88, color: "#22c55e" },
      { name: "Kottayam", workers: 420, alerts: 0, healthScore: 93, color: "#22c55e" }
    ]
  };

  if (isLoading) {
    return <LoadingAnimation message="Processing..." />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-gradient-to-r from-blue-700 to-black text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src="/Cooked-Coders/assets/logo 2.png"
              alt="Swaasthyam Logo"
              className="w-8 h-8 object-contain mr-3"
            />
            <div>
              <h1 className="text-white text-lg font-semibold">Swaasthyam</h1>
              <span className="text-blue-300 text-xs">Official</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 font-medium p-2 rounded-lg hover:bg-red-600/20 transition-colors"
          >
            🚪 Logout
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="flex space-x-1 overflow-x-auto">
          <button
            className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${
              selectedTab === "dashboard"
                ? "bg-blue-900 text-white"
                : "text-blue-200 hover:bg-blue-800"
            }`}
            onClick={() => {
              setSelectedTab("dashboard");
              setSelectedArea(null);
              setSelectedOfficer(null);
            }}
          >
            🏠 Dashboard
          </button>
          <button
            className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${
              selectedTab === "area"
                ? "bg-blue-900 text-white"
                : "text-blue-200 hover:bg-blue-800"
            }`}
            onClick={() => {
              setSelectedTab("area");
              setSelectedArea(null);
              setSelectedOfficer(null);
            }}
          >
            🗺️ Area
          </button>
          <button
            className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${
              selectedTab === "analytics"
                ? "bg-blue-900 text-white"
                : "text-blue-200 hover:bg-blue-800"
            }`}
            onClick={() => {
              setSelectedTab("analytics");
              setSelectedArea(null);
              setSelectedOfficer(null);
            }}
          >
            📊 Analytics
          </button>
          <button
            className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${
              selectedTab === "workers"
                ? "bg-blue-900 text-white"
                : "text-blue-200 hover:bg-blue-800"
            }`}
            onClick={() => {
              setSelectedTab("workers");
              setSelectedArea(null);
              setSelectedOfficer(null);
            }}
          >
            👥 Workers
          </button>
          <button
            className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${
              selectedTab === "help"
                ? "bg-blue-900 text-white"
                : "text-blue-200 hover:bg-blue-800"
            }`}
            onClick={() => {
              setSelectedTab("help");
              setSelectedArea(null);
              setSelectedOfficer(null);
            }}
          >
            ❓ Help
          </button>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex w-64 p-4 flex-col"
        style={{
          background: "linear-gradient(to bottom, #1d4ed8, #000000)",
        }}
      >
        <div className="flex items-center mb-8">
          <img
            src="/Cooked-Coders/assets/logo 2.png"
            alt="Swaasthyam Logo"
            className="w-8 h-8 object-contain bg-white rounded p-1 mr-3"
          />
          <div>
            <h1 className="text-white text-lg font-semibold">Swaasthyam</h1>
            <span className="text-blue-300 text-xs">Official</span>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <button
            className={`w-full text-left px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
              selectedTab === "dashboard"
                ? "bg-blue-900 text-white"
                : "text-blue-200 hover:bg-blue-800"
            }`}
            onClick={() => {
              setSelectedTab("dashboard");
              setSelectedArea(null);
              setSelectedOfficer(null);
            }}
          >
            🏠 Dashboard
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
              selectedTab === "area"
                ? "bg-blue-900 text-white"
                : "text-blue-200 hover:bg-blue-800"
            }`}
            onClick={() => {
              setSelectedTab("area");
              setSelectedArea(null);
              setSelectedOfficer(null);
            }}
          >
            🗺️ Area Management
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
              selectedTab === "analytics"
                ? "bg-blue-900 text-white"
                : "text-blue-200 hover:bg-blue-800"
            }`}
            onClick={() => {
              setSelectedTab("analytics");
              setSelectedArea(null);
              setSelectedOfficer(null);
            }}
          >
            📊 Analytics
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
              selectedTab === "workers"
                ? "bg-blue-900 text-white"
                : "text-blue-200 hover:bg-blue-800"
            }`}
            onClick={() => {
              setSelectedTab("workers");
              setSelectedArea(null);
              setSelectedOfficer(null);
            }}
          >
            👥 Workers
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
              selectedTab === "help"
                ? "bg-blue-900 text-white"
                : "text-blue-200 hover:bg-blue-800"
            }`}
            onClick={() => {
              setSelectedTab("help");
              setSelectedArea(null);
              setSelectedOfficer(null);
            }}
          >
            ❓ Help
          </button>
        </nav>

        <button onClick={handleLogout} className="mt-auto text-red-400 hover:text-red-300 font-medium">
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Dashboard Tab */}
        {selectedTab === "dashboard" && (
          <div className="p-4 md:p-6">
            <div className="bg-blue-600 text-white p-4 md:p-6 rounded-lg mb-6">
              <h1 className="text-xl md:text-2xl font-bold mb-2">Officials Dashboard</h1>
              <p className="text-blue-100 text-sm md:text-base">
                Comprehensive health monitoring and management system
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-gray-800">15,420</div>
                <div className="text-gray-600 mt-1">Total Workers</div>
                <div className="text-blue-600 text-sm mt-1">👥</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-green-600">14,850</div>
                <div className="text-gray-600 mt-1">Registered</div>
                <div className="text-green-600 text-sm mt-1">🛡️</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-green-600">13,920</div>
                <div className="text-gray-600 mt-1">Active</div>
                <div className="text-green-600 text-sm mt-1">📈</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-red-600">485</div>
                <div className="text-gray-600 mt-1">Pending Reviews</div>
                <div className="text-red-600 text-sm mt-1">⏰</div>
              </div>
            </div>

            {/* Emergency Alerts */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="text-yellow-600 mr-2">⚠️</div>
                <h3 className="font-semibold text-gray-800">
                  Emergency Alert System
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded border-l-4 border-red-500">
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded mr-2">
                        Critical
                      </span>
                      <span className="text-sm text-gray-600">2024-09-13</span>
                    </div>
                    <div className="font-medium">
                      TB outbreak detected in Ernakulam district
                    </div>
                    <div className="text-sm text-gray-600">
                      📍 Ernakulam • 12 workers affected
                    </div>
                  </div>
                  <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm">
                    Alert
                  </button>
                </div>

                <div className="flex justify-between items-center p-3 bg-white rounded border-l-4 border-orange-500">
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded mr-2">
                        High
                      </span>
                      <span className="text-sm text-gray-600">2024-09-12</span>
                    </div>
                    <div className="font-medium">
                      Fever spike in construction sites
                    </div>
                    <div className="text-sm text-gray-600">
                      📍 Kochi • 8 workers affected
                    </div>
                  </div>
                  <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm">
                    Alert
                  </button>
                </div>

                <div className="flex justify-between items-center p-3 bg-white rounded border-l-4 border-blue-500">
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded mr-2">
                        Medium
                      </span>
                      <span className="text-sm text-gray-600">2024-09-11</span>
                    </div>
                    <div className="font-medium">Routine screening overdue</div>
                    <div className="text-sm text-gray-600">
                      📍 Kollam • 25 workers affected
                    </div>
                  </div>
                  <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm">
                    Alert
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4">
              <button className="bg-gradient-to-r from-purple-900 to-blue-800 text-white p-4 rounded-lg font-medium hover:shadow-lg transition-shadow">
                📊 Generate Report
              </button>
              <button className="border-2 border-red-500 text-red-500 p-4 rounded-lg font-medium hover:bg-red-50 transition-colors">
                🚨 Alert Health Dept
              </button>
              <button className="border-2 border-blue-500 text-blue-500 p-4 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                🏥 Resource Allocation
              </button>
            </div>
          </div>
        )}

        {/* Area Management Tab */}
        {selectedTab === "area" && (
          <div className="p-4 md:p-6">
            {!selectedArea && !selectedOfficer && (
              <div>
                <div className="bg-blue-600 text-white p-6 rounded-lg mb-6">
                  <h1 className="text-2xl font-bold mb-2">Area Management</h1>
                  <p className="text-blue-100">
                    Manage officers and workers across assigned geographic areas
                  </p>
                </div>

                <div className="space-y-6">
                  {areas.map((area) => (
                    <div
                      key={area.id}
                      className="bg-white rounded-lg shadow-sm p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">
                            📍 {area.name}
                          </h3>
                          <p className="text-gray-600">{area.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-green-600 font-semibold text-lg">
                            {area.workers.toLocaleString()} Workers
                          </div>
                          <div className="text-right">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm mr-2">
                              {area.officers.length} Officers
                            </span>
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                              {area.activeAlerts} Active Alerts
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-2">
                          {area.officers.some(
                            (o) => o.role === "Healthcare Officer"
                          ) && (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                              Healthcare Officer
                            </span>
                          )}
                          {area.officers.some(
                            (o) => o.role === "Supervisor"
                          ) && (
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              Supervisor
                            </span>
                          )}
                          {area.officers.some(
                            (o) => o.role === "NGO Officer"
                          ) && (
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                              NGO Officer
                            </span>
                          )}
                        </div>
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          onClick={() => setSelectedArea(area)}
                        >
                          👥 Officers in Area
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedArea && !selectedOfficer && (
              <div>
                <button
                  className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
                  onClick={() => setSelectedArea(null)}
                >
                  ← Back to Areas
                </button>

                <div className="bg-blue-600 text-white p-6 rounded-lg mb-6">
                  <h1 className="text-2xl font-bold mb-2">
                    {selectedArea.name} - Officers in Area
                  </h1>
                  <p className="text-blue-100">
                    {selectedArea.officers.length} officers managing{" "}
                    {selectedArea.workers.toLocaleString()} workers
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedArea.officers.map((officer) => (
                    <div
                      key={officer.id}
                      className="bg-white rounded-lg shadow-sm p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {officer.name}
                          </h3>
                          <p className="text-gray-600">
                            {officer.specialization}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm text-white ${
                            officer.role === "Healthcare Officer"
                              ? "bg-green-600"
                              : officer.role === "Supervisor"
                              ? "bg-blue-600"
                              : "bg-purple-600"
                          }`}
                        >
                          {officer.role}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            {officer.totalAssigned}
                          </div>
                          <div className="text-sm text-gray-600">
                            Assigned Workers
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-600">
                            {officer.activeAlerts}
                          </div>
                          <div className="text-sm text-gray-600">
                            Active Alerts
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 space-y-1 text-sm text-gray-600">
                        {officer.phone && <div>📞 {officer.phone}</div>}
                        {officer.email && <div>📧 {officer.email}</div>}
                      </div>

                      <div className="flex space-x-3">
                        <button
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          onClick={() => setSelectedOfficer(officer)}
                        >
                          View Officer
                        </button>
                        <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                          Contact Officer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedOfficer && (
              <div>
                <button
                  className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
                  onClick={() => setSelectedOfficer(null)}
                >
                  ← Back to Officers
                </button>

                <div className="bg-blue-600 text-white p-6 rounded-lg mb-6">
                  <h1 className="text-2xl font-bold mb-2">
                    {selectedOfficer.name} - Officer Details
                  </h1>
                  <p className="text-blue-100">
                    Supervisor • {selectedOfficer.specialization}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-3">
                      Officer Information
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <strong>Contact Information</strong>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>📞</span>
                        <a
                          href={`tel:${selectedOfficer.phone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {selectedOfficer.phone}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>📧</span>
                        <a
                          href={`mailto:${selectedOfficer.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {selectedOfficer.email}
                        </a>
                      </div>
                      <div>
                        <strong>Specialization</strong>
                      </div>
                      <div>{selectedOfficer.specialization}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {selectedOfficer.totalAssigned}
                      </div>
                      <div className="text-gray-600">Assigned Workers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">
                        {selectedOfficer.activeAlerts}
                      </div>
                      <div className="text-gray-600">Active Alerts</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-4">
                      👥 Assigned Workers
                    </h4>
                    <div className="space-y-4">
                      {workers.slice(0, 2).map((worker) => (
                        <div
                          key={worker.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-semibold">{worker.name}</div>
                            <div className="flex space-x-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs text-white ${
                                  worker.status === "Fit"
                                    ? "bg-green-600"
                                    : "bg-red-600"
                                }`}
                              >
                                {worker.status}
                              </span>
                              {worker.alerts > 0 && (
                                <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                                  {worker.alerts} Alerts
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <div>QR ID: {worker.qrId}</div>
                              <div>Phone: {worker.phone}</div>
                              <div>Workplace: {worker.workplace}</div>
                            </div>
                            <div>
                              <div>Last Checkup: {worker.lastCheckup}</div>
                              <div>Next Checkup: {worker.nextCheckup}</div>
                              <div>Health Score: {worker.healthScore}/100</div>
                            </div>
                          </div>

                          <div className="mt-3 text-sm text-gray-600">
                            <div>
                              Documents: {worker.documents} • Emergency:{" "}
                              {worker.emergencyContact}
                            </div>
                          </div>

                          <button className="mt-3 border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                            View Details
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {selectedTab === "analytics" && (
          <div className="p-4 md:p-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 md:p-6 rounded-lg mb-6">
              <h1 className="text-xl md:text-2xl font-bold mb-2">📊 Health Analytics Dashboard</h1>
              <p className="text-blue-100 text-sm md:text-base">Comprehensive health data visualization and insights</p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                <div className="text-2xl font-bold text-green-600">15,420</div>
                <div className="text-gray-600 text-sm">Total Workers</div>
                <div className="text-green-600 text-xs">↑ 5.2% from last month</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                <div className="text-2xl font-bold text-blue-600">92.3%</div>
                <div className="text-gray-600 text-sm">Health Compliance</div>
                <div className="text-blue-600 text-xs">↑ 2.1% from last month</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
                <div className="text-2xl font-bold text-orange-600">23</div>
                <div className="text-gray-600 text-sm">Active Alerts</div>
                <div className="text-orange-600 text-xs">↓ 3 from last week</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
                <div className="text-2xl font-bold text-purple-600">14</div>
                <div className="text-gray-600 text-sm">Districts Covered</div>
                <div className="text-purple-600 text-xs">100% coverage</div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Enhanced Disease Trend Analysis - Bar Chart */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  🦠 Disease Trend Analysis
                  <span className="ml-2 text-sm text-gray-500">(Cases per 1000 workers)</span>
                </h3>
                <div className="flex items-end space-x-2 h-64 mb-4">
                  {chartData.diseaseCategories.map((category, index) => (
                    <div
                      key={category}
                      className="flex-1 flex flex-col items-center group cursor-pointer"
                    >
                      <div
                        className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80 relative"
                        style={{
                          height: `${(chartData.diseaseValues[index] / 80) * 100}%`,
                          backgroundColor: chartData.diseaseColors[index]
                        }}
                        title={`${category}: ${chartData.diseaseValues[index]} cases`}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {chartData.diseaseValues[index]}
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 mt-2 text-center transform -rotate-45 origin-center w-16">
                        {category}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Total Cases:</span> {chartData.diseaseValues.reduce((a, b) => a + b, 0)} across all categories
                </div>
              </div>

              {/* Health Status Distribution - Pie Chart */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-4">📊 Health Status Distribution</h3>
                <div className="flex items-center justify-center h-64">
                  <div className="relative w-48 h-48">
                    {/* Pie Chart using CSS */}
                    <div className="absolute inset-0 rounded-full" style={{
                      background: `conic-gradient(
                        ${chartData.healthStatusData[0].color} 0deg ${chartData.healthStatusData[0].percentage * 3.6}deg,
                        ${chartData.healthStatusData[1].color} ${chartData.healthStatusData[0].percentage * 3.6}deg ${(chartData.healthStatusData[0].percentage + chartData.healthStatusData[1].percentage) * 3.6}deg,
                        ${chartData.healthStatusData[2].color} ${(chartData.healthStatusData[0].percentage + chartData.healthStatusData[1].percentage) * 3.6}deg ${(chartData.healthStatusData[0].percentage + chartData.healthStatusData[1].percentage + chartData.healthStatusData[2].percentage) * 3.6}deg,
                        ${chartData.healthStatusData[3].color} ${(chartData.healthStatusData[0].percentage + chartData.healthStatusData[1].percentage + chartData.healthStatusData[2].percentage) * 3.6}deg 360deg
                      )`
                    }}></div>
                    <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">15,420</div>
                        <div className="text-sm text-gray-600">Total Workers</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {chartData.healthStatusData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <div className="text-sm">
                        <div className="font-medium">{item.status}</div>
                        <div className="text-gray-600">{item.count.toLocaleString()} ({item.percentage}%)</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Line Chart for Health Compliance */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                📈 Health Record Compliance Trend
                <span className="ml-2 text-sm text-gray-500">(Monthly Average)</span>
              </h3>
              <div className="relative h-64 bg-gray-50 rounded-lg p-4">
                <div className="absolute top-4 right-4 text-sm text-gray-600">
                  Current: 95%
                </div>
                {/* Line Chart using CSS */}
                <div className="relative h-full">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    <defs>
                      <linearGradient id="complianceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map((y, i) => (
                      <line key={i} x1="40" y1={200 - (y * 1.6)} x2="380" y2={200 - (y * 1.6)} stroke="#e5e7eb" strokeWidth="1"/>
                    ))}
                    {/* Data line */}
                    <polyline
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="3"
                      points={chartData.complianceData.map((value, index) => 
                        `${40 + (index * 28)},${200 - (value * 1.6)}`
                      ).join(' ')}
                    />
                    {/* Area under curve */}
                    <polygon
                      fill="url(#complianceGradient)"
                      points={`40,200 ${chartData.complianceData.map((value, index) => 
                        `${40 + (index * 28)},${200 - (value * 1.6)}`
                      ).join(' ')} 380,200`}
                    />
                    {/* Data points */}
                    {chartData.complianceData.map((value, index) => (
                      <circle
                        key={index}
                        cx={40 + (index * 28)}
                        cy={200 - (value * 1.6)}
                        r="4"
                        fill="#22c55e"
                        className="hover:r-6 transition-all cursor-pointer"
                      />
                    ))}
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 p-2">
                  {chartData.monthlyLabels.map((label, index) => (
                    <span key={index}>{label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Health Map */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                🗺️ Health Map - District-wise Analysis
                <span className="ml-2 text-sm text-gray-500">(Click districts for details)</span>
              </h3>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 h-96 rounded-lg p-4 relative overflow-hidden">
                {/* Simplified Health Map Layout */}
                <div className="relative w-full h-full">
                  {/* Map Grid */}
                  <div className="grid grid-cols-4 gap-2 h-full">
                    {chartData.districtData.slice(0, 12).map((district, index) => (
                      <div
                        key={district.name}
                        className="relative group cursor-pointer"
                        style={{
                          backgroundColor: district.color + '20',
                          border: `2px solid ${district.color}`,
                          borderRadius: '8px'
                        }}
                      >
                        <div className="p-2 h-full flex flex-col justify-between">
                          <div className="text-xs font-medium text-gray-800 truncate">
                            {district.name}
                          </div>
                          <div className="text-xs text-gray-600">
                            <div>{district.workers.toLocaleString()} workers</div>
                            <div className="flex items-center justify-between">
                              <span>Score: {district.healthScore}</span>
                              {district.alerts > 0 && (
                                <span className="bg-red-500 text-white px-1 rounded text-xs">
                                  {district.alerts}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Hover tooltip */}
                        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                          <div className="font-medium">{district.name}</div>
                          <div>Workers: {district.workers.toLocaleString()}</div>
                          <div>Health Score: {district.healthScore}/100</div>
                          <div>Alerts: {district.alerts}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Map Legend */}
                  <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-sm font-medium mb-2">Health Score Legend</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span>90-100 (Excellent)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                        <span>80-89 (Good)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                        <span>Below 80 (Needs Attention)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Healthcare Provider Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center">
                  🏥 Healthcare Provider Network
                  <span className="ml-2 text-sm text-gray-500">({providers.length} providers)</span>
                </h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  + Add Provider
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-gray-800">
                        {provider.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {provider.field}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        📍 {provider.location}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="border border-blue-600 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                        Contact
                      </button>
                      <button className="border border-green-600 text-green-600 px-3 py-1 rounded-lg hover:bg-green-50 transition-colors text-sm">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Workers Tab */}
        {selectedTab === "workers" && (
          <div className="p-4 md:p-6">
            <div className="bg-blue-600 text-white p-4 md:p-6 rounded-lg mb-6">
              <h1 className="text-xl md:text-2xl font-bold mb-2">Workers Management</h1>
              <p className="text-blue-100 text-sm md:text-base">
                Manage and monitor all registered workers
              </p>
            </div>

            {/* Worker Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-blue-600">
                  {workers.length}
                </div>
                <div className="text-gray-600 text-sm">Total Workers</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-green-600">
                  {workers.filter(w => w.status === "Fit").length}
                </div>
                <div className="text-gray-600 text-sm">Fit Workers</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-orange-600">
                  {workers.filter(w => w.status === "Attention").length}
                </div>
                <div className="text-gray-600 text-sm">Need Attention</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-red-600">
                  {workers.filter(w => w.alerts > 0).length}
                </div>
                <div className="text-gray-600 text-sm">Active Alerts</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <button 
                onClick={handleRegisterNewWorker}
                className="bg-green-600 text-white p-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>➕</span>
                <span>Register New Worker</span>
              </button>
              <button className="border-2 border-blue-500 text-blue-500 p-4 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
                <span>📊</span>
                <span>Export Worker Data</span>
              </button>
              <button className="border-2 border-purple-500 text-purple-500 p-4 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2">
                <span>🔍</span>
                <span>Bulk Health Check</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">All Workers</h3>
                <div className="flex space-x-3">
                  <select className="border border-gray-300 rounded-lg px-4 py-2">
                    <option>All Status</option>
                    <option>Fit</option>
                    <option>Needs Attention</option>
                    <option>Pending Review</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search workers..."
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <button 
                    onClick={handleRegisterNewWorker}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <span>➕</span>
                    <span>Add Worker</span>
                  </button>
                </div>
              </div>

              {/* Enhanced Worker List */}
              <div className="space-y-4">
                {workers.map((worker) => (
                  <div
                    key={worker.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="font-semibold text-gray-800">
                            {worker.name}
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs text-white ${
                              worker.status === "Fit"
                                ? "bg-green-600"
                                : "bg-red-600"
                            }`}
                          >
                            {worker.status}
                          </span>
                          {worker.alerts > 0 && (
                            <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                              {worker.alerts} Alerts
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <div><strong>QR ID:</strong> {worker.qrId}</div>
                            <div><strong>Phone:</strong> {worker.phone}</div>
                          </div>
                          <div>
                            <div><strong>Workplace:</strong> {worker.workplace}</div>
                            <div><strong>Last Checkup:</strong> {worker.lastCheckup}</div>
                          </div>
                          <div>
                            <div><strong>Health Score:</strong> {worker.healthScore}/100</div>
                            <div><strong>Next Checkup:</strong> {worker.nextCheckup}</div>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          <strong>Documents:</strong> {worker.documents} • 
                          <strong> Emergency:</strong> {worker.emergencyContact}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                          View Details
                        </button>
                        <button className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors text-sm">
                          Add Health Log
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Management Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h4 className="font-semibold text-lg mb-4 text-gray-800">
                  🏥 Health Management Tools
                </h4>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium">Schedule Mass Health Screening</div>
                    <div className="text-sm text-gray-600">Organize health checkups for multiple workers</div>
                  </button>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium">Generate Health Reports</div>
                    <div className="text-sm text-gray-600">Create comprehensive health analytics</div>
                  </button>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium">Vaccination Tracking</div>
                    <div className="text-sm text-gray-600">Monitor vaccination status and schedules</div>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h4 className="font-semibold text-lg mb-4 text-gray-800">
                  📋 Administrative Tools
                </h4>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium">Bulk Worker Import</div>
                    <div className="text-sm text-gray-600">Import multiple worker records from CSV</div>
                  </button>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium">QR Code Generator</div>
                    <div className="text-sm text-gray-600">Generate QR codes for worker identification</div>
                  </button>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium">Compliance Reports</div>
                    <div className="text-sm text-gray-600">Generate regulatory compliance reports</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Tab */}
        {selectedTab === "help" && (
          <div className="p-4 md:p-6 space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
              <h1 className="text-2xl font-bold mb-2">❓ Help & Support Center</h1>
              <p className="text-indigo-100">Comprehensive support for system administrators and officials</p>
            </div>

            {/* Quick Support Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📞</span>
                </div>
                <div className="font-semibold text-gray-900 mb-1">Phone Support</div>
                <div className="text-sm text-gray-600">24/7 Technical</div>
                <div className="text-xs text-blue-600 mt-2 font-medium">1800-425-1425</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-green-300 transition-all cursor-pointer">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <div className="font-semibold text-gray-900 mb-1">Live Chat</div>
                <div className="text-sm text-gray-600">Instant Help</div>
                <div className="text-xs text-green-600 mt-2 font-medium">Click to start</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-orange-300 transition-all cursor-pointer">
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📧</span>
                </div>
                <div className="font-semibold text-gray-900 mb-1">Email Support</div>
                <div className="text-sm text-gray-600">Priority Response</div>
                <div className="text-xs text-orange-600 mt-2 font-medium">admin@swaasthyam.gov.in</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-purple-300 transition-all cursor-pointer">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <div className="font-semibold text-gray-900 mb-1">Documentation</div>
                <div className="text-sm text-gray-600">User Guides</div>
                <div className="text-xs text-purple-600 mt-2 font-medium">View resources</div>
              </div>
            </div>

            {/* Emergency Assistance */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🚨</span>
                <h2 className="text-xl font-semibold text-red-900">Emergency Support</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="tel:112" className="flex items-center p-4 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
                  <div className="flex-1">
                    <div className="font-semibold text-white text-lg">Emergency Services</div>
                    <div className="text-red-100 text-sm">Police, Ambulance, Fire</div>
                  </div>
                  <div className="text-3xl font-bold text-white">112</div>
                </a>
                <a href="tel:18004251425" className="flex items-center p-4 bg-white border-2 border-red-300 hover:bg-red-50 rounded-lg transition-colors">
                  <div className="flex-1">
                    <div className="font-semibold text-red-900 text-lg">System Emergency</div>
                    <div className="text-red-700 text-sm">Critical System Issues</div>
                  </div>
                  <div className="text-2xl font-bold text-red-600">1800-425-1425</div>
                </a>
              </div>
            </div>

            {/* System Administrator FAQs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">❓</span>
                Administrator FAQs
              </h2>
              <div className="space-y-4">
                <details className="group">
                  <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-semibold text-gray-900">How do I manage officer accounts and permissions?</span>
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-sm text-gray-600 border-l-4 border-indigo-300 ml-4 mt-2">
                    Navigate to Area Management, select an area, and view officers. You can assign/revoke permissions, add new officers, and manage their worker assignments from the officer detail page.
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-semibold text-gray-900">How can I view analytics and generate reports?</span>
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-sm text-gray-600 border-l-4 border-indigo-300 ml-4 mt-2">
                    Access the Analytics tab to view comprehensive health data visualizations including disease trends, health status distributions, compliance metrics, and district-wise analysis. Use the "Generate Report" button on the dashboard for custom reports.
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-semibold text-gray-900">How do I handle critical health alerts?</span>
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-sm text-gray-600 border-l-4 border-indigo-300 ml-4 mt-2">
                    Critical alerts appear on the Dashboard with red indicators. Click "Alert" to notify relevant health departments, officers, and initiate emergency protocols. Document all actions taken in the system for compliance and tracking.
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-semibold text-gray-900">How do I allocate resources across districts?</span>
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-sm text-gray-600 border-l-4 border-indigo-300 ml-4 mt-2">
                    Use the "Resource Allocation" button on the dashboard to view current resource distribution. The Analytics health map shows district-wise health scores to identify areas needing additional support. Allocate healthcare providers and officers based on workload and alerts.
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-semibold text-gray-900">What are the data security and compliance protocols?</span>
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-sm text-gray-600 border-l-4 border-indigo-300 ml-4 mt-2">
                    All health data is encrypted at rest and in transit. Access is role-based and logged. The system complies with Indian data protection laws and healthcare regulations. Regular security audits are conducted, and all sensitive operations require additional authentication.
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-semibold text-gray-900">How do I bulk register workers or import data?</span>
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-sm text-gray-600 border-l-4 border-indigo-300 ml-4 mt-2">
                    In the Workers tab, use the "Bulk Worker Import" tool to upload CSV files containing worker data. Download the template first to ensure correct formatting. The system validates all data before import and provides detailed error reports if issues are found.
                  </div>
                </details>
              </div>
            </div>

            {/* System Resources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-xl mr-2">📈</span>
                  System Resources
                </h3>
                <div className="space-y-3">
                  <a href="#" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900">Administrator Guide</div>
                    <div className="text-sm text-gray-600 mt-1">Complete system administration manual</div>
                  </a>
                  <a href="#" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900">API Documentation</div>
                    <div className="text-sm text-gray-600 mt-1">Technical API reference and integration guides</div>
                  </a>
                  <a href="#" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900">Training Videos</div>
                    <div className="text-sm text-gray-600 mt-1">Step-by-step video tutorials</div>
                  </a>
                  <a href="#" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900">Compliance Guidelines</div>
                    <div className="text-sm text-gray-600 mt-1">Healthcare regulations and best practices</div>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-xl mr-2">📞</span>
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3">📱</span>
                    <div>
                      <div className="font-medium text-gray-900">Technical Support</div>
                      <div className="text-sm text-gray-600">1800-425-1425 (Toll-Free)</div>
                      <div className="text-xs text-gray-500 mt-1">24/7 System Support</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3">📧</span>
                    <div>
                      <div className="font-medium text-gray-900">Admin Support Email</div>
                      <div className="text-sm text-gray-600">admin@swaasthyam.gov.in</div>
                      <div className="text-xs text-gray-500 mt-1">Priority response for officials</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3">🏢</span>
                    <div>
                      <div className="font-medium text-gray-900">Central Office</div>
                      <div className="text-sm text-gray-600">
                        Ministry of Health & Family Welfare<br />
                        Government of India<br />
                        New Delhi - 110001
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start">
                <span className="text-3xl mr-4">✅</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    System Status: All Systems Operational
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    All services are running normally. Last system check: 2 minutes ago. 
                    For real-time system status and scheduled maintenance updates, visit the status page or contact technical support.
                  </p>
                  <div className="flex space-x-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                      View System Status
                    </button>
                    <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                      Report Issue
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-xl mr-2">💡</span>
                Quick Tips for Administrators
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-900 mb-2">🔔 Set Up Alert Notifications</div>
                  <div className="text-sm text-blue-700">Configure email and SMS alerts for critical health events to ensure rapid response times.</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-medium text-green-900 mb-2">📊 Regular Data Backups</div>
                  <div className="text-sm text-green-700">System automatically backs up data every 6 hours. Manual backups available in settings.</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="font-medium text-purple-900 mb-2">👥 User Access Management</div>
                  <div className="text-sm text-purple-700">Regularly review and update user permissions. Remove inactive accounts for security.</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="font-medium text-orange-900 mb-2">📈 Monitor System Performance</div>
                  <div className="text-sm text-orange-700">Check analytics dashboard weekly to identify trends and optimize resource allocation.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfficialDashboard;
