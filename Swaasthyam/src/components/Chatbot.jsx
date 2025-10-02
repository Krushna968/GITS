import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🙏 Namaste! I'm your Swaasthyam AI assistant powered by Groq (Llama 3.1). I can help with login issues, health records, OTP problems, and more. How may I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState([]);
  const [sessionId, setSessionId] = useState(`session_${Date.now()}`);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Fetch quick replies on component mount
  useEffect(() => {
    fetchQuickReplies();
  }, []);

  const fetchQuickReplies = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chatbot/quick-replies');
      const data = await response.json();
      if (data.success) {
        setQuickReplies(data.quickReplies);
      }
    } catch (error) {
      console.error('Error fetching quick replies:', error);
    }
  };

  const sendMessage = async (text = inputMessage) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call chatbot API with session tracking
      const response = await fetch('http://localhost:5000/api/chatbot/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text.trim(),
          sessionId: sessionId 
        })
      });

      const data = await response.json();

      // Simulate typing delay
      setTimeout(() => {
        if (data.success) {
          const botMessage = {
            id: messages.length + 2,
            text: data.response,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMessage]);
        } else {
          const errorMessage = {
            id: messages.length + 2,
            text: "Sorry, I'm having trouble right now. Please try again or contact support.",
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
        }
        setIsTyping(false);
      }, 500);

    } catch (error) {
      console.error('Chatbot error:', error);
      setIsTyping(false);
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I couldn't connect to the server. Please check if the backend is running.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleQuickReply = (reply) => {
    sendMessage(reply);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Floating Chatbot Button - Premium Design */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 group">
          {/* Ripple effect background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
          
          {/* Main button with glassmorphism */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
            aria-label="Open AI Assistant"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            
            {/* Icon container */}
            <div className="relative z-10">
              <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            
            {/* Online status indicator */}
            <span className="absolute -top-1 -right-1 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 border-white shadow-lg">
                <span className="absolute inset-0 rounded-full bg-white animate-pulse opacity-50"></span>
              </span>
            </span>
          </button>
          
          {/* Tooltip on hover */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
              <p className="font-semibold">Need Help? 💬</p>
              <p className="text-xs text-gray-300">Chat with our AI Assistant</p>
              <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Window - Enhanced Design */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col z-50 animate-slideIn">
          {/* Glass morphism container */}
          <div className="relative w-full h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-white/20 dark:border-gray-700/50 overflow-hidden flex flex-col transition-colors duration-300">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-800/30 dark:to-gray-900/30 pointer-events-none"></div>
            {/* Header with gradient and glass effect */}
            <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white p-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-gradient-to-br from-white to-blue-50 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl animate-pulse">🤖</span>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
                </div>
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    Swaasthyam AI
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-normal">Beta</span>
                  </h3>
                  <p className="text-xs text-blue-100 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Online • Powered by Groq ⚡
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:rotate-90 active:scale-95"
                aria-label="Close chatbot"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages with custom scrollbar */}
            <div className="relative flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm transition-colors duration-300" style={{ overflowY: 'auto', maxHeight: '100%' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 transition-all duration-200 hover:scale-[1.02] ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400 dark:text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3 shadow-md border border-gray-200 dark:border-gray-700 transition-colors">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
              <div ref={messagesEndRef} />
            </div>

          {/* Quick Replies */}
          {quickReplies.length > 0 && (
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 overflow-x-auto transition-colors duration-300">
              <div className="flex gap-2 pb-2">
                {quickReplies.slice(0, 4).map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors whitespace-nowrap flex-shrink-0"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

            {/* Input with enhanced styling */}
            <div className="relative p-4 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-gray-100 backdrop-blur-sm transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-500"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!inputMessage.trim()}
                  className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none active:scale-95"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

