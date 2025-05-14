
/*import { useState, useEffect } from "react";
import './App.css';
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import { FaHome, FaFilm, FaLaugh, FaRobot, FaClock, FaInfoCircle, FaPoll, FaHeart } from 'react-icons/fa';

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
          <li onClick={() => searchMovies("Batman")}><FaHome/> Home</li>
          <li onClick={() => searchMovies("Action")}><FaFilm/> Action</li>
          <li onClick={() => searchMovies("Comedy")}><FaLaugh/> Comedy</li>
          <li onClick={() => searchMovies("Sci-Fi")}><FaRobot/> Sci-Fi</li>
          <li onClick={() => searchMovies("Sci-Fi")}><FaPoll/> Popular</li>
          <li onClick={() => searchMovies("Sci-Fi")}><FaHeart/> Favourites</li>
          <li onClick={() => searchMovies("2023")}><FaClock/> Latest</li>
          <li onClick={() => alert("Built by Khushi")}><FaInfoCircle/> About</li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="app-header">
          <h1 className="gradient-text">🎬 MovieHUB</h1>
          <p>Your go-to place for everything movies!</p>
        </header>

      <section className="trailer-strip ">
  
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
    <div className="trailer-card">
      <iframe
        src="https://www.youtube.com/embed/Way9Dexny3w"
        title="Dune: Part Two"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <p>Dune: Part Two</p>
    </div>
    
  </div>
</section>


        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchMovies(searchTerm);
              }
            }}
          />
          <button onClick={() => searchMovies(searchTerm)}>
            <img src={SearchIcon} alt="Search" />
          </button>
        </div>

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
      setSuggestions(data.Search.slice(0, 5)); // Show top 5 suggestions
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

        {/* Trailer section */}
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
            <div className="trailer-card">
              <iframe
                src="https://www.youtube.com/embed/Way9Dexny3w"
                title="Dune: Part Two"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
              <p>Dune: Part Two</p>
            </div>
            
          </div>
        </section>

        {/* Search bar with suggestions */}
        <div className="search-bar-wrapper">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for movies..."
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
            <button onClick={() => searchMovies(searchTerm)}>
              <img src={SearchIcon} alt="Search" />
            </button>
          </div>

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((movie) => (
                <li
                  key={movie.imdbID}
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
        </div>

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
