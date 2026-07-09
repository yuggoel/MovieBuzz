import MovieCard from './MovieCard.jsx';

function MovieList({ movies }) {
  if (movies.length === 0) {
    return (
      <section className="empty-state">
        <h3>No movies found</h3>
        <p>Try a different title or choose another genre.</p>
      </section>
    );
  }

  return (
    <section className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}

export default MovieList;
