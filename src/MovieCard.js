/*import React from 'react'

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
    return (
        <div className="movie" key={imdbID}>
            <div>
                <p>{Year}</p>
            </div>
            <div>
                <img src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"} alt={Title} />
            </div>
            <div>
                <span>{Type}</span>
                <h3>{Title}</h3>
            </div>
        </div>
    )
}

export default MovieCard*/

import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
        
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
            <button className="details-button">See Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
