const STORAGE_KEY = "moviebuzz_watchlist";

export const getWatchlist = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveWatchlist = (movies) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
};

export const addMovie = (movie) => {
  const movies = getWatchlist();

  const exists = movies.some((m) => m.id === movie.id);

  if (!exists) {
    movies.push(movie);
    saveWatchlist(movies);
  }
};

export const removeMovie = (id) => {
  const movies = getWatchlist().filter((m) => m.id !== id);
  saveWatchlist(movies);
};

export const isSaved = (id) => {
  return getWatchlist().some((m) => m.id === id);
};