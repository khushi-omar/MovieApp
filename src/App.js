/*import { useState, useEffect } from "react";
import './App.css';
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import {
  FaHome, FaFilm, FaLaugh, FaRobot,
  FaClock, FaInfoCircle, FaPoll, FaHeart
} from 'react-icons/fa';

const API_URL = "https://www.omdbapi.com?apikey=b169cf0";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const searchMovies = async (title) => {
    const totalPages = 3;
    let allMovies = [];

    for (let page = 1; page <= totalPages; page++) {
      const response = await fetch(`${API_URL}&s=${title}&page=${page}`);
      const data = await response.json();

      if (data.Search) {
        allMovies = [...allMovies, ...data.Search];
      }
    }

    setMovies(allMovies);
    setSuggestions([]);
  };

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(`${API_URL}&s=${query}&page=1`);
    const data = await res.json();

    if (data.Search) {
      setSuggestions(data.Search.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div className="app-container">
      <aside className="sidebar glass">
        <div className="logo-section">
          <h2>🎬 MovieGo</h2>
          <p>Stay Hooked !!</p>
        </div>
        <ul className="nav-menu">
          <li onClick={() => searchMovies("Batman")}><FaHome /> Home</li>
          <li onClick={() => searchMovies("Action")}><FaFilm /> Action</li>
          <li onClick={() => searchMovies("Comedy")}><FaLaugh /> Comedy</li>
          <li onClick={() => searchMovies("Sci-Fi")}><FaRobot /> Sci-Fi</li>
          <li onClick={() => searchMovies("Sci-Fi")}><FaPoll /> Popular</li>
          <li onClick={() => searchMovies("Sci-Fi")}><FaHeart /> Favourites</li>
          <li onClick={() => searchMovies("2023")}><FaClock /> Latest</li>
          <li onClick={() => alert("Built by Khushi")}><FaInfoCircle /> About</li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="app-header">
          <h1 className="gradient-text">🎬 MovieHUB</h1>
          <p>Your go-to place for everything movies!</p>
        </header>
        

        
        <section className="hero-section">
          <div className="search-glass">
            <input
              type="text"
              placeholder="🔍 Movies, Drama & other"
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                fetchSuggestions(value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchMovies(searchTerm);
                }
              }}
            />
            <button className="search-button" onClick={() => searchMovies(searchTerm)}>
              <img src={SearchIcon} alt="Search" />
            </button>
          </div>

              <section className="trailer-strip">
          <div className="trailer-row">
            <div className="trailer-card">
              <iframe
                src="https://www.youtube.com/embed/DotnJ7tTA34"
                title="House of the Dragon"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
              <p>House of the Dragon</p>
            </div>
            
            
          </div>
        </section>


          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((movie) => (
                <li
                  key={movie.omdbID}
                  onClick={() => {
                    searchMovies(movie.Title);
                    setSearchTerm(movie.Title);
                    setSuggestions([]);
                  }}
                >
                  {movie.Title}
                </li>
              ))}
            </ul>
          )}
          
        </section>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
*/

import { useState, useEffect } from "react";
import './App.css';
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import {
  FaHome, FaFilm, FaLaugh, FaRobot,
  FaClock, FaInfoCircle, FaPoll, FaHeart
} from 'react-icons/fa';

const API_URL = "https://www.omdbapi.com?apikey=b169cf0";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchMovies = async (title) => {
    const totalPages = 3;
    let allMovies = [];

    for (let page = 1; page <= totalPages; page++) {
      const response = await fetch(`${API_URL}&s=${title}&page=${page}`);
      const data = await response.json();

      if (data.Search) {
        allMovies = [...allMovies, ...data.Search];
      }
    }

    setMovies(allMovies);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await fetch(`${API_URL}&s=${query}&page=1`);
      const data = await res.json();

      if (data.Search) {
        setSuggestions(data.Search.slice(0, 5));
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    const delayDebounce = setTimeout(() => {
      fetchSuggestions(searchTerm);
    }, 500); // Debounce to avoid too many API calls

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div className="app-container">
      <aside className="sidebar glass">
        <div className="logo-section">
          <h2>🎬 MovieGo</h2>
          <p>Stay Hooked !!</p>
        </div>
        <ul className="nav-menu">
          <li onClick={() => searchMovies("Batman")}><FaHome /> Home</li>
          <li onClick={() => searchMovies("Action")}><FaFilm /> Action</li>
          <li onClick={() => searchMovies("Comedy")}><FaLaugh /> Comedy</li>
          <li onClick={() => searchMovies("Sci-Fi")}><FaRobot /> Sci-Fi</li>
          <li onClick={() => searchMovies("Popular")}><FaPoll /> Popular</li>
          <li onClick={() => searchMovies("Favorite")}><FaHeart /> Favourites</li>
          <li onClick={() => searchMovies("2023")}><FaClock /> Latest</li>
          <li onClick={() => alert("Built by Khushi")}><FaInfoCircle /> About</li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="app-header">
          <h1 className="gradient-text">🎬 MovieHUB</h1>
          <p>Your go-to place for everything movies!</p>
        </header>
        
        {/* New Glassy Search + Horizontal Movie Strip */}
        <section className="hero-section">
          <div className="search-container">
            <div className="search-glass">
              <input
                type="text"
                placeholder="🔍 Movies, Drama & other"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchMovies(searchTerm);
                    setShowSuggestions(false);
                  }
                }}
              />
              <button 
                className="search-button" 
                onClick={() => {
                  searchMovies(searchTerm);
                  setShowSuggestions(false);
                }}
              >
                <img src={SearchIcon} alt="Search" />
              </button>
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((movie) => (
                  <li
                    key={movie.imdbID}
                    onClick={() => {
                      searchMovies(movie.Title);
                      setSearchTerm(movie.Title);
                      setShowSuggestions(false);
                    }}
                  >
                    {movie.Title} ({movie.Year})
                  </li>
                ))}
              </ul>
            )}
            {isLoading && (
              <div className="suggestions-loading">Loading suggestions...</div>
            )}
          </div>
          
          <section className="trailer-strip">
            <div className="trailer-row">
              <div className="trailer-card">
                <iframe
                  src="https://www.youtube.com/embed/DotnJ7tTA34"
                  title="House of the Dragon"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
                <p>House of the Dragon</p>
              </div>
            </div>
          </section>
        </section>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;