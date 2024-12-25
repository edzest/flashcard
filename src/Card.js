import './Card.css';

function Card({ word, meaning, isFlipped }) {

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`}>
      <div className="card-front">
        <h2>{word}</h2>
      </div>
      <div className="card-back">
        <h3>{word}</h3>
        <div className='meaning'>{meaning}</div>
      </div>
    </div>
  );
}

export default Card;