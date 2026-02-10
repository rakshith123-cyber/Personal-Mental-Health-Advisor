import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { resourcesAPI } from '../api';
import './Resources.css';
import { Phone, MessageCircle, Globe, AlertCircle } from 'lucide-react';

const Resources = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await resourcesAPI.getResources();
      setResources(response.data.resources);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handlePageChange = (page) => {
    if (page === 'chat') {
      navigate('/chat');
    } else if (page === 'profile') {
      navigate('/profile');
    }
  };

  return (
    <div className="resources-container">
      <Sidebar
        onLogout={handleLogout}
        currentPage="resources"
        onPageChange={handlePageChange}
      />
      <div className="resources-area">
        <div className="resources-header">
          <h1>Mental Health Resources</h1>
          <p>Emergency contacts and supportive resources available 24/7</p>
        </div>

        {loading ? (
          <div className="loading">Loading resources...</div>
        ) : (
          <div className="resources-grid">
            {resources.map((resource) => (
              <div key={resource.id} className="resource-card">
                <div className="resource-icon">
                  {resource.available === '24/7' && <AlertCircle size={24} color="#e74c3c" />}
                  {resource.phone?.startsWith('1-') && <Phone size={24} color="#3498db" />}
                  {resource.phone?.startsWith('Text') && (
                    <MessageCircle size={24} color="#9b59b6" />
                  )}
                  {!resource.phone && <Globe size={24} color="#2ecc71" />}
                </div>

                <h3>{resource.title}</h3>
                <p className="resource-description">{resource.description}</p>

                {resource.phone && (
                  <div className="resource-contact">
                    <strong>Contact:</strong> {resource.phone}
                  </div>
                )}

                {resource.available && (
                  <div className="resource-available">
                    Available: <span>{resource.available}</span>
                  </div>
                )}

                {resource.url && (
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                    Visit Website
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="resources-info">
          <div className="info-box">
            <h3>If You're in Crisis</h3>
            <p>
              If you're experiencing a mental health crisis or suicidal thoughts, please reach out to
              one of the resources above immediately. You're not alone, and help is available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
