import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation data
const translations = {
  en: {
    // Home Page
    welcome: "Welcome to Swaasthyam..!",
    loginRegister: "Login / Register new migrant",
    worldsMostEfficient: "The world's most efficient management tool - voice-enabled health database that streamlines worker monitoring, reporting, and emergency response across languages and database system built for migrant workers.",
    selectLanguage: "Language",
    
    // Features
    realtimeMonitoring: "Real-time health monitoring",
    qrCodeAccess: "QR Code Health Access",
    multiLanguageSupport: "Multi-language support",
    voiceInput: "Voice input health updates",
    
    // Login Page
    swaasthyam: "Swaasthyam",
    digitalHealthRecord: "Digital Health Record Management System for Migrant Workers",
    welcomeToSwaasthyam: "Welcome to Swaasthyam",
    secureHealthRecord: "Secure and comprehensive health record management for migrant workers",
    selectUserType: "Select user type",
    migrantWorker: "Migrant Worker",
    officer: "Officer (Supervisor/Healthcare/NGO)",
    official: "Official (Government)",
    loginWithMobile: "Login with mobile number",
    enterMobile: "Enter mobile number",
    sendOTP: "Send OTP",
    enterOTP: "Enter 6-digit OTP",
    verifyLogin: "Verify and Login",
    loginWithDigiLocker: "Login with DigiLocker",
    scanQRCode: "Scan QR Code",
    tapToActivate: "Tap to activate camera scanner",
    registerNewOfficer: "Register new officer",
    registerNewOfficial: "Register new official",
    secure: "Secure",
    officialGovt: "Official",
    govtInitiative: "Govt. Initiative",
  },
  hi: {
    // Home Page
    welcome: "स्वास्थ्यम में आपका स्वागत है..!",
    loginRegister: "लॉगिन / नया प्रवासी पंजीकरण करें",
    worldsMostEfficient: "दुनिया का सबसे कुशल प्रबंधन उपकरण - वॉयस-सक्षम स्वास्थ्य डेटाबेस जो भाषाओं और डेटाबेस प्रणाली में कार्यकर्ता निगरानी, रिपोर्टिंग और आपातकालीन प्रतिक्रिया को सुव्यवस्थित करता है।",
    selectLanguage: "भाषा",
    
    // Features
    realtimeMonitoring: "वास्तविक समय स्वास्थ्य निगरानी",
    qrCodeAccess: "QR कोड स्वास्थ्य पहुंच",
    multiLanguageSupport: "बहु-भाषा समर्थन",
    voiceInput: "वॉयस इनपुट स्वास्थ्य अपडेट",
    
    // Login Page
    swaasthyam: "स्वास्थ्यम",
    digitalHealthRecord: "प्रवासी कामगारों के लिए डिजिटल स्वास्थ्य रिकॉर्ड प्रबंधन प्रणाली",
    welcomeToSwaasthyam: "स्वास्थ्यम में आपका स्वागत है",
    secureHealthRecord: "प्रवासी कामगारों के लिए सुरक्षित और व्यापक स्वास्थ्य रिकॉर्ड प्रबंधन",
    selectUserType: "उपयोगकर्ता प्रकार चुनें",
    migrantWorker: "प्रवासी कामगार",
    officer: "अधिकारी (पर्यवेक्षक/स्वास्थ्य/एनजीओ)",
    official: "अधिकारी (सरकार)",
    loginWithMobile: "मोबाइल नंबर से लॉगिन करें",
    enterMobile: "मोबाइल नंबर दर्ज करें",
    sendOTP: "OTP भेजें",
    enterOTP: "6 अंकों का OTP दर्ज करें",
    verifyLogin: "सत्यापित करें और लॉगिन करें",
    loginWithDigiLocker: "DigiLocker से लॉगिन करें",
    scanQRCode: "QR कोड स्कैन करें",
    tapToActivate: "कैमरा स्कैनर सक्रिय करने के लिए टैप करें",
    registerNewOfficer: "नया अधिकारी पंजीकृत करें",
    registerNewOfficial: "नया सरकारी अधिकारी पंजीकृत करें",
    secure: "सुरक्षित",
    officialGovt: "आधिकारिक",
    govtInitiative: "सरकारी पहल",
  },
  mr: {
    // Home Page
    welcome: "स्वास्थ्यम मध्ये आपले स्वागत आहे..!",
    loginRegister: "लॉगिन / नवीन स्थलांतरित नोंदणी करा",
    worldsMostEfficient: "जगातील सर्वात कार्यक्षम व्यवस्थापन साधन - आवाज-सक्षम आरोग्य डेटाबेस जो भाषा आणि डेटाबेस प्रणालीमध्ये कामगार निरीक्षण, अहवाल आणि आपत्कालीन प्रतिसाद सुव्यवस्थित करतो।",
    selectLanguage: "भाषा",
    
    // Features
    realtimeMonitoring: "रिअल-टाइम आरोग्य निरीक्षण",
    qrCodeAccess: "QR कोड आरोग्य प्रवेश",
    multiLanguageSupport: "बहु-भाषा समर्थन",
    voiceInput: "आवाज इनपुट आरोग्य अद्यतने",
    
    // Login Page
    swaasthyam: "स्वास्थ्यम",
    digitalHealthRecord: "स्थलांतरित कामगारांसाठी डिजिटल आरोग्य रेकॉर्ड व्यवस्थापन प्रणाली",
    welcomeToSwaasthyam: "स्वास्थ्यम मध्ये आपले स्वागत आहे",
    secureHealthRecord: "स्थलांतरित कामगारांसाठी सुरक्षित आणि सर्वसमावेशक आरोग्य रेकॉर्ड व्यवस्थापन",
    selectUserType: "वापरकर्ता प्रकार निवडा",
    migrantWorker: "स्थलांतरित कामगार",
    officer: "अधिकारी (पर्यवेक्षक/आरोग्य/एनजीओ)",
    official: "अधिकारी (सरकार)",
    loginWithMobile: "मोबाइल नंबरसह लॉगिन करा",
    enterMobile: "मोबाइल नंबर प्रविष्ट करा",
    sendOTP: "OTP पाठवा",
    enterOTP: "6 अंकी OTP प्रविष्ट करा",
    verifyLogin: "सत्यापित करा आणि लॉगिन करा",
    loginWithDigiLocker: "DigiLocker सह लॉगिन करा",
    scanQRCode: "QR कोड स्कॅन करा",
    tapToActivate: "कॅमेरा स्कॅनर सक्रिय करण्यासाठी टॅप करा",
    registerNewOfficer: "नवीन अधिकारी नोंदणी करा",
    registerNewOfficial: "नवीन सरकारी अधिकारी नोंदणी करा",
    secure: "सुरक्षित",
    officialGovt: "अधिकृत",
    govtInitiative: "सरकारी उपक्रम",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to English
    return localStorage.getItem('swaasthyam_language') || 'en';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('swaasthyam_language', language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  const value = {
    language,
    changeLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

