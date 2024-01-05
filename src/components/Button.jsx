import React from 'react'
import { useDispatch } from 'react-redux';
import { selectGenre } from '../store/genreSlice';

const Button = ({genre, onGenreClick, activeGenre}) => {
  const dispatch = useDispatch()
  return (
    <button
      className={`btn ${activeGenre === genre ? "active" : ""}`}
      onClick={(e) => dispatch(selectGenre({ selectedGenre: genre }))}
    >
      {genre}
    </button>
  );
}

export default Button