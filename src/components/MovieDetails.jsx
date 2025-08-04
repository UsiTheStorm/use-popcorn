import { useState, useEffect } from 'react';

import Loader from './Loader';

function MovieDetails({ selectedId, onCloseMovie, KEY }) {
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    if (!selectedId) return;

    const controller = new AbortController(); // створюємо контролер
    const { signal } = controller;

    async function getMovieDetails() {
      try {
        setMovieDetails({});

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
      }
    }

    getMovieDetails();
    return () => controller.abort();
  }, [selectedId, KEY]);

  if (!movieDetails) return <Loader />;

  return (
    <>
      <div className="details">{selectedId}</div>
      <button className="btn-back" onClick={onCloseMovie}>
        &lt;
      </button>
    </>
  );
}

export default MovieDetails;
