import { useEffect, useState } from 'react';

import './App.css';

import Navbar from './components/Navbar';
import Box from './components/Box';

import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import MovieInfo from './components/MovieInfo';
import MovieDetails from './components/MovieDetails';
import DataDisplay from './components/DataDisplay';

import { useMovies } from './hooks/useMovies';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error, quantity } = useMovies(query, handleCloseMovie);

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

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);


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
