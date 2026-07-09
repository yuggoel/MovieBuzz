import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function MovieCard({ movie }) {
  const { currentUser, toggleFavorite, isFavorite } = useAuth();
  const navigate = useNavigate();
  const isFav = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) {
      navigate('/signin');
      return;
    }
    toggleFavorite(movie.id);
  };

  return (
    <div className="movie-card-wrapper">
      <button
        className={`card-fav-trigger ${isFav ? 'is-fav' : ''}`}
        onClick={handleFavoriteClick}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
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
    </div>
  );
}

export default MovieCard;
