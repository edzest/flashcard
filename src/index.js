import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import './index.css';
import Home from './Home';
import App from './App';
import wordSets from './WordSets';
import Settings from './Settings';
import Navbar from './Navbar';

// Load and apply the theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
} else {
  document.body.classList.remove('dark-theme');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <div className='app-container'>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app/:topic" element={<AppWrapper />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </main>
      <footer className="footer">
        <p>a product of <a href='https://www.edzest.org' target='blank'>Edzest Education Services</a></p>
      </footer>
    </div>
  </React.StrictMode>
);

function AppWrapper() {
  const { topic } = useParams();
  const words = wordSets[topic];
  return <App words={words} topic={topic} />;
}