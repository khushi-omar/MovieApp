import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";
import {
  FaHome, FaFilm, FaLaugh, FaRobot,
  FaClock, FaInfoCircle, FaPoll, FaHeart
} from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchSuggestions(searchTerm);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};


  const HomeContent = () => (
    <>
      <header className="app-header">
        <h1 className="gradient-text">🎬 MovieHUB</h1>
        <p>Your go-to place for everything movies!</p>
      </header>
      
      <section className="hero-section">
        <div className="search-container" onClick={(e) => e.stopPropagation()}>
          <div className="search-glass">
            <input
              type="text"
              placeholder="🔍 Movies, Drama & other"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchMovies(searchTerm);
                  setShowSuggestions(false);
                }
              }}
              autoFocus
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
      
        </section>


          <section className="carousel-section">
  <h2 className="carousel-title">🎞️ Recommended for You</h2>
  <Slider {...carouselSettings}>
    {movies.slice(0, 12).map((movie) => (
      <div key={movie.imdbID} className="carousel-card" onClick={() => searchMovies(movie.Title)}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}
          alt={movie.Title}
        />
        <p>{movie.Title}</p>
      </div>
    ))}
  </Slider>
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
    </>
  );

  return (
    <Router>
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
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/movie/:id" element={<MovieDetails apiUrl={API_URL} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
