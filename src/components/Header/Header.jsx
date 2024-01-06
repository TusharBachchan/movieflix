import React, { useState } from 'react'
import Logo from "../../assets/movieflix.png"
import HeaderCSS from "./Header.module.css"
import Button from "../Button"
import { genreArray } from '../../constants'
import { useSelector, useDispatch } from "react-redux";
import { selectGenre } from "../../store/genreSlice";


const Header = () => {
  const [activeGenre, setActiveGenre] = useState(null);
  return (
    <div className={HeaderCSS.container}>
      <div className={HeaderCSS.container__logo}>
        <img src={Logo} alt="" className={HeaderCSS.logo} />
      </div>
      <div className={HeaderCSS.container__categories}>
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