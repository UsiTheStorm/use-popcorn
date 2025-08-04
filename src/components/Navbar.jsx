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

function NumResults({ quantity }) {
  return (
    <p className="num-results">
      Found <strong>{quantity}</strong> results
    </p>
  );
}

function Navbar({ quantity, query, setQuery }) {
  //   const [query, setQuery] = useState('');

  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBar query={query} setQuery={setQuery} />
      <NumResults quantity={quantity} />
    </nav>
  );
}

export default Navbar;
