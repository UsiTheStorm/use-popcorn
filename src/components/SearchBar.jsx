import { useState, useRef, useEffect } from 'react';

function SearchBar({ query, setQuery }) {
  // const [query, setQuery] = useState('');
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

export default SearchBar;
