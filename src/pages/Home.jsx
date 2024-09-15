import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from '../Components/MovieCard.jsx';
import '../PagesCss/Home.css';

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Function to extract query parameters from the URL
  const getSearchQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('query') || ''; // Get 'query' parameter from URL or empty string if not present
  };

  const fetchMovies = async (page) => {
    const searchQuery = getSearchQuery();
    let url = '';

    if (searchQuery) {
      // If there's a search query, search for the movie
      url = `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${searchQuery}&page=${page}`;
    } else {
      // If there's no search query, fetch popular movies
      url = `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${page}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]); // Append new movies to existing ones
      setHasMore(page < data.total_pages); // Check if there are more pages
    } catch (error) {
      console.error('Error fetching the movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [location, currentPage]); // Re-run the effect whenever the location or currentPage changes

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`); // Navigate to the movie details page with the movie ID
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1); // Load next page
    }
  };

  return (
    <div className="popular-container">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Dynamically set the image URL
            title={movie.title} // Dynamically set the title
            rating={movie.vote_average} // Dynamically set the rating
            onClick={() => handleMovieClick(movie.id)} // Pass the movie ID to the click handler
          />
        ))
      ) : (
        <p>No movies found.</p> // Display message if no movies are found
      )}
      {hasMore && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};
