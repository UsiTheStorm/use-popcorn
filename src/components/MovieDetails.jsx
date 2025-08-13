import { useState, useEffect } from 'react';

// import Loader from './Loader';
import StarRating from './StarRating';
import DataDisplay from './DataDisplay';

const placeholder = './poster-placeholder.png';

function MovieDetails({ selectedId, onCloseMovie, KEY, onAddWatched, watched, onDeleteWatched }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.find((movie) => movie.imdbID === selectedId);

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
        // console.log(movieDetails);
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
  }, [selectedId, KEY]);

  // Page title change
  useEffect(() => {
    if (movieDetails?.Title) {
      document.title = `Movie | ${movieDetails.Title}`;
    }

    return () => {
      document.title = 'usePopcorn';
    };
  }, [movieDetails]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onCloseMovie();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseMovie]);

  if (!movieDetails) {
    return <DataDisplay isLoading={isLoading} error={error} />;
  }

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    Genre: genre,
    Plot: plot,
    Released: released,
    Year: year,
    imdbRating,
    Actors: actors,
    Director: director,
  } = movieDetails;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      year,
      released,
      runtime: Number(runtime.split(' ').at(0)),
      imdbRating: Number(imdbRating),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  return (
    <div className="details">
      <DataDisplay isLoading={isLoading} error={error}>
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &lt;
            </button>
            <img
              src={poster !== 'N/A' ? poster : placeholder}
              alt={`${title} poster`}
              onError={(e) => (e.currentTarget.src = placeholder)}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                <span>{imdbRating} IMDB rating</span>
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>You rate this movie: {isWatched.userRating || '-'}⭐️</p>
              ) : (
                <StarRating maxRating={10} size={28} onSetRating={setUserRating} />
              )}

              {isWatched ? (
                <button
                  className="btn-add"
                  onClick={() => {
                    onDeleteWatched(isWatched.imdbID);
                    setUserRating(0);
                  }}
                >
                  Delete from watched
                </button>
              ) : (
                userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    Add to watched
                  </button>
                )
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by: {director}</p>
          </section>
        </>
      </DataDisplay>
    </div>
  );
}

export default MovieDetails;
