import { useState } from 'react';

import MovieItem from './MovieItem';
import WatchedSummary from './WatchedSummary';

function WatchedBox({ watched, average }) {
  const [isOpen, setIsOpen] = useState(true);

  // const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  // const avgUserRating = average(watched.map((movie) => movie.userRating));
  // const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && (
        <>
          <WatchedSummary watched={watched} average={average} />
          <ul className="list">
            {watched.map((movie) => (
              <MovieItem movie={movie}>
                <p>
                  <span>⭐️</span>
                  <span>{movie.imdbRating}</span>
                </p>
                <p>
                  <span>🌟</span>
                  <span>{movie.userRating}</span>
                </p>
                <p>
                  <span>⏳</span>
                  {movie.runtime > 0 && <span>{movie.runtime} min1</span>}
                </p>
              </MovieItem>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default WatchedBox;

// <li key={movie.imdbID}>
//   <img src={movie.Poster} alt={`${movie.Title} poster`} />
//   <h3 title={movie.Title}>{movie.Title}</h3>
//   <div>
//     <p>
//       <span>⭐️</span>
//       <span>{movie.imdbRating}</span>
//     </p>
//     <p>
//       <span>🌟</span>
//       <span>{movie.userRating}</span>
//     </p>
//     <p>
//       <span>⏳</span>
//       <span>{movie.runtime} min</span>
//     </p>
//   </div>
// </li>
