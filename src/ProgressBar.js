import React from 'react';
import './ProgressBar.css';

function ProgressBar({ score, total }) {
  return (
    <div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${score/total*100}%` }}></div>
      </div>
      <p className='score'>{score}/{total}</p>
    </div>

  );
}

export default ProgressBar;