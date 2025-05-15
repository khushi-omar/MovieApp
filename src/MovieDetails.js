import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetails.css';
import { FaStar, FaCalendarAlt, FaFilm, FaClock, FaGlobe, FaUsers, FaBookmark, FaArrowLeft } from 'react-icons/fa';

const MovieDetails = ({ apiUrl }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}&i=${id}&plot=full`);
        const data = await response.json();
        
        if (data.Response === "True") {
          setMovie(data);
          
          // Fetch similar movies based on genre
          if (data.Genre) {
            const mainGenre = data.Genre.split(',')[0].trim();
            const similarResponse = await fetch(`${apiUrl}&s=${mainGenre}&type=movie&page=1`);
            const similarData = await similarResponse.json();
            
            if (similarData.Response === "True") {
              // Filter out the current movie and limit to 6 movies
              const filtered = similarData.Search
                .filter(m => m.imdbID !== id)
                .slice(0, 6);
              setSimilarMovies(filtered);
            }
          }
        } else {
          setError("Movie not found");
        }
      } catch (err) {
        setError("Failed to fetch movie details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, apiUrl]);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would also implement saving to localStorage or database
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button className="back-button" onClick={handleBack}>
          <FaArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  if (!movie) return null;

  // Extract and format movie info
  const { Title, Year, Rated, Runtime, Genre, Director, Actors, Plot, Poster, imdbRating, BoxOffice, Awards, Country, Language } = movie;
  
  // Convert rating to stars (out of 5)
  const ratingStars = Math.round((parseFloat(imdbRating) / 10) * 5);

  return (
    <div className="movie-details-container">
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft /> Back to Movies
      </button>
      
      <div className="movie-details-header glass">
        <div className="movie-poster-container">
          <img 
            src={Poster !== 'N/A' ? Poster : 'https://via.placeholder.com/300x450?text=No+Image'} 
            alt={Title} 
            className="movie-details-poster"
          />
          <button 
            className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
            onClick={toggleFavorite}
          >
            <FaBookmark /> {isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
          </button>
        </div>
        
        <div className="movie-info-container">
          <h1 className="movie-title">{Title}</h1>
          
          <div className="movie-meta">
            <span className="year"><FaCalendarAlt /> {Year}</span>
            <span className="rated">{Rated}</span>
            <span className="runtime"><FaClock /> {Runtime}</span>
          </div>
          
          <div className="movie-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < ratingStars ? 'star filled' : 'star'} />
              ))}
            </div>
            <span className="rating-value">{imdbRating}/10</span>
          </div>
          
          <div className="genres">
            {Genre.split(',').map((genre, index) => (
              <span key={index} className="genre-tag">{genre.trim()}</span>
            ))}
          </div>
          
          <div className="movie-plot">
            <h3>Plot</h3>
            <p>{Plot}</p>
          </div>
          
          <div className="movie-details-grid">
            <div className="detail-item">
              <h4>Director</h4>
              <p>{Director}</p>
            </div>
            <div className="detail-item">
              <h4>Cast</h4>
              <p>{Actors}</p>
            </div>
            <div className="detail-item">
              <h4>Country</h4>
              <p><FaGlobe /> {Country}</p>
            </div>
            <div className="detail-item">
              <h4>Language</h4>
              <p>{Language}</p>
            </div>
            {BoxOffice && BoxOffice !== 'N/A' && (
              <div className="detail-item">
                <h4>Box Office</h4>
                <p>{BoxOffice}</p>
              </div>
            )}
            {Awards && Awards !== 'N/A' && (
              <div className="detail-item">
                <h4>Awards</h4>
                <p><FaUsers /> {Awards}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {similarMovies.length > 0 && (
        <div className="similar-movies-section">
          <h2 className="section-title">Similar Movies</h2>
          <div className="similar-movies-container">
            {similarMovies.map((movie) => (
              <div 
                key={movie.imdbID} 
                className="similar-movie-card glass"
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
              >
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'} 
                  alt={movie.Title}
                />
                <div className="similar-movie-info">
                  <h4>{movie.Title}</h4>
                  <p>{movie.Year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;