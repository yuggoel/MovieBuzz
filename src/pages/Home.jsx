import { useMemo, useState } from 'react';
import GenreFilter from '../components/GenreFilter.jsx';
import MovieList from '../components/MovieList.jsx';
import SearchBar from '../components/SearchBar.jsx';
import movies from '../data/movies.json';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');

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

      return matchesSearch && matchesGenre;
    });
  }, [searchTerm, selectedGenre]);

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
      </div>
      <div className="results-summary">
        Showing {filteredMovies.length} of {movies.length} movies
      </div>
      <MovieList movies={filteredMovies} />
    </section>
  );
}

export default Home;
