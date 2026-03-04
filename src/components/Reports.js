import React, { useState } from 'react';
import { getStatusBadge } from './ReportDetails';
import { useNavigate } from 'react-router-dom';
import '../styles/reports.css';

const Reports = ({ reports = [] }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ vehicleType: 'All', location: '', date: '', status: 'All' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filtered = reports.filter((r) => {
    if (filters.vehicleType !== 'All' && r.vehicleType !== filters.vehicleType) return false;
    if (filters.location && !r.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.date && !r.datetime.startsWith(filters.date)) return false;
    if (filters.status !== 'All' && r.status !== filters.status) return false;
    if (query) {
      const q = query.toLowerCase();
      return r.title.toLowerCase().includes(q) || r.reporter.toLowerCase().includes(q) || r.plate.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="reports-container">
      <h2>Reports</h2>
      <div className="reports-controls">
        <input placeholder="Search title/reporter/plate" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select name="vehicleType" value={filters.vehicleType} onChange={handleFilterChange}>
          <option>All</option>
          <option>Motorcycle</option>
          <option>Car</option>
        </select>
        <input name="location" placeholder="Location" value={filters.location} onChange={handleFilterChange} />
        <input name="date" type="date" value={filters.date} onChange={handleFilterChange} />
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option>All</option>
          <option>PENDING</option>
          <option>ACTION TAKEN</option>
          <option>DISMISSED</option>
        </select>
      </div>

      <table className="reports-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Vehicle Type</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr key={r.id} className="report-row" onClick={() => navigate(`/reports/${r.id}`)}>
              <td><center>{r.id}</center></td>
              <td><center>{r.title}</center></td>
              <td><center>{r.publishedDate}</center></td>
              <td><center>{r.vehicleType}</center></td>
              <td><center>{r.location}</center></td>
              <td><center>{getStatusBadge(r.status)}</center></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
