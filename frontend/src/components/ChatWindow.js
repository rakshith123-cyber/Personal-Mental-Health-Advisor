import React from 'react';
import './ChatWindow.css';
import { Send, MessageCircle } from 'lucide-react';

const ChatWindow = ({ messages, onSendMessage, loading }) => {
  const [inputValue, setInputValue] = React.useState('');
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      await onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-state">
            <MessageCircle size={48} />
            <h2>Start Your Journey to Better Mental Health</h2>
            <p>Share your thoughts, feelings, or concerns. I'm here to listen and support you.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="message-content">
                <p>{msg.content}</p>
              </div>
              <span className="message-time">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          ))
        )}
        {loading && (
          <div className="message assistant">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSend}>
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            disabled={loading}
            className="chat-input"
          />
          <button type="submit" disabled={loading || !inputValue.trim()} className="send-btn">
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
