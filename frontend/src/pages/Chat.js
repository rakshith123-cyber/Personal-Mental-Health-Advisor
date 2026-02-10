import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import { chatAPI } from '../api';
import './Chat.css';

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('chat');
  const [sessionId] = useState(Date.now().toString());

  const handleSendMessage = async (message) => {
    // Add user message to UI
    const newMessages = [...messages, { role: 'user', content: message, timestamp: new Date() }];
    setMessages(newMessages);

    setLoading(true);
    try {
      const response = await chatAPI.sendMessage({
        sessionId,
        message,
        mood: 'neutral',
      });

      const botMessage = {
        role: 'assistant',
        content: response.data.botMessage,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handlePageChange = (page) => {
    if (page === 'profile') {
      navigate('/profile');
    } else if (page === 'resources') {
      navigate('/resources');
    } else if (page === 'chat') {
      setCurrentPage('chat');
    }
  };

  return (
    <div className="chat-container">
      <Sidebar onLogout={handleLogout} currentPage={currentPage} onPageChange={handlePageChange} />
      <div className="chat-area">
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Chat;
