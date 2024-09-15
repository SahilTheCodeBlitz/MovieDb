import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../PagesCss/Popular.css";
// import MovieCard from '../Components/MovieCard.jsx';
import MovieCard from "../Components/MovieCard.jsx";

export const Upcomming = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State to manage the current page
  const [hasMore, setHasMore] = useState(true); // State to check if more movies are available
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${currentPage}`
        );
        const data = await response.json();
        if (currentPage === 1) {
          setMovies(data.results); // Set movies on the first page load
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]); // Append new movies to the existing list
        }
        setHasMore(data.page < data.total_pages); // Check if there are more pages
      } catch (error) {
        console.error("Error fetching the upcoming movies:", error);
      }
    };

    fetchMovies();
  }, [currentPage]); // Fetch movies when currentPage changes

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
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};
