function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <label className="search-box">
      <span>Search Movies</span>
      <input
        type="search"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </label>
  );
}

export default SearchBar;
