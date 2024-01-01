import React, { useState } from 'react'
import Logo from "../../assets/movieflix.png"
import HeaderCSS from "./Header.module.css"
import Button from "../Button"
import { genreArray } from '../../constants'

const Header = () => {
const [activeGenre, setActiveGenre] = useState(null);

  const handleGenreClick = () => {
    // set active genre
    // set selected genre
    // logic for filter
    setActiveGenre()
  }
  return (
    <div className={HeaderCSS.container}>
      <div className={HeaderCSS.container__logo}>
        <img src={Logo} alt="" className={HeaderCSS.logo} />
      </div>
      <div className={HeaderCSS.container__categories}>
        {genreArray.map((item) => (
          <Button
            genre={item}
            onGenreClick={handleGenreClick}
            activeGenre={activeGenre}
            key={item}
          />
        ))}
      </div>
    </div>
  );
}
export default Header;
// rgb(36,36,36)
// rgb(18, 18, 18);
// rgb(240, 40, 60);