import React from 'react';

// const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0).toFixed(1);

function getValidAvarage(arr) {
  const validNum = arr.filter((val) => typeof val === 'number' && val);

  return validNum.length === 0
    ? (validNum.reduce((acc, cur) => acc + cur, 0) / validNum.length).toFixed(1)
    : 0;
}

function WatchedSummary({ watched }) {
  const avgImdbRating = getValidAvarage(watched.map((movie) => movie.imdbRating));
  const avgUserRating = getValidAvarage(watched.map((movie) => movie.userRating));
  const avgRuntime = getValidAvarage(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

export default WatchedSummary;
