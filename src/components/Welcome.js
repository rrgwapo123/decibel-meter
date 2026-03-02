import React, { useState, useEffect } from 'react';
import './welcome.css';

const Welcome = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if user has seen the welcome modal before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const handleClose = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  if (!showWelcome) return null;

  return (
    <div className="welcome-overlay">
      <div className="welcome-modal">
        <button className="welcome-close" onClick={handleClose}>
          ×
        </button>
        <div className="welcome-content">
          <div className="welcome-icon">🎙️</div>
          <h2>Welcome to Smart IoT</h2>
          <p className="welcome-subtitle">Noise Monitoring System for Cagayan de Oro City</p>
          <p className="welcome-text">
            Monitor real-time noise levels across the city. Track violations, manage devices, and ensure a quieter community.
          </p>
          <div className="welcome-features">
            <div className="feature">
              <span className="feature-icon">📊</span>
              <span className="feature-text">Real-time Analytics</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🌍</span>
              <span className="feature-text">City-wide Coverage</span>
            </div>
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <span className="feature-text">Live Monitoring</span>
            </div>
          </div>
          <button className="welcome-button" onClick={handleClose}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
