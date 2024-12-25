import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import wordSets from './WordSets';

function Home() {
  const navigate = useNavigate();

  const handleSetClick = (topic) => {
    navigate(`/app/${topic}`);
  };

  return (
    <div className="Home">
      <h1 className='title'>PMP® Concepts FlashCards</h1>
      <br />
      <br />
      <div className='flashcard-sets'>
        {Object.keys(wordSets).map((topic, index) => (
          <div key={index} onClick={() => handleSetClick(topic)}>
            <div className='flashcard-set'>
              <h2>{topic.charAt(0).toUpperCase() + topic.slice(1)}</h2>
              <p className='words-length'>{wordSets[topic].length} cards</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;