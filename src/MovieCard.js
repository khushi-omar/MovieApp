
import React from 'react';
import { Link } from 'react-router-dom';
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
            <Link to={`/movie/${movie.imdbID}`} className="details-button">
              <FaInfo/>See Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
