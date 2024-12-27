import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './App.css';
import ProgressBar from './ProgressBar';
import Card from './Card';
import { saveProgress, getSavedWords, clearProgress } from './LocalStorage';
import { CircularLinkedList } from './CircularLinkedList';

function App({ words, topic }) {
  const navigate = useNavigate();
  const [list, setList] = useState(new CircularLinkedList());
  const [currentNode, setCurrentNode] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const newList = new CircularLinkedList();
    const savedWords = getSavedWords(topic);
    words.filter(w => !savedWords.includes(w.word)).forEach(word => newList.add(word));
    setList(newList);
    setScore(savedWords.length)
    setCurrentNode(newList.head);
  }, [topic, words]);

  const onCardClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  }

  const handleKnowClick = () => {
    /*
    1. increment score
    2. save the word in local storage
    3. filter the word & increment currentIndex
    4. flip the card
    */
    setScore(score + 1);
    list.remove(currentNode.data);
    saveProgress(topic, currentNode.data.word)
    setCurrentNode(list.getNext(currentNode));
    setIsFlipped(false);
  };

  const handleDontKnowClick = () => {
    /*
    1. increment the currentIndex
    2. flip the card
    */
    setCurrentNode(list.getNext(currentNode));
    setIsFlipped(false);
  };

  const reset = () => {
    clearProgress(topic);
    const newList = new CircularLinkedList();
    words.forEach(word => newList.add(word));
    setList(newList);
    setCurrentNode(newList.head);
    setScore(0);
  }

  if (list.getSize() === 0) {
    return (
      <div className='App'>
        <h1>{topic}</h1>
        
        <p className='party-popper'>🎉</p>
        <p>You have mastered all the concepts in {topic}.</p>
        <div className='button-container'>
        <button onClick={reset}>
          Reset the score
        </button>
        <button onClick={() => navigate('/')}>
          Back to home
        </button>
        </div>
      </div>
    );
  }

  return (
    <div className='App'>
      <div className="header">
        <span className="back-arrow" onClick={() => navigate('/')}>&#8592;</span>
        <h1>{topic}</h1>
      </div>
      <ProgressBar score={score} total={words.length} />
      <div onClick={() => onCardClick()}>
        <Card word={currentNode.data.word} meaning={currentNode.data.meaning} isFlipped={isFlipped} />
      </div>

      {isFlipped && <div className="button-container">
        <button className="know-button" onClick={handleKnowClick}>I knew this</button>
        <button className="dont-know-button" onClick={handleDontKnowClick}>I didn't know this</button>
      </div>}
    </div>
  );
}

export default App;
