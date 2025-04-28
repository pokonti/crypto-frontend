import React, { useEffect, useState } from 'react';
import './NotFound.css';

const NotFound = () => {
  const [blocks, setBlocks] = useState([]);
  
  useEffect(() => {
    // Generate random blockchain-like blocks
    const generateBlocks = () => {
      const newBlocks = [];
      for (let i = 0; i < 20; i++) {
        newBlocks.push({
          id: i,
          hash: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          left: Math.random() * 80,
          top: Math.random() * 80,
          delay: Math.random() * 5
        });
      }
      setBlocks(newBlocks);
    };
    
    generateBlocks();
  }, []);

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