import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/violations.css';

const Violations = ({ violations = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filtered = violations.filter((v) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      v.sensor.toLowerCase().includes(term) ||
      String(v.id).includes(term) ||
      v.time.toLowerCase().includes(term)
    );
  });

  return (
    <div className="violations-container">
      <h2>Violations</h2>
      <div className="violations-search">
        <input
          type="search"
          placeholder="Search violators..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="violations-list">
        <ul>
          {filtered.map((v) => (
            <li
              key={v.id}
              className={v.reportId ? 'linked-violation' : ''}
              onClick={() => v.reportId && navigate(`/reports/${v.reportId}`)}
            >
              {v.time} - {v.sensor} ({v.level} dB)
              {v.reportId && <em className="report-tag"> (from report #{v.reportId})</em>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Violations;
