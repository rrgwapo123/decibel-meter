import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const links = [
  { name: 'Dashboard', to: '/dashboard' },
  { name: 'Devices', to: '/devices' },
  { name: 'Violations', to: '/violations' },
  {
    name: 'Reports',
    children: [
      { name: 'All Reports', to: '/reports' },
      { name: 'Make a Report', to: '/reports/new' },
    ],
  },
  { name: 'Users', to: '/users' },
  { name: 'Settings', to: '/settings' },

];

const Sidebar = ({ isOpen = true, onLogout }) => {


  return (
    <>
      <nav className={`sidebar-nav ${isOpen ? 'open' : 'closed'}`}>
        <ul>
          {links.map((link) => {
            if (link.name === 'Reports') {
              return (
                <li key="Reports" className="sidebar-group">
                  <div style={{ fontVariant: 'small-caps', fontSize: '0.95rem', margin: '0.5rem 1rem 0.25rem 1rem', color: '#bbb', letterSpacing: '0.08em' }}>Report</div>
                  <ul className="sidebar-children" style={{ marginLeft: '0.5rem' }}>
                    <li>
                      <NavLink to="/reports/new" className={({ isActive }) => (isActive ? 'active' : '')}>
                        Make Report
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/reports" end className={({ isActive }) => (isActive ? 'active' : '')}>
                        All Reports
                      </NavLink>
                    </li>
                  </ul>
                </li>
              );
            }
            if (link.children) {
              // Skip rendering children for Reports, already handled above
              return null;
            }
            return (
              <li key={link.name}>
                <NavLink to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {link.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
