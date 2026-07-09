import { Link, useParams, useNavigate } from 'react-router-dom';
import movies from '../data/movies.json';
import { useAuth } from '../context/AuthContext.jsx';

function MovieDetails() {
  const { id } = useParams();
  const { currentUser, toggleFavorite, isFavorite } = useAuth();
  const navigate = useNavigate();

  const movie = movies.find((movieItem) => movieItem.id === Number(id));

  if (!movie) {
    return (
      <section className="details-panel">
        <p className="eyebrow">Movie not found</p>
        <h1>No matching movie</h1>
        <p>
          The movie you are trying to open is not available in the local JSON
          database.
        </p>
        <Link className="button-link" to="/">
          Back to Home
        </Link>
      </section>
    );
  }

  const isFav = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    if (!currentUser) {
      navigate('/signin');
      return;
    }
    toggleFavorite(movie.id);
  };

  return (
    <section className="details-layout">
      <img className="details-poster" src={movie.poster} alt={`${movie.title} poster`} />
      <div className="details-content">
        <p className="eyebrow">{movie.genre}</p>
        <h1>{movie.title}</h1>
        <div className="movie-meta details-meta">
          <span>{movie.year}</span>
          <span>{movie.duration}</span>
          <span>{movie.rating}/10</span>
        </div>
        <p className="details-description">{movie.description}</p>
        <dl className="details-list">
          <div>
            <dt>Director</dt>
            <dd>{movie.director}</dd>
          </div>
          <div>
            <dt>Genre</dt>
            <dd>{movie.genre}</dd>
          </div>
          <div>
            <dt>Release Year</dt>
            <dd>{movie.year}</dd>
          </div>
          <div>
            <dt>Runtime</dt>
            <dd>{movie.duration}</dd>
          </div>
        </dl>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
          <Link className="button-link" to="/">
            Back to Home
          </Link>
          <button
            className={`favorite-btn ${isFav ? 'is-fav' : ''}`}
            onClick={handleFavoriteClick}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{isFav ? 'Favorited' : 'Add to Favorites'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
