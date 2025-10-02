import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
const Home = () => {
  const navigate = useNavigate();
  const { language, changeLanguage, t } = useLanguage();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLoginRegisterClick = () => {
    navigate('/login');
  };

  return (
    <div className="bg-[url('./assets/background2.jpg')] bg-center bg-no-repeat bg-cover bg-clip-border min-h-screen font-[Quicksand]">
      <nav className="h-[15vh] m-0 px-20 bg-[#c4c4c456] flex justify-between items-center shadow-2xl">
        <img
          className="h-[10rem] w-[10rem] m-5 p-0"
          src="./assets/logo 2.png"
          alt="Swaasthyam Logo"
        />
        <button 
          onClick={handleLoginRegisterClick}
          className="h-[3rem] w-[15rem] px-2 text-[.8rem] bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-4xl font-semibold hover:from-blue-500 hover:to-blue-700 hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          {t('loginRegister')}
        </button>
      </nav>
      <article className="h-[85vh] grid grid-rows-3 px-30 text-white ">
        <p className="text-[3rem] flex items-end font-bold text-white" style={{
          textShadow: '3px 3px 6px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.9)'
        }}>
          {t('welcome')}
        </p>

        <div className="flex items-end relative">
          <button 
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="bg-gradient-to-b from-purple-700 to-black rounded-4xl h-[4rem] w-[20rem] font-bold flex items-center justify-center gap-3 hover:from-purple-600 hover:to-gray-900 transition-all duration-300 cursor-pointer"
          >
            <span className="text-2xl">{currentLanguage.flag}</span>
            <span>{t('selectLanguage')}: {currentLanguage.name}</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Language Dropdown */}
          {showLanguageDropdown && (
            <div className="absolute top-[4.5rem] left-0 w-[20rem] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border-2 border-purple-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setShowLanguageDropdown(false);
                  }}
                  className={`w-full px-6 py-4 flex items-center gap-3 text-left transition-all duration-200 ${
                    language === lang.code
                      ? 'bg-purple-100 text-purple-900 font-bold'
                      : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-lg">{lang.name}</span>
                  {language === lang.code && (
                    <span className="ml-auto text-purple-700">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex py-[2rem] items-start font-bold">
          <p>
            {t('worldsMostEfficient')}
          </p>
        </div>
      </article>
      <div className="fixed top-1/3 right-10 w-[20rem] h-[25rem] z-50 pointer-events-none bubble-rotate">
        {/* Top bubble */}
        <div className="bubble bubble1 w-36 h-36 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-center text-black text-xs font-semibold shadow-xl p-2">
          {t('realtimeMonitoring')}
        </div>

        {/* Upper middle bubble */}
        <div className="bubble bubble2 w-36 h-36 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-center text-black text-xs font-semibold shadow-xl p-2">
          {t('qrCodeAccess')}
        </div>

        {/* Lower middle bubble */}
        <div className="bubble bubble3 w-36 h-36 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-center text-black text-xs font-semibold shadow-xl p-2">
          {t('multiLanguageSupport')}
        </div>

        {/* Bottom bubble */}
        <div className="bubble bubble4 w-36 h-36 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-center text-black text-xs font-semibold shadow-xl p-2">
          {t('voiceInput')}
        </div>
      </div>
    </div>
  );
};

export default Home;
