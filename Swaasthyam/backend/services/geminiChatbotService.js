// Swaasthyam Healthcare Chatbot Service
// Powered by Google Gemini AI - Advanced conversational AI

import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiChatbotService {
  constructor() {
    // Initialize Gemini AI
    // Use free API key - you can get one from: https://makersuite.google.com/app/apikey
    const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyCIfwfH38OMjNqyQbkFO1czgpOtOCDSf9w'; // Your valid Gemini API key
    this.genAI = new GoogleGenerativeAI(API_KEY);
    
    // Use Gemini 1.5 Flash model (free tier, fastest)
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // Store conversation history per session
    this.conversations = new Map();
    
    // System prompt to define chatbot personality and knowledge
    this.systemPrompt = `You are a helpful and friendly healthcare assistant for Swaasthyam, a digital health records platform for migrant workers in India.

**Your Role:**
- Help users with login issues, OTP problems, health records queries, and general platform navigation
- Provide accurate information about Swaasthyam features
- Be empathetic and patient, especially with users who may not be tech-savvy
- Always prioritize user safety and direct emergencies to proper channels

**Platform Information:**

**Swaasthyam Features:**
- Digital health records for migrant workers
- QR code health ID for easy identification
- OTP-based secure authentication (no passwords)
- Multilingual support: Hindi, English, Malayalam, Tamil, Telugu, Kannada, Bengali, Gujarati, Marathi, Punjabi
- Health checkup tracking, medication reminders
- Emergency alerts and notifications

**User Types:**
1. **Migrant Workers**: Can view health records, QR ID, medications, track health metrics
2. **Health Officers**: Can add/update health records, generate certificates, issue alerts
3. **Government Officials**: Can view analytics, reports, and policy insights

**Login Process:**
1. Enter 10-digit mobile number
2. Click "Send OTP" 
3. Receive 6-digit OTP (in development: check backend terminal)
4. Enter OTP and verify
5. Get redirected to role-specific dashboard

**Common Issues & Solutions:**

**OTP Problems:**
- Verify correct 10-digit phone number entered
- Check backend terminal for OTP (development mode)
- OTP expires after 10 minutes
- Click "Send OTP" again if needed
- Contact support: support@swaasthyam.gov.in

**Emergency Contacts:**
- Ambulance: 108 (24/7 Free)
- Health Helpline: 104
- Never delay calling 108 for medical emergencies

**Registration:**
- Migrant workers: Registered by health officers at camps
- Officers: Click "Register New Officer" on login page
- Officials: Click "Register New Official" on login page

**Privacy & Security:**
- All data encrypted and secure
- Stored on government servers
- Only authorized officers can access records
- Compliant with Data Protection Act

**Important Guidelines:**
- Keep responses concise and clear (max 150 words)
- Use emojis appropriately for better engagement
- Format responses with bullets and headings when helpful
- If user asks about medical advice, remind them you're an assistant, not a doctor
- For emergencies, immediately provide emergency numbers
- If unsure, offer to connect with human support

**Tone:**
- Friendly and approachable
- Professional but not formal
- Patient and understanding
- Supportive and helpful

Remember: You're helping people access their healthcare information. Be compassionate and clear!`;
  }

  // Get or create conversation history for a session
  getConversation(sessionId) {
    if (!this.conversations.has(sessionId)) {
      this.conversations.set(sessionId, []);
    }
    return this.conversations.get(sessionId);
  }

  // Add message to conversation history
  addToHistory(sessionId, role, content) {
    const conversation = this.getConversation(sessionId);
    conversation.push({ role, content });
    
    // Keep only last 10 messages to save memory and context window
    if (conversation.length > 10) {
      conversation.shift();
    }
  }

  // Clear conversation history for a session
  clearConversation(sessionId) {
    this.conversations.delete(sessionId);
  }

  // Generate response using Gemini AI
  async getResponse(query, sessionId = 'default') {
    try {
      // Build context from conversation history
      const conversation = this.getConversation(sessionId);
      const context = conversation.map(msg => 
        `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join('\n');

      // Create the full prompt with system instructions, context, and query
      const fullPrompt = `${this.systemPrompt}

${context ? `Previous conversation:\n${context}\n` : ''}
User: ${query}

Assistant:`;

      // Generate response from Gemini
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      // Add to conversation history
      this.addToHistory(sessionId, 'user', query);
      this.addToHistory(sessionId, 'assistant', text);

      return text;

    } catch (error) {
      console.error('Gemini AI Error:', error.message);
      
      // Fallback to helpful response if AI fails
      return `I apologize, but I'm having trouble processing your request right now. 😔

**How I can help:**
- Login & OTP issues
- Health records information
- Registration guidance
- Emergency contacts
- Platform features

**Need urgent help?**
📞 Call 108 for emergencies
📧 Email: support@swaasthyam.gov.in

Please try asking again or contact our support team!`;
    }
  }

  // Get context-aware quick reply suggestions
  getQuickReplies(lastMessage = '') {
    const baseReplies = [
      "How do I login?",
      "I didn't receive OTP",
      "View my health records",
      "What features are available?",
      "Emergency contacts",
      "Is my data secure?"
    ];

    // Add context-specific suggestions based on last message
    if (lastMessage.toLowerCase().includes('otp')) {
      return [
        "Resend OTP",
        "OTP expired",
        "Where to find OTP?",
        ...baseReplies.slice(3)
      ];
    }

    if (lastMessage.toLowerCase().includes('login')) {
      return [
        "Login steps",
        "Can't login",
        "Forgot my phone",
        ...baseReplies.slice(3)
      ];
    }

    return baseReplies;
  }

  // Health check for the service
  async healthCheck() {
    try {
      const result = await this.model.generateContent('Say "OK" if you can understand this.');
      const response = await result.response;
      return { healthy: true, model: 'gemini-1.5-flash', response: response.text() };
    } catch (error) {
      return { healthy: false, error: error.message };
    }
  }
}

export default new GeminiChatbotService();
