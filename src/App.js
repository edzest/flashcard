import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './App.css';
import ProgressBar from './ProgressBar';
import Card from './Card';
import { CircularLinkedList } from './CircularLinkedList';

function App({ words, topic }) {
  const navigate = useNavigate();
  const [list, setList] = useState(new CircularLinkedList());
  const [currentNode, setCurrentNode] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const newList = new CircularLinkedList();
    words.forEach(word => newList.add(word));
    setList(newList);
    setCurrentNode(newList.head);
  }, [words]);

  const onCardClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  }

  const handleKnowClick = () => {
    /*
    1. increment score
    2. filter the word & increment currentIndex
    3. flip the card
    */
    setScore(score + 1);
    list.remove(currentNode.data);
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

  if (list.getSize() === 0) {
    return (
      <div className='App'>
        <h1>Flash Card Set 1</h1>
        <p>You have completed the set</p>
      </div>
    );
  }

  return (
    <div className='App'>
      <div className="header">
        <span className="back-arrow" onClick={() => navigate(-1)}>&#8592;</span>
        <h1>{topic}</h1>
      </div>
      <ProgressBar score={score} total={words.length} />
      <div onClick={() => onCardClick()}>
        <Card word={currentNode.data.word} meaning={currentNode.data.meaning} isFlipped={isFlipped} />
      </div>

      {isFlipped && <div className="button-container">
        <button className="know-button" onClick={handleKnowClick}>I know this</button>
        <button className="dont-know-button" onClick={handleDontKnowClick}>I don't know this</button>
      </div>}
    </div>
  );
}

export default App;
