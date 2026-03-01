import React from 'react';

const Violations = ({ violations = [] }) => {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Violations</h2>
      <ul>
        {violations.map((v) => (
          <li key={v.id}>
            {v.time} - {v.sensor} ({v.level} dB)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Violations;
