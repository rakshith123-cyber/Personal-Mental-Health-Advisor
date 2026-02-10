import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { userAPI } from '../api';
import './Profile.css';
import { User, Mail, Calendar, Tag } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    preferredTopics: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setUser(response.data.user);
      setFormData({
        name: response.data.user.name,
        age: response.data.user.age || '',
        preferredTopics: response.data.user.preferredTopics?.join(', ') || '',
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      await userAPI.updateProfile({
        name: formData.name,
        age: parseInt(formData.age),
        preferredTopics: formData.preferredTopics
          .split(',')
          .map((topic) => topic.trim())
          .filter((topic) => topic),
      });
      setEditing(false);
      fetchProfile();
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handlePageChange = (page) => {
    if (page === 'chat') {
      navigate('/chat');
    } else if (page === 'resources') {
      navigate('/resources');
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <Sidebar onLogout={handleLogout} currentPage="profile" onPageChange={handlePageChange} />
        <div className="profile-area">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Sidebar onLogout={handleLogout} currentPage="profile" onPageChange={handlePageChange} />
      <div className="profile-area">
        <div className="profile-card">
          <h1>My Profile</h1>

          {user && (
            <div className="profile-content">
              <div className="profile-field">
                <User size={20} />
                <div>
                  <label>Name</label>
                  {editing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    <p>{user.name}</p>
                  )}
                </div>
              </div>

              <div className="profile-field">
                <Mail size={20} />
                <div>
                  <label>Email</label>
                  <p>{user.email}</p>
                </div>
              </div>

              <div className="profile-field">
                <Calendar size={20} />
                <div>
                  <label>Age</label>
                  {editing ? (
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    <p>{user.age || 'Not specified'}</p>
                  )}
                </div>
              </div>

              <div className="profile-field">
                <Tag size={20} />
                <div>
                  <label>Preferred Topics</label>
                  {editing ? (
                    <textarea
                      name="preferredTopics"
                      value={formData.preferredTopics}
                      onChange={handleInputChange}
                      className="edit-input"
                      placeholder="Enter topics separated by commas"
                    />
                  ) : (
                    <p>{formData.preferredTopics || 'Not specified'}</p>
                  )}
                </div>
              </div>

              <div className="profile-actions">
                {!editing ? (
                  <button className="btn btn-primary" onClick={() => setEditing(true)}>
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button className="btn btn-primary" onClick={handleSaveProfile}>
                      Save Changes
                    </button>
                    <button className="btn btn-secondary" onClick={() => setEditing(false)}>
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
