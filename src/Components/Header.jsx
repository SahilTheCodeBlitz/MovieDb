import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../ComponentCss/Header.css';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate(); // For navigation

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`); // Navigate to the search route with the query
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">MovieDB</h1>
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/popular" className="nav-link" onClick={toggleMenu}>Popular</Link>
          <Link to="/toprated" className="nav-link" onClick={toggleMenu}>Top Rated</Link>
          <Link to="/upcomming" className="nav-link" onClick={toggleMenu}>Upcoming</Link>
        </nav>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="movie name" 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
