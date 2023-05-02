/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";

import style from "./Movie.module.scss";
import AuthContext from "../../store/auth-context";
import { MovieInterface } from "../../interfaces/models";

const Movie: FC<MovieInterface> = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const singleMovieHandler = () => {
    authCtx.isLoggedIn ? navigate(`/${props.genre.toLowerCase()}/${props.id}`) : navigate("/login");
  };

  return (
    <div data-testid="movie" className={style.content}>
      <a data-testid="link" onClick={singleMovieHandler}>
        <img src={props.poster} alt="logo" />
        <p>
          {props.title} {props.year}
        </p>
      </a>
    </div>
  );
};

export default Movie;
