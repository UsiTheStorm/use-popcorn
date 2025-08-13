import { useState, useRef, useEffect } from 'react';

function SearchBar({ query, setQuery }) {
  // const [query, setQuery] = useState('');
  const inputEl = useRef(null);

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.code === 'Enter' && document.activeElement !== inputEl.current) {
        inputEl.current.focus();
        setQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setQuery]);

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
