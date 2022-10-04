import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieInterface } from "../../interfaces/models";
import style from "./SingleMovie.module.scss";
import axios from 'axios';

const SingleMovie = () => {
  const params = useParams();
  const [movie, setMovie] = useState<MovieInterface>();
  const [movieStars, setMovieStars] = useState<string>('');

  useEffect(() => {
    const fetchMovies = async () => {
      const request = await axios.get('https://react-movies-8ac3c-default-rtdb.firebaseio.com/all-movies.json');
      const response = Object.values(request.data).flat() as MovieInterface[];
      const singleMovie = response.filter((m) => m.id.toString() === params.movieId)[0] as MovieInterface;
      setMovie(singleMovie);
      const stars = singleMovie.stars;
      if (stars) {
        setMovieStars(stars.join(', '));
      }
    };
    fetchMovies();
  }, [params]);
  
  return (
    <div className={style.content}>
      <header>
        <h2 className={style.describe}>{movie?.title}</h2>
        <p className={style.describe}>{movie?.year}</p>
      </header>
      <img src={movie?.poster} alt="logo" />
      <div className={style["about-container"]}>
        <p className={style.about}>
          About: <span>{movie?.description}</span>
        </p>
        <p className={style.about}>
          Stars: <span>{movieStars}</span>
        </p>
        <p className={style.about}>
          Director: <span>{movie?.director}</span>
        </p>
      </div>
    </div>
  );
};

export default SingleMovie;
