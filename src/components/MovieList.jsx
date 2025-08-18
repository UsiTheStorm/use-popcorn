import MovieItem from './MovieItem';

function MovieList({ movies, onSelectMovie, onDeleteWatched, render, showLoadMore }) {
  return (
    <>
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <MovieItem
            movie={movie}
            key={movie.imdbID}
            onSelectMovie={onSelectMovie}
            onDeleteWatched={onDeleteWatched}
          >
            {render && render(movie)}
          </MovieItem>
        ))}
      </ul>
      {showLoadMore && <button className="btn-load-more">Load More</button>}
    </>
  );
}

export default MovieList;
