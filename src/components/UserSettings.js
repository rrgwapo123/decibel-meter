import React, { useState } from 'react';
import './usersettings.css';

const UserSettings = ({ currentUser = {}, updateUser }) => {
  const [form, setForm] = useState({
    email: currentUser.email || '',
    username: currentUser.username || '',
    phone: currentUser.phone || '',
    picture: currentUser.picture || '',
    password: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // propagate updates (except password handling for now)
    const updates = {
      email: form.email,
      username: form.username,
      phone: form.phone,
      picture: form.picture,
    };
    updateUser(updates);
    alert('Profile updated!');
  };

  return (
    <div className="settings-container">
      <h2>User Settings</h2>
      <form className="settings-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="picture">Profile Picture URL</label>
          {form.picture && (
            <div className="picture-preview">
              <img
                src={form.picture}
                alt="Profile preview"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}
          <input
            id="picture"
            name="picture"
            type="text"
            value={form.picture}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Current Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="login-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserSettings;