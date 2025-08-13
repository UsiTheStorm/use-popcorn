import { useEffect, useState } from 'react';

const KEY = import.meta.env.VITE_API_KEY;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (query.trim().length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal });

        if (!res.ok) throw new Error('Fetching data problems');

        const data = await res.json();
        if (data.Response === 'False') throw new Error('Movie not found');

        const normalizedMovies = data.Search.map((movie) => ({
          imdbID: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
        }));

        setMovies(normalizedMovies);
        setQuantity(data.totalResults);
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    // handleCloseMovie();

    // debounce
    const timer = setTimeout(fetchMovies, 500);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  return { movies, isLoading, error, quantity };
}
