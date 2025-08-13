import React from 'react';

import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

function DataDisplay({ isLoading, error, movies, children }) {
  if (isLoading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  if (movies.length === 0) {
    return (
      <p className="placeholder">
        <span>🎬</span> Search for a movie
      </p>
    );
  }
  return children;
}

export default DataDisplay;
