import React from 'react';

function MovieItem({ movie, children }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3 title={movie.Title}>{movie.Title}</h3>
      <div>{children}</div>
    </li>
  );
}

export default MovieItem;
