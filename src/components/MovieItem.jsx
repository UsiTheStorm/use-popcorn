import React from 'react';

const placeholder = '/poster-placeholder.png';

function MovieItem({ movie: { imdbID, title, poster }, children, onSelectMovie, onDeleteWatched }) {
  return (
    <li onClick={() => onSelectMovie?.(imdbID)}>
      <img
        src={poster !== 'N/A' ? poster : placeholder}
        alt={`${title} poster`}
        onError={(e) => (e.currentTarget.src = placeholder)}
      />
      <h3 title={title}>{title}</h3>
      <div>{children}</div>
      {onDeleteWatched && (
        <button
          className="btn-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteWatched(imdbID);
          }}
        >
          X
        </button>
      )}
    </li>
  );
}

export default MovieItem;
