import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import wordSets from './WordSets';
import { getSavedWordCount } from './LocalStorage';

function Home() {
  const navigate = useNavigate();

  const handleSetClick = (topic) => {
    navigate(`/app/${topic}`);
  };

  return (
    <div className="Home">
      <h1 className='title'>PMP® Concepts</h1>
      <br />
      <br />
      <div className='flashcard-sets'>
        {Object.keys(wordSets).map((topic, index) => {
          return (
            <div key={index} onClick={() => handleSetClick(topic)}>
              <CardSet topic={topic}/>
            </div>  
          )
        })}
      </div>
    </div>
  );
}

function CardSet({topic}) {
  const total = wordSets[topic].length;
  const savedWordCount = getSavedWordCount(topic);
  let subtitle = '';
  if (savedWordCount === 0) {
    subtitle = `${total} cards`;
  } else if (savedWordCount === total) {
    subtitle = `COMPLETED 🎉`;
  } else if (savedWordCount < total){
    subtitle = `${savedWordCount} / ${total}`
  }
  return (
    <div>
      <div className={`flashcard-set`}>
        <h2 className={savedWordCount === total ? 'completed' : ''}>{topic.charAt(0).toUpperCase() + topic.slice(1)}</h2>
        <p className={`words-length ${savedWordCount === total ? 'completed' : ''}`}>{subtitle}</p>
      </div>
    </div>
  )
}

export default Home;