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
import { useLocalStorageState } from './hooks/useLocalStorageState';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);

  const { movies, isLoading, error, quantity } = useMovies(query, page);
  const [watched, setWatched] = useLocalStorageState([], 'watched');

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
  // Reset page and close movie details when change search query
  useEffect(() => {
    handleCloseMovie();
    setPage(1);
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
                showLoadMore={movies.length < quantity && page < 5}
                onSetPage={setPage}
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
