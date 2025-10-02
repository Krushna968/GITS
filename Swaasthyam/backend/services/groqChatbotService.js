// Swaasthyam Healthcare Chatbot Service
// Powered by Groq AI (Llama 3.1) - Super Fast & Free

import Groq from 'groq-sdk';

class GroqChatbotService {
  constructor() {
    // Initialize Groq AI with API key from environment variables
    // Get your free key from: https://console.groq.com/keys
    // Set in .env file: GROQ_API_KEY=your_key_here
    const API_KEY = process.env.GROQ_API_KEY || 'your_groq_api_key_here';
    
    if (!process.env.GROQ_API_KEY) {
      console.warn('⚠️  GROQ_API_KEY not set in environment variables. Using fallback key.');
    }
    
    this.groq = new Groq({ apiKey: API_KEY });
    
    // Use Llama 3.3 70B model (free and super fast)
    this.model = 'llama-3.3-70b-versatile';
    
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
      this.conversations.set(sessionId, [
        { role: 'system', content: this.systemPrompt }
      ]);
    }
    return this.conversations.get(sessionId);
  }

  // Add message to conversation history
  addToHistory(sessionId, role, content) {
    const conversation = this.getConversation(sessionId);
    conversation.push({ role, content });
    
    // Keep only last 12 messages (system + 10 user/assistant + newest)
    if (conversation.length > 12) {
      // Keep system message and remove oldest user/assistant messages
      const systemMsg = conversation[0];
      conversation.splice(1, 1);
    }
  }

  // Clear conversation history for a session
  clearConversation(sessionId) {
    this.conversations.delete(sessionId);
  }

  // Generate response using Groq AI
  async getResponse(query, sessionId = 'default') {
    try {
      // Get conversation history
      const messages = this.getConversation(sessionId);
      
      // Add user message
      messages.push({ role: 'user', content: query });

      // Call Groq AI
      const completion = await this.groq.chat.completions.create({
        messages: messages,
        model: this.model,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
        stream: false
      });

      const response = completion.choices[0]?.message?.content || 
        "Sorry, I couldn't generate a response. Please try again.";

      // Add assistant response to history
      messages.push({ role: 'assistant', content: response });

      return response;

    } catch (error) {
      console.error('Groq AI Error:', error.message);
      
      // Fallback response
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

    // Add context-specific suggestions
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
      const completion = await this.groq.chat.completions.create({
        messages: [{ role: 'user', content: 'Say OK' }],
        model: this.model,
        max_tokens: 10
      });
      
      return { 
        healthy: true, 
        model: this.model, 
        response: completion.choices[0]?.message?.content,
        provider: 'Groq AI'
      };
    } catch (error) {
      return { healthy: false, error: error.message };
    }
  }
}

export default new GroqChatbotService();

