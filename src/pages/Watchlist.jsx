import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getWatchlist, removeMovie } from "../utils/watchlist";

export default function Watchlist() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getWatchlist());
  }, []);

  const remove = (id) => {
    removeMovie(id);
    setMovies(getWatchlist());
  };

  return (

    <div className="page-container">

      <div className="page-heading">

        <p className="eyebrow">MovieBuzz</p>

        <h1>❤️ My Watchlist</h1>

      </div>

      {

        movies.length === 0 ?

          (

            <div className="empty-state">

              <h3>No Movies Added</h3>

              <p>Add movies from the Home page.</p>

              <Link
                to="/"
                className="button-link"
              >
                Browse Movies
              </Link>

            </div>

          )

          :

          (

            <div className="movie-grid">

              {

                movies.map((movie) => (

                  <div
                    className="movie-card"
                    key={movie.id}
                  >

                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="movie-poster"
                    />

                    <div className="movie-card-body">

                      <h3>{movie.title}</h3>

                      <div className="movie-meta">

                        <span>{movie.genre}</span>

                        <span>⭐ {movie.rating}</span>

                      </div>

                      <p>{movie.description}</p>

                      <button
                        className="button-link"
                        onClick={() => remove(movie.id)}
                      >

                        Remove

                      </button>

                    </div>

                  </div>

                ))

              }

            </div>

          )

      }

    </div>

  );

}