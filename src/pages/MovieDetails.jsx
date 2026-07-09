import { Link, useParams } from 'react-router-dom';
import movies from '../data/movies.json';

function MovieDetails() {
  const { id } = useParams();
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
        <Link className="button-link details-action" to="/">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default MovieDetails;
