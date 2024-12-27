import React, { useState } from 'react';
import './Settings.css';
import { clearAllProgress } from './LocalStorage';

function Settings() {
    const [showToast, setShowToast] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    const handleClearProgress = () => {
        clearAllProgress();
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            window.location.reload();
        }, 3000); // Hide toast after 3 seconds
    };

    const handleThemeToggle = () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        document.body.classList.toggle('dark-theme');
        window.location.reload();
    };

    return (
        <div>
            <h1>Settings</h1>
            <hr />
            <h2>Clear Progress</h2>
            <p>Your progress is saved in browser's memory.
                Click the below button to clear all the progress.</p>
            <button className='settings-btn' onClick={handleClearProgress}>CLEAR</button>
            {showToast && <div className='toast'>Progress cleared!</div>}         
            <hr />
            <h2>Switch theme</h2>
            <p>Toggle the below button to switch to light or dark theme.</p>
            <label className="switch">
                <input type="checkbox" checked={isDarkTheme} onChange={handleThemeToggle} />
                <span className="slider round"></span>
            </label>
        </div>
    );
}

export default Settings;
