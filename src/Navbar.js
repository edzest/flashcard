import React from 'react';
import './Navbar.css';

function Navbar() {

  const handleSettingsClick = () => {
    window.location.href = '/settings';
  };

  const handleHomeClick = () => {
    window.location.href = '/';
  }

  return (
    <nav className="navbar">
      <div className='container'>
      <h1 className="navbar-title" onClick={handleHomeClick}>FlashCards <span className='edzest'>by edzest</span></h1>
      <span className="settings-icon" onClick={handleSettingsClick}>&#9881;</span>
      </div>
    </nav>
  );
}

export default Navbar;