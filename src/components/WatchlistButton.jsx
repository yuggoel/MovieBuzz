import { useState } from "react";

import {
  addMovie,
  removeMovie,
  isSaved,
} from "../utils/watchlist";

export default function WatchlistButton({ movie }) {

  const [saved, setSaved] = useState(isSaved(movie.id));

  const handleClick = () => {

    if (saved) {
      removeMovie(movie.id);
    } else {
      addMovie(movie);
    }

    setSaved(!saved);
  };

  return (
    <button
      className="button-link"
      onClick={handleClick}
    >
      {saved ? " Remove" : " Watchlist"}
    </button>
  );
}