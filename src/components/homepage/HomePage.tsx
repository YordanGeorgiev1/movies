import React, { Fragment, useEffect, useState } from "react";
import { MovieInterface } from "../../interfaces/models";
import Movie from "../movie/Movie";
import axios from "axios";
const HomePage = () => {
  const [displayMovies, setDisplayMovies] = useState<MovieInterface[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const request = await axios.get("https://react-movies-8ac3c-default-rtdb.firebaseio.com/start-movies.json");
      const movies = request.data as MovieInterface[];
      setDisplayMovies(Object.values(movies).flat());
    };
    fetchMovies();
  }, []);

  return (
    <Fragment>
      {displayMovies.map((m) => (
        <Movie key={m.id} id={m.id} genre={m.genre} poster={m.poster} title={m.title} year={m.year} />
      ))}
    </Fragment>
  );
};

export default HomePage;
