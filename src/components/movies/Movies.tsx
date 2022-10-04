import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieInterface } from "../../interfaces/models";
import Movie from "../movie/Movie";
import style from './Movies.module.scss';
import axios from 'axios';


const Movies = () => {
  const params = useParams();
  const [filteredMovies, setFilteredMovies] = useState<MovieInterface[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const request = await axios.get('https://react-movies-8ac3c-default-rtdb.firebaseio.com/all-movies.json');
      const response = Object.values(request.data).flat() as MovieInterface[];
      const categoryMovies = response.filter((m) => m.genre.toLowerCase() === params.categoryId);
      setFilteredMovies(categoryMovies as MovieInterface[]);
    };
    fetchMovies();
  }, [params]);

  return (
    <Fragment>
      <h2 className={style.heading}>{params.categoryId?.toUpperCase()}</h2>
      {filteredMovies.map((m) => (
        <Movie
          key={m.id}
          id={m.id}
          genre={m.genre}
          poster={m.poster}
          title={m.title}
          year={m.year}
        />
      ))}
    </Fragment>
  );
};

export default Movies;
