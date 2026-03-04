import React, { useState } from 'react';
import '../styles/settings.css';

const Settings = () => {
  const [threshold, setThreshold] = useState(90);
  const [duration, setDuration] = useState(5);
  const [message, setMessage] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    // mock save logic
    setMessage('Settings saved successfully.');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <form onSubmit={handleSave} className="settings-form">
        <div className="form-group">
          <label htmlFor="threshold">Decibel Threshold</label>
          <input
            id="threshold"
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Sustained Duration (seconds)</label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>
        <button type="submit" className="save-btn">
          Save
        </button>
        {message && <p className="success-msg">{message}</p>}
      </form>
    </div>
  );
};

export default Settings;
