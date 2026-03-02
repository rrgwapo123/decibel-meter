import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import LoginSuccess from './components/LoginSuccess';
import Dashboard from './components/Dashboard';
import Devices from './components/Devices';
import Violations from './components/Violations';
import Users from './components/Users';
import Settings from './components/Settings';
import UserSettings from './components/UserSettings';
import ReportForm from './components/ReportForm';
import Reports from './components/Reports';
import ReportDetails from './components/ReportDetails';

// initial data moved from components
const initialUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com', role: 'enforcer', status: 'disabled' },
];

const initialDevices = [
  { id: 'DEV-001', location: 'Building A - Lobby', status: 'online', lastReading: '2026-03-01 09:45' },
  { id: 'DEV-002', location: 'Building B - Floor 3', status: 'offline', lastReading: '2026-03-01 08:12' },
];

const initialStats = {
  activeSensors: 128,
  highestDb: 102.5,
  violationsToday: 3,
  onlineDevices: 54,
};

const initialViolations = [
  { id: 1, sensor: 'Sensor A', level: 95.7, time: '2026-03-01 09:23', reportId: null },
];

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  // lifted state
  const [users, setUsers] = useState(initialUsers);
  const [devices, setDevices] = useState(initialDevices);
  const [stats, setStats] = useState(initialStats);
  const [violations, setViolations] = useState(initialViolations);

  const [userEmail, setUserEmail] = useState('');
  const [currentUser, setCurrentUser] = useState({
    email: '',
    username: '',
    phone: '',
    picture: '',
  });

  const [reports, setReports] = useState([]);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);

  // when a report is created we'll optionally create a violation entry if it's pending
  const addReport = (report) => {
    setReports((prev) => {
      const nextId = prev.length ? prev[prev.length - 1].id + 1 : 1;
      const publishedDate = new Date().toISOString().slice(0, 16).replace('T', ' ');
      const newReport = { id: nextId, publishedDate, ...report };

      // automatically create corresponding violation for pending reports
      if (newReport.status === 'PENDING') {
        setViolations((vprev) => {
          const vid = vprev.length ? vprev[vprev.length - 1].id + 1 : 1;
          return [
            ...vprev,
            {
              id: vid,
              sensor: newReport.location,
              level: 0, // placeholder level
              time: newReport.datetime,
              reportId: newReport.id,
            },
          ];
        });
        setStats((s) => ({ ...s, violationsToday: s.violationsToday + 1 }));
      }
      return [...prev, newReport];
    });
  };

  const updateCurrentUser = (updates) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
  };

  const handleLogin = (email) => {
    setLoggedIn(true);
    setUserEmail(email);
    setShowLoginSuccess(true);
    setCurrentUser({
      email,
      username: email.split('@')[0],
      phone: '',
      picture: '',
    });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserEmail('');
  };

  const ProtectedRoute = ({ children }) => {
    if (!loggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // user handlers
  const addOrUpdateUser = (user) => {
    setUsers((prev) => {
      if (user.id) {
        return prev.map((u) => (u.id === user.id ? user : u));
      }
      const nextId = prev.length ? Math.max(...prev.map((u) => u.id)) + 1 : 1;
      return [...prev, { ...user, id: nextId }];
    });
  };
  const deleteUser = (id) => setUsers((prev) => prev.filter((u) => u.id !== id));

  // device handlers
  const addOrUpdateDevice = (device) => {
    setDevices((prev) => {
      const exists = prev.some((d) => d.id === device.id);
      if (exists) {
        return prev.map((d) => (d.id === device.id ? device : d));
      }
      return [...prev, device];
    });
  };
  const deleteDevice = (id) => setDevices((prev) => prev.filter((d) => d.id !== id));
  const toggleDeviceStatus = (id) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === 'online' ? 'offline' : 'online' }
          : d
      )
    );
  };

  // stats/violations handlers
  const addViolation = (violation) => {
    setViolations((prev) =>
      typeof violation === 'function' ? violation(prev) : [...prev, violation]
    );
    setStats((prev) => ({ ...prev, violationsToday: prev.violationsToday + 1 }));
  };
  const removeViolationByReport = (reportId) => {
    setViolations((prev) => prev.filter((v) => v.reportId !== reportId));
    setStats((prev) => ({
      ...prev,
      violationsToday: Math.max(0, prev.violationsToday - 1),
    }));
  };

  const updateStats = (updates) => setStats((prev) => ({ ...prev, ...updates }));

  // Helper for report details route
  function ReportDetailsWrapper() {
    const { id } = useParams();
    const [report, setReport] = React.useState(() => reports.find((r) => String(r.id) === String(id)));

    const handleUpdate = (updated) => {
      // determine if status transitioned in/out of PENDING
      if (report.status !== updated.status) {
        const prevStatus = report.status;
        const newStatus = updated.status;
        if (prevStatus === 'PENDING' && newStatus !== 'PENDING') {
          // remove any violation tied to this report
          removeViolationByReport(updated.id);
        } else if (prevStatus !== 'PENDING' && newStatus === 'PENDING') {
          // add violation for re‑pending report
          setViolations((vprev) => {
            const vid = vprev.length ? vprev[vprev.length - 1].id + 1 : 1;
            return [
              ...vprev,
              {
                id: vid,
                sensor: updated.location,
                level: 0,
                time: updated.datetime,
                reportId: updated.id,
              },
            ];
          });
          setStats((s) => ({ ...s, violationsToday: s.violationsToday + 1 }));
        }
      }

      setReports((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      setReport(updated);
    };

    return <ReportDetails report={report} onUpdate={handleUpdate} currentUser={currentUser} />;
  }

  return (
    <Router>
      <Welcome />
      {showLoginSuccess && <LoginSuccess email={userEmail} onClose={() => setShowLoginSuccess(false)} />}
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={loggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            element={
              <ProtectedRoute>
                <Layout onLogout={handleLogout} userEmail={userEmail} currentUser={currentUser} />
              </ProtectedRoute>
            }
          >
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  stats={stats}
                  violations={violations}
                  devices={devices}
                  addViolation={addViolation}
                  updateStats={updateStats}
                />
              }
            />
            <Route
              path="/devices"
              element={
                <Devices
                  devices={devices}
                  addDevice={addOrUpdateDevice}
                  updateDevice={addOrUpdateDevice}
                  deleteDevice={deleteDevice}
                  toggleStatus={toggleDeviceStatus}
                />
              }
            />
            <Route
              path="/user-settings"
              element={<UserSettings currentUser={currentUser} updateUser={updateCurrentUser} />}
            />
            <Route
              path="/violations"
              element={<Violations violations={violations} />}
            />
            <Route
              path="/users"
              element={
                <Users
                  users={users}
                  addUser={addOrUpdateUser}
                  updateUser={addOrUpdateUser}
                  deleteUser={deleteUser}
                />
              }
            />
            <Route
              path="/reports"
              element={<Reports reports={reports} />}
            />
            <Route
              path="/reports/new"
              element={<ReportForm addReport={addReport} />}
            />
            <Route
              path="/reports/:id"
              element={<ReportDetailsWrapper />}
            />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/dashboard" : "/login"} replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
