import React from 'react';

import MovieItem from './MovieItem';

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}>
          <p>
            <span>🗓</span>
            <span>{movie.year}</span>
          </p>
        </MovieItem>
      ))}
    </ul>
  );
}

export default MovieList;
