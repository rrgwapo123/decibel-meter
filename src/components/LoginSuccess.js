import React, { useState, useEffect } from 'react';
import './loginSuccess.css';

const LoginSuccess = ({ email, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="login-success-overlay">
      <div className="login-success-popup">
        <div className="success-icon">✓</div>
        <h2>Welcome Back!</h2>
        <p className="success-email">Logged in as <strong>{email}</strong></p>
        <p className="success-message">You're all set to monitor noise levels in real-time.</p>
        <div className="success-progress">
          <div className="progress-bar" />
        </div>
      </div>
    </div>
  );
};

export default LoginSuccess;
