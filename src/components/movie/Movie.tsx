/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useContext } from 'react'
import style from './Movie.module.scss';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { MovieInterface } from '../../interfaces/models';

const Movie: FC<MovieInterface> = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const singleMovieHandler = () => {
     if (authCtx.isLoggedIn) {
      navigate(`/${props.genre.toLowerCase()}/${props.id}`);
     } else {
      navigate('/login');
     } 
  };
  return (
    <div data-testid='movie' className={style.content}>
          <a data-testid='link' onClick={singleMovieHandler}>
            <img src={props.poster} alt="logo"/>
            <p>{props.title} {props.year}</p>
          </a>
        </div>
  )
}

export default Movie;