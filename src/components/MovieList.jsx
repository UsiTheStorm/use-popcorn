import React from 'react';

import MovieItem from './MovieItem';

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MovieItem movie={movie} />
      ))}
    </ul>
  );
}

export default MovieList;
