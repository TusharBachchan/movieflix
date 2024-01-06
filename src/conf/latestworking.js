import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MoviesCss from "./Movies.module.css";
import Shimmer from "../Shimmer/Shimmer";
import { useSelector } from "react-redux";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentYear, setCurrentYear] = useState(2012);

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
                    // console.log("otherApi : ", detailsData);
                    return {
                        ...movie,
                        cast: detailsData.credits.cast,
                        director: getDirector(detailsData.credits.crew),
                        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    };
                })
            );
            // if (selectedGenre !== previousGenre)
            // setMovies((prevMovies) => [...prevMovies, ...detailedMovies]);
            // setMovies(detailedMovies);
            setMovies([...movies, ...detailedMovies]);
            setLoading(true);
            console.log("movies", movies);
            console.log("detailedMovies", detailedMovies);

            // return detailedMovies;

            // setCurrentYear((prevYear) => )
        } catch (error) {
            console.error("Error fetching movies by genre:", error);
            // return [];
        }
    };

    useEffect(() => {
        fetchMovies(currentYear, selectedGenre);
        console.log("movies", movies);

        // console.log(currentYear)
    }, [selectedGenre, currentYear]);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        let direction = ""
        // Check if the user has scrolled to the bottom
        if (
            scrollPosition + windowHeight >= documentHeight &&
            currentYear <= 2023
        ) {
            // User has scrolled to the bottom, load movies for the next year
            // setCurrentYear((prev) => prev + 1);
            setCurrentYear(currentYear + 1);
            direction = "up"
            fetchMovies(currentYear);
        }

        // Check if the user has scrolled to the top
        if (scrollPosition === 0 && currentYear > 2012) {
            // User has scrolled to the top, load movies for the previous year
            // setCurrentYear((prev) => prev - 1);
            setCurrentYear(currentYear - 1);

            fetchMovies(currentYear);
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
            <h3>{selectedGenre}</h3>
            <div className={MoviesCss.cards__container}>
                {movies.map((movie, index) => (
                    <MovieCard
                        title={movie.original_title}
                        rating="5"
                        image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        year={movie.release_date.slice(0, 4)}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default Movies;
