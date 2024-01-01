import React from 'react'

const Button = ({genre, onGenreClick, activeGenre}) => {
  return (
    <button className={`btn ${activeGenre === genre ? 'active' : ''}`} onClick={() => onGenreClick(genre)}>
      {genre}
    </button>
  );
}

export default Button