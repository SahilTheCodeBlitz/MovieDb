import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PagesCss/Popular.css';
import MovieCard from '../Components/MovieCard';

export const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const fetchMovies = async (page) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${page}`);
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]); // Append new movies to existing ones
      setHasMore(data.page < data.total_pages); // Check if there are more pages
    } catch (error) {
      console.error('Error fetching the popular movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`); // Navigate to the selected movie
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1); // Load next page
    }
  };

  return (
    <div className="popular-container">
      {movies.map((movie) => (
        <div key={movie.id} onClick={() => handleMovieClick(movie.id)}>
          <MovieCard
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
            rating={movie.vote_average}
          />
        </div>
      ))}
      {hasMore && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};
