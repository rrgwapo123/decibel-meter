import React, { useState } from 'react';
import './dashboard.css';


const Dashboard = ({ stats, violations, devices = [] }) => {
  const [alert, setAlert] = useState('');

  // Count violations for today
  const getTodayCount = () => {
    const today = new Date().toISOString().split('T')[0];
    return violations.filter(v => v.time.startsWith(today)).length;
  };

  // Count active devices (with status 'online')
  const getActiveSensors = () => {
    return devices.filter(d => d.status === 'online').length;
  };

  return (
    <div className="dashboard-container">
      <section className="content">
          {alert && <div className="alert-banner">{alert}</div>}
          <div className="stats-cards">
            <div className="card">
              <h3>Active Sensors</h3>
              <p>{getActiveSensors()}</p>
            </div>
            <div className="card">
              <h3>Highest dB</h3>
              <p>{stats.highestDb.toFixed(1)}</p>
            </div>
            <div className="card">
              <h3>Violations Today</h3>
              <p>{getTodayCount()}</p>
            </div>
          </div>
          <div className="chart-section">
            <h2>Decibel Levels (Line Chart)</h2>
            <div className="chart-placeholder">[Line chart placeholder]</div>
          </div>
          <div className="violations-list">
            <h2>Recent Violations</h2>
            <ul>
              {violations.slice(-1).map((v) => (
                <li key={v.id}>
                  {v.time} - {v.sensor} ({v.level} dB)
                </li>
              ))}
            </ul>
          </div>
        </section>
    </div>
  );
};

export default Dashboard;
