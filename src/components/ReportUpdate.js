import React, { useState } from 'react';
import './reports.css';

const ReportUpdate = ({ report, onUpdate, currentUser }) => {
  const [status, setStatus] = useState(report.status || 'PENDING');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(report.comments || []);
  const [showForm, setShowForm] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    const userLabel = `${currentUser.username} [${currentUser.role ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1) : 'User'}]`;
    const newComments = comment ? [...comments, { text: comment, date: new Date().toISOString().slice(0, 16).replace('T', ' '), user: userLabel }] : comments;
    onUpdate({ ...report, status, comments: newComments });
    setComments(newComments);
    setComment('');
    setShowForm(false);
  };

  return (
    <div className="report-update-container">
      <button className="btn-update" onClick={() => setShowForm(!showForm)}>
        Update Report
      </button>
      {showForm && (
        <form className="update-form" onSubmit={handleUpdate}>
          <label>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="PENDING">Pending</option>
            <option value="ACTION TAKEN">Action Taken</option>
            <option value="DISMISSED">Dismissed</option>
          </select>
          <label>Add Comment</label>
          <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Enter comment..." />
          <button type="submit" className="btn-submit">Save</button>
        </form>
      )}
      <div className="comments-list">
        <h4>Comments</h4>
        {comments.length === 0 ? <div>No comments yet.</div> : (
          <ul>
            {comments.map((c, idx) => (
              <li key={idx}><strong>{c.date}:</strong> {c.text} <span style={{color:'#22c55e'}}>- {c.user}</span></li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReportUpdate;
