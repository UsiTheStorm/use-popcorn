import { useEffect, useState } from 'react';

import './App.css';

import Navbar from './components/Navbar';
import Box from './components/Box';
// import Loader from './components/Loader';
// import ErrorMessage from './components/ErrorMessage';
// import MovieBox from './components/MovieBox';
// import WatchedBox from './components/WatchedBox';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import MovieItem from './components/MovieItem';
import MovieInfo from './components/MovieInfo';
import MovieDetails from './components/MovieDetails';
import DataDisplay from './components/DataDisplay';

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = '52a6b1a2';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  function handelSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  useEffect(() => {
    // http://www.omdbapi.com/?i=tt3896198&apikey=52a6b1a2

    if (query.trim().length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

        if (!res.ok) throw new Error('Fetching data problems');

        const data = await res.json();

        if (data.Response === 'False') throw new Error('Movie not found');

        setMovies(data.Search);
        setQuantity(data.totalResults);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    // debounce
    const timer = setTimeout(fetchMovies, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <>
      {/* <StarRating maxRating={7} defaultRating={3} />
      <StarRating maxRating={10} size={24} color="red" /> */}
      <Navbar quantity={quantity} query={query} setQuery={setQuery} />

      <main className="main">
        <Box>
          <DataDisplay isLoading={isLoading} error={error}>
            <MovieList movies={movies} onSelectMovie={handelSelectedMovie} />
          </DataDisplay>
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} KEY={KEY} />
          ) : (
            <>
              <WatchedSummary watched={watched} average={average} />
              <ul className="list">
                {watched.map((movie) => (
                  <MovieItem key={movie.imdbID} movie={movie}>
                    <MovieInfo movie={movie} />
                  </MovieItem>
                ))}
              </ul>
            </>
          )}
        </Box>
      </main>
    </>
  );
}
// http://www.omdbapi.com/?i=tt3896198&apikey=52a6b1a2
