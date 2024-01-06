import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MoviesCss from "./Movies.module.css";
import Shimmer from "../Shimmer/Shimmer";
import { useSelector } from "react-redux";
import  conf from "../../conf/conf"

const Movies = () => {
  // using a 2d array as initial state
  console.log(conf.tmdbMoviesUrl, conf.tmdbAPIKey);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentYear, setCurrentYear] = useState(2012);
// state to call dynamic api calls
  const selectedGenre = useSelector((state) => state.genre.selectedGenre);
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
    console.log(genreMap[selectedGenre]);
    return genreMap[selectedGenre];
  };

  // getting director from crew
  const getDirector = (crew) => {
    const director = crew.find((member) => member.job === "Director");
    return director ? director.name : "Unknown";
  };

  const fetchMovies = async (currentYear, selectedGenre) => {
    try {
      const genreId = getGenreId(selectedGenre);

      const response = await fetch(
        `${conf.tmdbMoviesUrl}/discover/movie?api_key=${conf.tmdbAPIKey}&sort_by=popularity.desc&primary_release_year=${currentYear}&page=1&vote_count.gte=100&with_genres=${genreId}`
      );
      const data = await response.json();
      // Fetch additional details for each movie in the array obtained from above api call (e.g., cast, crew, and image)
      const detailedMovies = await Promise.all(
        data.results.map(async (movie) => {
          const detailsResponse = await fetch(
            `${conf.tmdbMoviesUrl}/movie/${movie.id}?api_key=${conf.tmdbAPIKey}&append_to_response=credits`
          );

          if (!detailsResponse.ok) {
            throw new Error("Failed to fetch movie details");
          }

          const detailsData = await detailsResponse.json();
          // console.log("otherApi : ", detailsData);
          return {
            ...movie,
            cast: detailsData.credits.cast,
            director: getDirector(detailsData.credits.crew),
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          };
        })
      );
      setMovies([detailedMovies]);
      setLoading(true);



      //*******************rough code *******************************/
      // if (selectedGenre !== previousGenre)
      // setMovies(detailedMovies);
      // if(selectedGenre !== previousGenre){
        //   setMovies([]);
        // }
        // setMovies([...movies, detailedMovies]);
        // setMovies([...movies, detailedMovies]);
        // console.log("movies", movies);
        // console.log("detailedMovies", detailedMovies);
        
        // return detailedMovies;
        
        // setCurrentYear((prevYear) => )
        //*******************rough code *******************************/

    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    }
  };




  // Calling the fetch movies function according to current year and selectedGenre
  // selectedGenre is a state in redux which acts as a dependency array for this useEffect
  // when selected genre changes then the api call is made
  useEffect(() => {
    fetchMovies(currentYear, selectedGenre);
    console.log("movies", movies);
  }, [selectedGenre]);

  // const handleScroll = () => {
  //   const scrollPosition = window.scrollY;
  //   const windowHeight = window.innerHeight;
  //   const documentHeight = document.documentElement.scrollHeight;
  //   let direction = ""
  //   // Check if the user has scrolled to the bottom
  //   if (
  //     scrollPosition + windowHeight >= documentHeight &&
  //     currentYear <= 2022
  //   ) {
  //     // User has scrolled to the bottom, load movies for the next year
  //     setCurrentYear((prevYear) => prevYear + 1);
  //     // setCurrentYear(currentYear + 1);
  //     direction = "up"
  //     fetchMovies(currentYear);
  //   }

  //   // Check if the user has scrolled to the top
  //   // if (scrollPosition === 0 && currentYear > 2012) {
  //   //   // User has scrolled to the top, load movies for the previous year
  //   //   // setCurrentYear((prev) => prev - 1);
  //   //   setCurrentYear(currentYear - 1);

  //   //   fetchMovies(currentYear);
  //   // }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [currentYear, loading]);
  return !loading ? (
    <Shimmer />
  ) : (
    <>
      {movies.map((movieArr, idx) => (
        <div className={MoviesCss.container} key={idx}>
          <h3>{movieArr[0]?.release_date.slice(0, 4)}</h3>
          <h3>{selectedGenre}</h3>
          <div className={MoviesCss.cards__container}>
            {movieArr.map((movie, index) => (
              <MovieCard
                title={movie.original_title}
                rating="5"
                image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                year={movie?.release_date.slice(0, 4)}
                key={index}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Movies;
