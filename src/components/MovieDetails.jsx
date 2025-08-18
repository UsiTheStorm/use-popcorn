import { useState, useEffect, useRef } from 'react';

import StarRating from './StarRating';
import DataDisplay from './DataDisplay';

import { useMovieData } from '../hooks/useMovieData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useKey } from '../hooks/useKey';

const placeholder = './poster-placeholder.png';

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched, onDeleteWatched }) {
  const { movieDetails, isLoading, error } = useMovieData(selectedId);
  const [userRating, setUserRating] = useState(0);

  useDocumentTitle(`Movie | ${movieDetails?.Title}`, 'usePopcorn');
  useKey('Escape', onCloseMovie);

  const countRef = useRef([]);

  const isWatched = watched.find((movie) => movie.imdbID === selectedId);

  useEffect(() => {
    if (userRating) countRef.current.push(userRating);
  }, [userRating]);

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
    Country: country,
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
      userRatingDesisions: countRef.current,
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
              <p>Country of origin: {country}</p>
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
