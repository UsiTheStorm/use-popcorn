import { useState } from 'react';

import MovieList from './MovieList';

function MovieBox({ movies }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && <MovieList movies={movies} />}
    </div>
  );
}

export default MovieBox;
