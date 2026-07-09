function GenreFilter({ genres, selectedGenre, onGenreChange }) {
  return (
    <div className="filter-row" aria-label="Genre filters">
      {genres.map((genre) => (
        <button
          key={genre}
          type="button"
          className={genre === selectedGenre ? 'filter-pill active' : 'filter-pill'}
          onClick={() => onGenreChange(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;
