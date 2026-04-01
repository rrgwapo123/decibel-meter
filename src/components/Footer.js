import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/layout.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-left">
        <div className="footer-title">Decibel Meter Monitoring</div>
        <div className="footer-subtitle">Noise compliance and reporting system</div>
      </div>
      <div className="footer-links">
        <Link to="/dashboard" className="footer-link">Dashboard</Link>
        <Link to="/reports" className="footer-link">Reports</Link>
        <Link to="/settings" className="footer-link">Settings</Link>
      </div>
      <div className="footer-meta">
        <span>© {new Date().getFullYear()} Decibel System</span>
        <button
          type="button"
          className="footer-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
