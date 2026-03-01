import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ toggleSidebar, userEmail = '', currentUser = {}, onLogout }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();


  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    if (onLogout) onLogout();
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <header className="navbar-bar">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <h1 className="navbar-title">Smart IoT Decibel Monitoring System</h1>
      <div className="navbar-spacer" />
      <div className="navbar-user">
        <div className={`profile-container${showUserMenu ? ' open' : ''}`} onClick={() => setShowUserMenu((prev) => !prev)}>
          <img
            src={currentUser && currentUser.picture ? currentUser.picture : 'https://via.placeholder.com/32'}
            alt="Profile"
            className="profile-pic"
          />
          <span className="user-name">Hello, {userEmail || 'User'}!</span>
        </div>
        {showUserMenu && (
          <div className="user-menu-dropdown">
            <button onClick={() => { setShowUserMenu(false); navigate('/user-settings'); }} className="dropdown-item">
              User Settings
            </button>
            <button onClick={() => { setShowUserMenu(false); handleLogoutClick(); }} className="dropdown-item logout-dropdown">
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="logout-modal-overlay" onClick={handleCancelLogout}>
          <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Ready to leave?</h2>
            <p>Your monitoring session will end. You can log back in anytime.</p>
            <div className="logout-modal-buttons">
              <button className="btn-cancel" onClick={handleCancelLogout}>Cancel</button>
              <button className="btn-confirm" onClick={handleConfirmLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
