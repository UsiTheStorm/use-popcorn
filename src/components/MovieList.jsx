import React from 'react';

import MovieItem from './MovieItem';

function MovieList({ movies, onSelect }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MovieItem movie={movie} key={movie.imdbID} onSelect={onSelect}>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </MovieItem>
      ))}
    </ul>
  );
}

export default MovieList;
