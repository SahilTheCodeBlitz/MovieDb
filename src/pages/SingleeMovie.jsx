import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../ComponentCss/SingleMovie.css";
import CastCard from "../Components/CastCard.jsx";

const SingleMovie = () => {
  const { id } = useParams(); // Get movie ID from URL
  const [movieDetails, setMovieDetails] = useState({});
  const [castDetails, setCastDetails] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );
        const movieData = await movieResponse.json();
        setMovieDetails(movieData);

        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );
        const castData = await castResponse.json();
        setCastDetails(castData.cast.slice(0, 6)); // Limit to 6 cast members
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <>
      <div className="outer-container">
        <div className="main-container">
          <div className="left">
            <div className="top-section">
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="left-image"
              />
              <div className="details">
                <p className="title">{movieDetails.title}</p>
                <p className="rating">Rating: {movieDetails.vote_average}</p>
                <div className="inner-details">
                  <p className="duration">{movieDetails.runtime} mins</p>
                  <p className="genre">
                    {movieDetails.genres?.map((genre) => genre.name).join(", ")}
                  </p>
                </div>
                <p className="release-date">
                  Release Date: {movieDetails.release_date}
                </p>
              </div>
            </div>

            <div className="overview">
              <h3>Overview</h3>
              <p className="overview-text">{movieDetails.overview}</p>
            </div>
          </div>

          <div className="right">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
              alt={movieDetails.title}
              className="right-image"
            />
          </div>
        </div>
      </div>

      <div className="CastContainer">
        {castDetails.map((castMember) => (
          <CastCard
            key={castMember.cast_id}
            image={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
            name={castMember.name}
            character={castMember.character}
          />
        ))}
      </div>
    </>
  );
};

export default SingleMovie;
