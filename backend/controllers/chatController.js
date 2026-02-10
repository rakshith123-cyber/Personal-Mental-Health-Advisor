const ChatSession = require('../models/ChatSession');
const User = require('../models/User');

// Simple chatbot responses with mental health focus
const generateBotResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();

  const responses = {
    greeting: [
      "Hello! I'm here to listen and support you. How are you feeling today?",
      "Hi there! It's nice to meet you. What's on your mind?",
      "Hello! How can I help you today?",
    ],
    anxiety: [
      "It's normal to feel anxious sometimes. Have you tried any relaxation techniques like deep breathing?",
      "Anxiety can be overwhelming. Remember to take things one step at a time. What's worrying you the most?",
      "I hear that you're feeling anxious. Would you like to talk about what's causing it?",
    ],
    stress: [
      "Stress can be tough to manage. Have you considered taking a break or engaging in activities you enjoy?",
      "I understand you're stressed. What's contributing to your stress right now?",
      "Stress is a common experience. Let's talk about what's stressing you out.",
    ],
    sad: [
      "I'm sorry you're feeling sad. It's okay to have these feelings. Would you like to talk about what happened?",
      "Sadness is a natural emotion. I'm here to listen if you want to share.",
      "It's okay to feel sad sometimes. What's making you feel this way?",
    ],
    sleep: [
      "Sleep is important for mental health. Are you having trouble sleeping? Let's discuss sleep hygiene.",
      "Getting quality sleep can really help with your mood. Are you sleeping well?",
    ],
    exercise: [
      "Physical activity is a great way to boost your mood and mental health. Do you exercise regularly?",
      "Exercise can help reduce stress and anxiety. What kind of activities do you enjoy?",
    ],
    gratitude: [
      "That's wonderful! Practicing gratitude can really improve your mental wellbeing.",
      "It's great that you're thinking positively! What are you grateful for today?",
    ],
    help: [
      "I'm here to support you with mental health conversations. You can talk about stress, anxiety, relationships, or anything else on your mind.",
      "Feel free to ask me about coping strategies, mental health tips, or just vent if you need to!",
    ],
  };

  // Keyword matching
  if (
    lowerMessage.includes('hello') ||
    lowerMessage.includes('hi') ||
    lowerMessage.includes('hey')
  ) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  } else if (
    lowerMessage.includes('anxiety') ||
    lowerMessage.includes('anxious') ||
    lowerMessage.includes('nervous')
  ) {
    return responses.anxiety[Math.floor(Math.random() * responses.anxiety.length)];
  } else if (
    lowerMessage.includes('stress') ||
    lowerMessage.includes('stressed') ||
    lowerMessage.includes('overwhelmed')
  ) {
    return responses.stress[Math.floor(Math.random() * responses.stress.length)];
  } else if (
    lowerMessage.includes('sad') ||
    lowerMessage.includes('depressed') ||
    lowerMessage.includes('unhappy')
  ) {
    return responses.sad[Math.floor(Math.random() * responses.sad.length)];
  } else if (
    lowerMessage.includes('sleep') ||
    lowerMessage.includes('tired') ||
    lowerMessage.includes('insomnia')
  ) {
    return responses.sleep[Math.floor(Math.random() * responses.sleep.length)];
  } else if (
    lowerMessage.includes('exercise') ||
    lowerMessage.includes('gym') ||
    lowerMessage.includes('workout')
  ) {
    return responses.exercise[Math.floor(Math.random() * responses.exercise.length)];
  } else if (
    lowerMessage.includes('thank') ||
    lowerMessage.includes('grateful') ||
    lowerMessage.includes('appreciate')
  ) {
    return responses.gratitude[Math.floor(Math.random() * responses.gratitude.length)];
  } else if (
    lowerMessage.includes('help') ||
    lowerMessage.includes('what can you do')
  ) {
    return responses.help[Math.floor(Math.random() * responses.help.length)];
  } else {
    return "I understand. Tell me more about that. How does it make you feel?";
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { sessionId, message, mood } = req.body;
    const userId = req.userId;

    if (!message.trim()) {
      return res.status(400).json({ message: 'Message cannot be empty' });
    }

    // Find or create chat session
    let chatSession = await ChatSession.findOne({ sessionId });
    if (!chatSession) {
      chatSession = new ChatSession({
        userId,
        sessionId,
        mood,
      });
    }

    // Add user message
    chatSession.messages.push({
      role: 'user',
      content: message,
    });

    // Generate bot response
    const botResponse = generateBotResponse(message);
    chatSession.messages.push({
      role: 'assistant',
      content: botResponse,
    });

    chatSession.updatedAt = new Date();
    await chatSession.save();

    res.json({
      success: true,
      botMessage: botResponse,
      chatSession,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.userId;

    const chatSession = await ChatSession.findOne({ sessionId, userId });

    if (!chatSession) {
      return res.status(404).json({ message: 'Chat session not found' });
    }

    res.json({
      success: true,
      chatSession,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat history', error: error.message });
  }
};

exports.getAllSessions = async (req, res) => {
  try {
    const userId = req.userId;

    const sessions = await ChatSession.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      sessions,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sessions', error: error.message });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.userId;

    const chatSession = await ChatSession.findOneAndDelete({ sessionId, userId });

    if (!chatSession) {
      return res.status(404).json({ message: 'Chat session not found' });
    }

    res.json({ success: true, message: 'Chat session deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting session', error: error.message });
  }
};
