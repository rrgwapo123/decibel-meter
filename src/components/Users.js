import React, { useState } from 'react';
import './users.css';

const Users = ({ users, addUser, updateUser, deleteUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: '',
    email: '',
    role: 'admin',
    status: 'active',
  });
  const [search, setSearch] = useState('');

  const openModal = (user = null) => {
    if (user) {
      setForm(user);
    } else {
      setForm({ id: null, name: '', email: '', role: 'admin', status: 'active' });
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (form.id != null) {
      updateUser(form);
    } else {
      addUser(form);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    deleteUser(id);
  };

  return (
    <div className="users-page">
      <header className="users-header">
        <h2>User Management</h2>
        <div className="header-controls">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button className="add-user-btn" onClick={() => openModal(null)}>Add User</button>
        </div>
      </header>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((u) =>
              u.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role === 'admin' ? 'Admin' : 'Enforcer'}</td>
              <td>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium gap-2 align-middle
                    ${u.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  <span className={`w-2 h-2 rounded-full mr-2
                    ${u.status === 'active' ? 'bg-green-300' : 'bg-red-300'}`}></span>
                  {u.status === 'active' ? 'Active' : 'Disabled'}
                </span>
              </td>
              <td>
                <button className="action-btn" onClick={() => openModal(u)}>Edit</button>
                <button className="action-btn delete" onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add User</h3>
            <form onSubmit={handleSave} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="admin">Admin</option>
                  <option value="enforcer">Enforcer</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
