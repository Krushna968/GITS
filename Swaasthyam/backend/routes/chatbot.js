import express from 'express';
import groqChatbotService from '../services/groqChatbotService.js';
import chatbotService from '../services/chatbotService.js';

const router = express.Router();

// POST /api/chatbot/query - Get chatbot response (Gemini AI powered)
router.post('/query', async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid message'
      });
    }

    // Use sessionId for conversation context (or generate unique one)
    const session = sessionId || `session_${Date.now()}`;

    // Try Groq AI first, fallback to rule-based if it fails
    let response;
    let powered = 'Groq AI (Llama 3.1)';
    
    try {
      response = await groqChatbotService.getResponse(message, session);
      // If response contains the fallback error message, use rule-based instead
      if (response.includes("I apologize, but I'm having trouble")) {
        response = chatbotService.getResponse(message);
        powered = 'Rule-Based AI';
      }
    } catch (error) {
      // Fallback to rule-based chatbot
      response = chatbotService.getResponse(message);
      powered = 'Rule-Based AI';
    }
    
    const quickReplies = groqChatbotService.getQuickReplies(message);

    res.json({
      success: true,
      response,
      quickReplies,
      sessionId: session,
      timestamp: new Date(),
      powered
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, I encountered an error. Please try again.',
      error: error.message
    });
  }
});

// GET /api/chatbot/quick-replies - Get quick reply suggestions
router.get('/quick-replies', (req, res) => {
  try {
    const quickReplies = groqChatbotService.getQuickReplies();
    
    res.json({
      success: true,
      quickReplies
    });
  } catch (error) {
    console.error('Error fetching quick replies:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching suggestions'
    });
  }
});

// POST /api/chatbot/clear - Clear conversation history
router.post('/clear', (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (sessionId) {
      groqChatbotService.clearConversation(sessionId);
    }
    
    res.json({
      success: true,
      message: 'Conversation cleared'
    });
  } catch (error) {
    console.error('Error clearing conversation:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing conversation'
    });
  }
});

// GET /api/chatbot/health - Health check for AI service
router.get('/health', async (req, res) => {
  try {
    const health = await groqChatbotService.healthCheck();
    res.json({
      success: true,
      ...health
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;

