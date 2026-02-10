const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const chatController = require('../controllers/chatController');

router.post('/send', auth, chatController.sendMessage);
router.get('/history/:sessionId', auth, chatController.getChatHistory);
router.get('/sessions', auth, chatController.getAllSessions);
router.delete('/session/:sessionId', auth, chatController.deleteSession);

module.exports = router;
