import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import { MovieInterface } from "../../interfaces/models";
import style from './HomePage.module.scss';
import Movie from "../movie/Movie";

const HomePage = () => {
  const [displayMovies, setDisplayMovies] = useState<MovieInterface[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setError(null);
        const request = await axios.get("https://react-movies-8ac3c-default-rtdb.firebaseio.com/start-movies.json");
        const movies = request.data as MovieInterface[];
        setDisplayMovies(Object.values(movies).flat());
      } catch (err) {
        const errorMessage = err as AxiosError;
        setError(errorMessage.message);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      {error && <h2 className={style.error}>{error}</h2>}
       {!error && displayMovies.map((m) => (
        <Movie key={m.id} id={m.id} genre={m.genre} poster={m.poster} title={m.title} year={m.year} />
      ))}
    </>
  );
};

export default HomePage;
