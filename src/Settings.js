import React, { useState } from 'react';
import './Settings.css';
import { clearAllProgress } from './LocalStorage';

function Settings() {
    const [showToast, setShowToast] = useState(false);

    const handleClearProgress = () => {
        clearAllProgress();
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000); // Hide toast after 3 seconds
    };
    return (
        <div>
            <h1>Settings</h1>
            <hr></hr>
            <h2>Clear Progress</h2>
            <p>Your progress is saved in browser's memory.
                Click the below button to clear all the progress.</p>
            <button className='settings-btn' onClick={handleClearProgress}>CLEAR</button>
            {showToast && <div className='toast'>Progress cleared!</div>}
        </div>
    );
}

export default Settings;
