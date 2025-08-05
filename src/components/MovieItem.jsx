import React from 'react';

const placeholder = '/poster-placeholder.png';

function MovieItem({ movie: { imdbID, Title: title, Poster: poster }, children, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(imdbID)}>
      <img
        src={poster !== 'N/A' ? poster : placeholder}
        alt={`${title} poster`}
        onError={(e) => (e.currentTarget.src = placeholder)}
      />
      <h3 title={title}>{title}</h3>
      <div>{children}</div>
    </li>
  );
}

export default MovieItem;
