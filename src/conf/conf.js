const conf = {
    tmdbDiscoverMoviesUrl: String(import.meta.env.VITE_DISCOVER_MOVIE_API_URL),
    tmdbMovieListURL: String(import.meta.env.VITE_MOVIE_LIST_API_URL),
    tmdbAPIKey: String(import.meta.env.VITE_TMDB_API_KEY),
}

export default conf