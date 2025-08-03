import { useState } from 'react';

import SearchBar from './SearchBar';

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length || 0}</strong> results
    </p>
  );
}

function Navbar({ movies, query, setQuery }) {
  //   const [query, setQuery] = useState('');

  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBar query={query} setQuery={setQuery} />
      <NumResults movies={movies} />
    </nav>
  );
}

export default Navbar;
