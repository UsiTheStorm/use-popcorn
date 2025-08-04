import { useState, useEffect } from 'react';

import Loader from './Loader';
import StarRating from './StarRating';

function MovieDetails({ selectedId, onCloseMovie, KEY }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedId) return;

    const controller = new AbortController(); // створюємо контролер
    const { signal } = controller;

    async function getMovieDetails() {
      try {
        // setMovieDetails({});
        setError('');
        setIsLoading(true);

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}&plot=full`,
          { signal },
        );
        if (!res.ok) throw new Error('Fetching data problems');

        const data = await res.json();
        setMovieDetails(data);
        // console.log(movieDetails);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Request canceled 🚦');
        } else {
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();
    return () => controller.abort();
  }, [selectedId, KEY]);

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    Genre: genre,
    Plot: plot,
    Released: released,
    imdbRating,
    Actors: actors,
    Director: director,
  } = movieDetails || {};

  const roundedImdbRating = imdbRating ? Math.floor(parseFloat(imdbRating.trim())) : 0;
  console.log(roundedImdbRating);

  if (!movieDetails) return <Loader />;

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &lt;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
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
              <StarRating maxRating={10} size={24} defaultRating={roundedImdbRating} />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by: {director}</p>
          </section>
        </>
      )}
      <section>
        <div className="rating">
          <StarRating maxRating={10} size={24} defaultRating={roundedImdbRating} />
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring: {actors}</p>
        <p>Directed by: {director}</p>
      </section>
    </div>
  );
}

export default MovieDetails;
