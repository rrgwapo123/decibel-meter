import React, { useState } from 'react';
import './devices.css';

const Devices = ({ devices, addDevice, updateDevice, deleteDevice, toggleStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    id: '',
    location: '',
    status: 'online',
    lastReading: '',
  });

  const openModal = (device = null) => {
    if (device) {
      setForm(device);
    } else {
      setForm({ id: '', location: '', status: 'online', lastReading: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (devices.some((d) => d.id === form.id)) {
      updateDevice(form);
    } else {
      addDevice(form);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    deleteDevice(id);
  };


  return (
    <div className="devices-page">
      <header className="devices-header">
        <h2>Devices</h2>
        <button className="add-device-btn" onClick={() => openModal(null)}>
          Add Device
        </button>
      </header>
      <table className="devices-table">
        <thead>
          <tr>
            <th>Device ID</th>
            <th>Location</th>
            <th>Status</th>
            <th>Last Reading</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((dev) => (
            <tr key={dev.id}>
              <td>{dev.id}</td>
              <td>{dev.location}</td>
              <td onClick={() => toggleStatus(dev.id)} style={{ cursor: 'pointer' }}>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium gap-2 align-middle
                    ${dev.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  <span className={`w-2 h-2 rounded-full mr-2
                    ${dev.status === 'online' ? 'bg-green-300' : 'bg-red-300'}`}></span>
                  {dev.status === 'online' ? 'Online' : 'Offline'}
                </span>
              </td>
              <td>{dev.lastReading}</td>
              <td>
                <button className="action-btn" onClick={() => openModal(dev)}>
                  Edit
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDelete(dev.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add / Edit Device</h3>
            <form onSubmit={handleSave} className="modal-form">
              <div className="form-group">
                <label htmlFor="id">Device ID</label>
                <input
                  id="id"
                  name="id"
                  type="text"
                  value={form.id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="lastReading">Last Reading</label>
                <input
                  id="lastReading"
                  name="lastReading"
                  type="text"
                  value={form.lastReading}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices;
