import { useState, useEffect } from "react";
import './App.css';
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import { FaHome, FaFilm, FaLaugh, FaRobot, FaClock, FaInfoCircle } from 'react-icons/fa';

//const API_URL = "http://www.omdbapi.com?apikey=b169cf0";
const API_URL = "https://www.omdbapi.com?apikey=b169cf0";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="app-container"> {/*  Modified: main layout wrapper */}
    <div className="sidebar">
  <div className="logo-section">
    <h2>🎬 MovieGo</h2>
    <p> Stay Hooked !!</p>
  </div>
  <ul className="nav-menu">
    <li onClick={() => searchMovies("Batman")}><FaHome/>  Home</li>
    <li onClick={() => searchMovies("Action")}><FaFilm/>  Action</li>
    <li onClick={() => searchMovies("Comedy")}><FaLaugh/>  Comedy</li>
    <li onClick={() => searchMovies("Sci-Fi")}><FaRobot/>Sci-Fi</li>
    <li onClick={() => searchMovies("2023")}><FaClock/>Latest</li>
    <li onClick={() => alert("Built by Khushi")}><FaInfoCircle/>About</li>
  </ul>
</div>

      
      {/*  Added: Sidebar 
      
      <div className="sidebar">
        <h2>🎬 MovieGo</h2>
        <p>Explore Movies</p>
        <ul>
          <li onClick={() => searchMovies("Batman")}>Home</li>
          <li onClick={() => searchMovies("Action")}>Action</li>
          <li onClick={() => searchMovies("Comedy")}>Comedy</li>
          <li onClick={() => searchMovies("Sci-Fi")}>Sci-Fi</li>
          <li onClick={() => searchMovies("2023")}>Latest</li>
          <li onClick={() => alert("Built with by Khushi")}>About</li>
        </ul>
      </div>*/}

      {/*  Modified: Main content */}
      <div className="main-content">
        <header className="app-header">
          <h1>🎬 MovieHUB</h1>
          <p>Your go-to place for everything movies!</p>
        </header>

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
      </div>
    </div>
  );
}

export default App;

