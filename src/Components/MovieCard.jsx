import React from 'react';
import '../ComponentCss/MovieCard.css';

const MovieCard = ({ image, title, rating, onClick }) => {
  return (
    <div className="movie-card" onClick={onClick}> {/* Attach the onClick handler here */}
      <img src={image} alt={title} className="movie-image" />
      <div className="movie-info">
        <h4>{title}</h4>
        <p>Rating: {rating}</p>
      </div>
    </div>
  );
};

export default MovieCard;
