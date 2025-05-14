import React from 'react';
import './MovieCard.css';
import { FaInfo } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card glass">
      <div className="poster-wrapper">
        <img
          src={
            movie.Poster !== 'N/A'
              ? movie.Poster
              : 'https://via.placeholder.com/200x300?text=No+Image'
          }
          alt={movie.Title}
          className="poster"
        />
        <div className="overlay">
          <div className="movie-info">
            <h3>{movie.Title}</h3>
            <p>{movie.Year} · {movie.Type.toUpperCase()}</p>
            <button className="details-button"><FaInfo/>See Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;


