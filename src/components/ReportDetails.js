import React from 'react';
import './reports.css';
import ReportUpdate from './ReportUpdate';

// Tailwind CSS badge rendering helper
export function getStatusBadge(status) {
  const base =
    'inline-block rounded-full px-3 py-1 text-sm font-semibold border align-middle whitespace-nowrap';
  if (!status) return null;
  const s = status.trim().toLowerCase().replace(/_/g, ' ');
  let label = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  if (s === 'pending')
    return <span className={base + ' bg-yellow-50 text-yellow-800 border-yellow-300'}>Pending</span>;
  if (s === 'action taken')
    return <span className={base + ' bg-green-50 text-green-800 border-green-300'}>Action Taken</span>;
  if (s === 'dismissed')
    return <span className={base + ' bg-red-50 text-red-800 border-red-300'}>Dismissed</span>;
  // fallback for unknown statuses, always show a badge
  return <span className={base + ' bg-gray-100 text-gray-700 border-gray-300'}>{label}</span>;
}

const ReportDetails = ({ report, onUpdate, currentUser }) => {
  if (!report) return <div style={{ padding: '1rem' }}>No report selected</div>;

  return (
    <div className="report-details">
      <h2>{report.title}</h2>
      <br></br>
      <p><strong>Reporter:</strong> {report.reporter}</p>
      <br></br>
      <p><strong>Published:</strong> {report.publishedDate}</p>
      <br></br>
      <p><strong>Vehicle Type:</strong> {report.vehicleType}</p>
      <br></br>
      <p><strong>Plate No.:</strong> {report.plate}</p>
      <br></br>
      <p><strong>Location:</strong> {report.location}</p>
      <br></br>
      <p><strong>Date & Time:</strong> {report.datetime}</p>
      <br></br>
      <p><strong>Description:</strong></p>
      <p>{report.description}</p>
      <br></br>
      {/* Status badge uses Tailwind CSS for styling */}
      <p><strong>Status:</strong> {getStatusBadge(report.status)}</p>

      {report.attachments && report.attachments.length > 0 && (
        <div className="attachments">
          <br></br>
          <h4><strong>Attachments: {report.attachments.length}</strong></h4>
          <ul>
            {report.attachments.map((a, idx) => (
              <li key={idx}>
                {a.name} ({a.type}) -
                {a.file && a.type && a.type.startsWith('image') ? (
                  <button
                    className="show-attach"
                    style={{ marginLeft: 8 }}
                    onClick={() => {
                      const url = URL.createObjectURL(a.file);
                      const imgWindow = window.open('', '_blank');
                      if (imgWindow) {
                        imgWindow.document.write(`<!DOCTYPE html><html><head><title>Attachment</title></head><body style='margin:0;background:#222;'><img src='${url}' style='max-width:100vw;max-height:100vh;display:block;margin:auto;'/></body></html>`);
                      }
                    }}
                  >
                    View Attachment
                  </button>
                ) : a.file ? (
                  <a
                    href={URL.createObjectURL(a.file)}
                    download={a.name}
                    className="show-attach"
                    style={{ marginLeft: 8 }}
                  >
                    Download Attachment
                  </a>
                ) : (
                  <span style={{ marginLeft: 8, color: '#888' }}>No file</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <ReportUpdate report={report} onUpdate={onUpdate} currentUser={currentUser} />
    </div>
  );
};

export default ReportDetails;
