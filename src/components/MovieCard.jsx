import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <img className="movie-poster" src={movie.poster} alt={`${movie.title} poster`} />
      <div className="movie-card-body">
        <p className="movie-kicker">{movie.genre}</p>
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span>{movie.year}</span>
          <span>{movie.duration}</span>
          <span>{movie.rating}/10</span>
        </div>
        <p>{movie.description}</p>
        <Link className="button-link card-action" to={`/movie/${movie.id}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}

export default MovieCard;
