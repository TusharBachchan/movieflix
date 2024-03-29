import React from "react";
import MovieCardCSS from "./MovieCard.module.css";

const MovieCard = ({ title, rating, image, year }) => {
 
  return (
    <div className={MovieCardCSS.movie__card}>
      <img src={image} alt="" className={MovieCardCSS.movie__card_image} />
      <div className={MovieCardCSS.movie__card_info}>
        <h3>{title}</h3>
        <h5>{rating}</h5>
        <h5>{year}</h5>
      </div>
    </div>
  );
}

export default MovieCard;
