import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MoviesCss from "./Movies.module.css";
import Shimmer from "../Shimmer/Shimmer";
const Movies = ({ selectedGenre }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentYear, setCurrentYear] = useState(2012);

  // To get specific genre id : default: All, else user will select from header component
  const getGenreId = (selectedGenre) => {
    // Map genre names to corresponding TMDb genre ids
    const genreMap = {
      All: "",
      Action: 28,
      Comedy: 35,
      Horror: 27,
      Drama: 18,
      "Sci-fi": 878,
    };

    return genreMap[selectedGenre];
  };

// 
const getDirector = (crew) => {
  const director = crew.find((member) => member.job === "Director");
  return director ? director.name : "Unknown";
};


  const fetchMovies = async (currentYear, selectedGenre) => {
    try {
      const genreId = getGenreId(selectedGenre);
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${currentYear}&page=1&vote_count.gte=100&with_genres=${genreId}`
      );
      const data = await response.json();
      // Fetch additional details for each movie (e.g., cast, crew, and image)
      const detailedMovies = await Promise.all(
        data.results.map(async (movie) => {
          const detailsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=2dca580c2a14b55200e784d157207b4d&append_to_response=credits`
          );

          if (!detailsResponse.ok) {
            throw new Error("Failed to fetch movie details");
          }

          const detailsData = await detailsResponse.json();
          console.log("otherApi : ", detailsData);
          return {
            ...movie,
            cast: detailsData.credits.cast,
            director: getDirector(detailsData.credits.crew),
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          };
        })
      );
      setMovies((prevMovies) => [...prevMovies, ...detailedMovies]);
      console.log(detailedMovies);
      setLoading(true);
      // setCurrentYear(currentYear)
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    }
  };


  useEffect(() => {
    fetchMovies(currentYear, selectedGenre);
    // console.log(movies);
    console.log(currentYear)
  }, [currentYear, selectedGenre]);



  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if the user has scrolled to the bottom
    if (scrollPosition + windowHeight >= documentHeight) {
      // User has scrolled to the bottom, load movies for the next year
      fetchMovies(currentYear + 1);
    }

    // Check if the user has scrolled to the top
    if (scrollPosition === 0 && currentYear > 2010) {
      // User has scrolled to the top, load movies for the previous year
      fetchMovies(currentYear - 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentYear, loading]);
  return !loading ? (
    <Shimmer />
  ) : (
    <div className={MoviesCss.container}>
      <h3>{currentYear}</h3>
      <div className={MoviesCss.cards__container}>
        {movies.map((movie) => (
            <MovieCard
              title={movie.original_title}
              rating="5"
              image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              key={movie.id}
            />
        ))}
      </div>
    </div>
  );
};

export default Movies;
