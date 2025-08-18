import { useState, useEffect } from 'react';

const KEY = import.meta.env.VITE_API_KEY;

export function useMovieData(selectedId) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedId) return;

    const controller = new AbortController();
    const { signal } = controller;

    async function getMovieDetails() {
      try {
        setError('');
        setIsLoading(true);

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}&plot=full`,
          { signal },
        );
        if (!res.ok) throw new Error('Fetching data problems');

        const data = await res.json();
        if (data.Response === 'False') throw new Error(data.Error || 'Movie not found');

        setMovieDetails(data);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Request canceled 🚦');
        } else {
          console.error(err);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();
    return () => controller.abort();
  }, [selectedId]);

  return { movieDetails, isLoading, error };
}
