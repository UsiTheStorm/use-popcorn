import { useEffect, useState } from 'react';

import './App.css';

import Navbar from './components/Navbar';
import Box from './components/Box';

import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import MovieInfo from './components/MovieInfo';
import MovieDetails from './components/MovieDetails';
import DataDisplay from './components/DataDisplay';

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    title: 'Inception',
    year: '2010',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    title: 'Back to the Future',
    year: '1985',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = '52a6b1a2';
const KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem('watched');
    return JSON.parse(storedValue);
  });

  function handelSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    // http://www.omdbapi.com/?i=tt3896198&apikey=52a6b1a2

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

    handleCloseMovie();
    // debounce
    const timer = setTimeout(fetchMovies, 500);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <>
      <Navbar quantity={quantity} query={query} setQuery={setQuery} />

      <main className={`main ${query ? 'has-query' : 'no-query'}`}>
        <Box>
          {query ? (
            <DataDisplay isLoading={isLoading} error={error} query={query}>
              <MovieList
                movies={movies}
                onSelectMovie={handelSelectedMovie}
                render={(movie) => (
                  <p>
                    <span>🗓</span>
                    <span>{movie.year}</span>
                  </p>
                )}
              />
            </DataDisplay>
          ) : (
            <p className="placeholder">
              <span>🎬</span> Search for a movie
            </p>
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
              onDeleteWatched={handleDeleteWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <MovieList
                movies={watched}
                onSelectMovie={handelSelectedMovie}
                onDeleteWatched={handleDeleteWatched}
                render={(movie) => <MovieInfo movie={movie} />}
              />
            </>
          )}
        </Box>
      </main>
    </>
  );
}
