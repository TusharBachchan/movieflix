import React, { useState } from 'react'
import Logo from "../../assets/movieflix.png"
import HeaderCSS from "./Header.module.css"
import Button from "../Button"
import { genreArray } from '../../constants'
import { useSelector, useDispatch } from "react-redux";
import { selectGenre } from "../../store/genreSlice";


const Header = ({ setSelectedGenre }) => {
  const [activeGenre, setActiveGenre] = useState(null);
  const selectedGenre = useSelector((state) => state.genre.selectedGenre)
  const previousGenre = useSelector((state) => state.genre.previousGenre);
  
  return (
    <div className={HeaderCSS.container}>
      <div className={HeaderCSS.container__logo}>
        <img src={Logo} alt="" className={HeaderCSS.logo} />
      </div>
      <div className={HeaderCSS.container__categories}>
        <h3 style={{ color: "gray" }}>{previousGenre}</h3>
        <h3 style={{ color: "white" }}>{selectedGenre}</h3>
        {genreArray.map((item) => (
          <Button genre={item} key={item} />
        ))}
      </div>
    </div>
  );
};
export default Header;
// rgb(36,36,36)
// rgb(18, 18, 18);
// rgb(240, 40, 60);