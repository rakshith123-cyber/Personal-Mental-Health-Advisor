import React from 'react';
import './Sidebar.css';
import { LogOut, Home, Settings, Book } from 'lucide-react';

const Sidebar = ({ onLogout, currentPage, onPageChange }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>MindCare</h1>
        <p>Your Mental Wellness Companion</p>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${currentPage === 'chat' ? 'active' : ''}`}
          onClick={() => onPageChange('chat')}
        >
          <Home size={20} />
          <span>Chat</span>
        </button>
        <button
          className={`nav-item ${currentPage === 'profile' ? 'active' : ''}`}
          onClick={() => onPageChange('profile')}
        >
          <Settings size={20} />
          <span>Profile</span>
        </button>
        <button
          className={`nav-item ${currentPage === 'resources' ? 'active' : ''}`}
          onClick={() => onPageChange('resources')}
        >
          <Book size={20} />
          <span>Resources</span>
        </button>
      </nav>

      <button className="logout-btn" onClick={onLogout}>
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
