import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="content-box">
        <div className="error-code">
          <span className="four">4</span>
          <span className="zero">
            <svg viewBox="0 0 100 100" className="coin">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#64f0d5" strokeWidth="5" />
              <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="40" fill="#64f0d5">₿</text>
            </svg>
          </span>
          <span className="four">4</span>
        </div>
        <h1 className="title">Page Not Found</h1>
        <div className="actions">
          <button className="action-button" onClick={() => window.location.href = '/'}>Return to Home</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;