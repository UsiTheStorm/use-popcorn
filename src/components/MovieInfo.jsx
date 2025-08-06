import React from 'react';

function MovieInfo({ movie }) {
  return (
    <>
      <p>
        <span>⭐️</span>
        {movie.imdbRating > 0 ? <span>{movie.imdbRating}</span> : <span> N/A </span>}
      </p>
      <p>
        <span>🌟</span>
        {movie.userRating > 0 ? <span>{movie.userRating}</span> : <span> - </span>}
      </p>
      <p>
        <span>⏳</span>
        {movie.runtime > 0 ? <span>{movie.runtime} min </span> : <span> - min</span>}
      </p>
    </>
  );
}

export default MovieInfo;
