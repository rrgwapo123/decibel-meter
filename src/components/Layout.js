import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../styles/layout.css';

const Layout = ({ onLogout, userEmail, currentUser }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="layout-container">
      <Sidebar isOpen={isOpen} onLogout={onLogout} />
      {/* overlay for mobile when sidebar open */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}
      <div className={`main-content ${isOpen ? 'sidebar-open' : ''}`}> 
        <Navbar toggleSidebar={toggleSidebar} onLogout={onLogout} userEmail={userEmail} currentUser={currentUser} />
        <div className="outlet">
          <Outlet />
        </div>
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
      </div>
    </div>
  );
};

export default Layout;
