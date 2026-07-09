import { useMemo, useState, useEffect } from 'react';
import GenreFilter from '../components/GenreFilter.jsx';
import MovieList from '../components/MovieList.jsx';
import SearchBar from '../components/SearchBar.jsx';
import movies from '../data/movies.json';
import { useAuth } from '../context/AuthContext.jsx';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { currentUser, isFavorite } = useAuth();

  // Reset favorites filter when user logs out
  useEffect(() => {
    if (!currentUser) {
      setShowFavoritesOnly(false);
    }
  }, [currentUser]);

  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(movies.map((movie) => movie.genre))];
    return ['All Genres', ...uniqueGenres.sort()];
  }, []);

  const filteredMovies = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return movies.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(normalizedSearch);
      const matchesGenre =
        selectedGenre === 'All Genres' || movie.genre === selectedGenre;
      const matchesFavorites = !showFavoritesOnly || isFavorite(movie.id);

      return matchesSearch && matchesGenre && matchesFavorites;
    });
  }, [searchTerm, selectedGenre, showFavoritesOnly, currentUser]);

  return (
    <section className="page-stack">
      <div className="page-heading">
        <p className="eyebrow">Frontend movie database</p>
        <h1>Find movies from a simple local collection.</h1>
        <p>
          Search by title, filter by genre, and browse movies loaded from a
          separate JSON file.
        </p>
      </div>
      <div className="tools-panel">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />
        
        {currentUser && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px', borderTop: '1px solid #dfe5ec', paddingTop: '12px' }}>
            <button
              type="button"
              className={`filter-pill ${showFavoritesOnly ? 'active' : ''}`}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill={showFavoritesOnly ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>Show Favorites Only ({currentUser.favorites?.length || 0})</span>
            </button>
          </div>
        )}
      </div>
      <div className="results-summary">
        Showing {filteredMovies.length} of {movies.length} movies
      </div>
      <MovieList movies={filteredMovies} />
    </section>
  );
}

export default Home;
