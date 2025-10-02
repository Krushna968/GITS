// Swaasthyam Healthcare Chatbot Service
// Powered by Google Gemini AI

import { GoogleGenerativeAI } from '@google/generative-ai';

class ChatbotService {
  constructor() {
    // Healthcare-specific intents and responses
    this.intents = {
      greeting: {
        patterns: [
          /^(hi|hello|hey|namaste|namaskar)/i,
          /^good (morning|afternoon|evening)/i
        ],
        responses: [
          "🙏 Namaste! Welcome to Swaasthyam Digital Health Records. How can I help you today?",
          "👋 Hello! I'm your Swaasthyam assistant. What would you like to know?",
          "Hi there! I'm here to help with your health records and queries. How may I assist you?"
        ]
      },
      
      otp_issue: {
        patterns: [
          /otp.*not.*(receiv|com|get)/i,
          /(can't|cannot|didn't).*receive.*otp/i,
          /otp.*problem|issue|error/i,
          /resend.*otp/i
        ],
        responses: [
          "📱 OTP Issues? Here's what to check:\n\n1. Make sure you entered the correct 10-digit phone number\n2. Check your backend terminal - OTP is displayed there (development mode)\n3. OTP expires after 10 minutes\n4. Try clicking 'Send OTP' again\n\nNeed more help? Contact support at health@swaasthyam.gov.in"
        ]
      },

      login_help: {
        patterns: [
          /how.*(login|sign in)/i,
          /login.*help/i,
          /can't.*login/i,
          /login.*problem/i
        ],
        responses: [
          "🔐 **Login Instructions:**\n\n1. Enter your 10-digit mobile number\n2. Click 'Send OTP'\n3. Check your phone/terminal for the 6-digit OTP\n4. Enter OTP and click 'Verify & Login'\n\n**Available Login Methods:**\n- Mobile OTP (All users)\n- DigiLocker (Coming soon)\n- QR Code Scan (Workers & Officers)\n\nStill having issues? Let me know!"
        ]
      },

      health_records: {
        patterns: [
          /health.*record/i,
          /medical.*record/i,
          /view.*record/i,
          /check.*record/i,
          /my.*health/i
        ],
        responses: [
          "📋 **Health Records:**\n\nMigrant workers can:\n✅ View all health checkup records\n✅ See medications and prescriptions\n✅ Track blood pressure, weight, etc.\n✅ Download health reports\n\nOfficers can:\n✅ Add new health records\n✅ Update existing records\n✅ Generate health certificates\n\nLogin to access your records!"
        ]
      },

      registration: {
        patterns: [
          /how.*(register|signup|sign up)/i,
          /creat.*account/i,
          /new.*user/i,
          /registration/i
        ],
        responses: [
          "📝 **Registration:**\n\n**Migrant Workers:** Registered by health officers during camp visits\n\n**Health Officers:** Click 'Register New Officer' on login page\n\n**Government Officials:** Click 'Register New Official' on login page\n\nAll users login using mobile OTP authentication!"
        ]
      },

      features: {
        patterns: [
          /what.*(can|feature|do)/i,
          /feature.*list/i,
          /capabilities/i
        ],
        responses: [
          "✨ **Swaasthyam Features:**\n\n👷 **For Workers:**\n- Digital health records\n- QR code health ID\n- Medication tracking\n- Emergency alerts\n- Multilingual support (10+ languages)\n\n👨‍⚕️ **For Officers:**\n- Add/update health records\n- Generate health certificates\n- Track worker health status\n- Issue alerts\n\n📊 **For Officials:**\n- State-wide health analytics\n- Worker health monitoring\n- Report generation\n- Policy insights"
        ]
      },

      qr_code: {
        patterns: [
          /qr.*code/i,
          /scan.*qr/i,
          /health.*id/i,
          /qr.*scan/i
        ],
        responses: [
          "📱 **QR Code Health ID:**\n\nEach migrant worker gets a unique QR code that contains:\n✅ Basic health information\n✅ Emergency contact\n✅ Recent health status\n✅ Vaccination records\n\n**How to use:**\n- Workers: Share QR at health camps\n- Officers: Scan to quickly access worker records\n- Officials: Track worker movement\n\nYour health ID is always accessible offline!"
        ]
      },

      emergency: {
        patterns: [
          /emergency/i,
          /urgent/i,
          /help.*me/i,
          /medical.*emergency/i
        ],
        responses: [
          "🚨 **EMERGENCY HELP:**\n\n📞 **Dial immediately:**\n- Ambulance: 108 (24/7 Free)\n- Health Helpline: 104\n\n🏥 **Nearest Health Center:**\nCheck your app for nearby facilities\n\n⚠️ **For non-emergency medical queries:**\nConsult your registered health officer through the app\n\n*This is an automated assistant. For real emergencies, call 108*"
        ]
      },

      languages: {
        patterns: [
          /language/i,
          /hindi|tamil|telugu|malayalam|kannada/i,
          /change.*language/i
        ],
        responses: [
          "🌍 **Multilingual Support:**\n\nSwaasthyam supports 10+ Indian languages:\n- Hindi (हिंदी)\n- English\n- Malayalam (മലയാളം)\n- Tamil (தமிழ்)\n- Telugu (తెలుగు)\n- Kannada (ಕನ್ನಡ)\n- Bengali (বাংলা)\n- Gujarati (ગુજરાતી)\n- Marathi (मराठी)\n- Punjabi (ਪੰਜਾਬੀ)\n\n🔄 Change language from your profile settings after login!"
        ]
      },

      contact: {
        patterns: [
          /contact/i,
          /support/i,
          /help.*desk/i,
          /phone.*number/i
        ],
        responses: [
          "📞 **Contact Support:**\n\n📧 Email: support@swaasthyam.gov.in\n☎️ Helpline: 1800-XXX-XXXX (9 AM - 6 PM)\n🌐 Website: swaasthyam.gov.in\n\n**Office Hours:**\nMonday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\n\nFor technical issues, include:\n- Your registered phone number\n- Screenshot of the issue\n- Device details"
        ]
      },

      privacy: {
        patterns: [
          /privacy/i,
          /secure|security/i,
          /data.*safe/i,
          /confidential/i
        ],
        responses: [
          "🔒 **Your Privacy Matters:**\n\n✅ All health data is encrypted\n✅ Stored on secure government servers\n✅ Only authorized officers can access records\n✅ You control who sees your data\n✅ Compliant with Data Protection Act\n\n**Your Rights:**\n- View all your data anytime\n- Request data deletion\n- Know who accessed your records\n- Download your records\n\nYour health data is YOUR data. We just keep it safe! 🛡️"
        ]
      },

      thanks: {
        patterns: [
          /thank/i,
          /thanks/i,
          /appreciate/i
        ],
        responses: [
          "You're welcome! 😊 Feel free to ask if you need anything else!",
          "Happy to help! Stay healthy! 💪",
          "Glad I could assist! Take care! 🙏"
        ]
      },

      goodbye: {
        patterns: [
          /bye|goodbye|see you/i,
          /exit|quit|close/i
        ],
        responses: [
          "👋 Goodbye! Stay healthy and safe!",
          "Take care! Feel free to reach out anytime. 🙏",
          "Bye! Wishing you good health! 💚"
        ]
      }
    };

    // Fallback responses when no intent matches
    this.fallbackResponses = [
      "I'm not sure I understand. Could you rephrase that?\n\n**I can help with:**\n- Login & OTP issues\n- Health records\n- Registration\n- QR codes\n- Emergency contacts\n- Language settings\n\nWhat would you like to know?",
      
      "Hmm, I didn't quite get that. Try asking about:\n\n📱 Login help\n📋 Health records\n🆔 Registration\n📞 Emergency contacts\n🔒 Privacy & security\n\nHow can I assist you?"
    ];
  }

  // Find matching intent based on user query
  findIntent(query) {
    const lowerQuery = query.toLowerCase().trim();

    for (const [intentName, intent] of Object.entries(this.intents)) {
      for (const pattern of intent.patterns) {
        if (pattern.test(lowerQuery)) {
          return intentName;
        }
      }
    }

    return null;
  }

  // Get response for a query
  getResponse(query) {
    const intent = this.findIntent(query);

    if (intent) {
      const responses = this.intents[intent].responses;
      // Return random response from available responses
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Return fallback if no intent matched
    return this.fallbackResponses[
      Math.floor(Math.random() * this.fallbackResponses.length)
    ];
  }

  // Get quick reply suggestions based on context
  getQuickReplies() {
    return [
      "How to login?",
      "OTP not received",
      "View health records",
      "How to register?",
      "Emergency contacts",
      "Change language",
      "Contact support"
    ];
  }
}

export default new ChatbotService();

