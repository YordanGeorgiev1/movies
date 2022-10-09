import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieInterface } from "../../interfaces/models";
import style from "./SingleMovie.module.scss";
import axios, { AxiosError } from "axios";

const SingleMovie = () => {
  const params = useParams();
  const [movie, setMovie] = useState<MovieInterface>();
  const [movieStars, setMovieStars] = useState<string>("");
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setError(null);
        const request = await axios.get("https://react-movies-8ac3c-default-rtdb.firebaseio.com/all-movies.json");
        const response = Object.values(request.data).flat() as MovieInterface[];
        const singleMovie = response.filter((m) => m.id.toString() === params.movieId)[0] as MovieInterface;
        setMovie(singleMovie);
        const stars = singleMovie.stars;
        if (stars) {
          setMovieStars(stars.join(", "));
        }
      } catch (err) {
        const errorMessage = err as AxiosError;
        setError(errorMessage.message);
      }
    };
    fetchMovies();
  }, [params]);

  return (
    <Fragment>
      {error && <h2 className={style.error}>{error}</h2>}
      {!error && (
        <div className={style.content}>
          <header>
            <h2 data-testid="title" className={style.describe}>
              {movie?.title}
            </h2>
            <p data-testid="year" className={style.describe}>
              {movie?.year}
            </p>
          </header>
          <div className={style["image-trailer"]}>
            <img data-testid="logo" src={movie?.poster} alt="logo" />
            <iframe src={movie?.trailer} title={movie?.title}></iframe>
          </div>
          <div className={style["about-container"]}>
            <p className={style.about}>
              About: <span data-testid="description">{movie?.description}</span>
            </p>
            <p className={style.about}>
              Stars: <span data-testid="stars">{movieStars}</span>
            </p>
            <p className={style.about}>
              Director: <span data-testid="director">{movie?.director}</span>
            </p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SingleMovie;
