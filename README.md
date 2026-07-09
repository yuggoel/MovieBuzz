# MovieBuzz

<p align="center"><i>Discover, search, and explore your favorite movies.</i></p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#getting-started">Getting Started</a>
</p>

---

## Introduction

MovieBuzz is a React-based movie browsing application that allows users to search, filter, and explore movies from a local JSON database.

The project demonstrates React fundamentals including reusable components, routing, state management, and dynamic rendering while providing a clean and responsive user interface.

### Architecture

```text
Browser
    │
    ▼
React + Vite
    │
    ▼
Local JSON Database
(src/data/movies.json)
```

---

## Features

- Browse a collection of movies
- Search movies by title
- Filter movies by genre
- View ratings, duration, release year, and genres
- Read detailed movie descriptions
- View movie posters
- Dedicated movie details page
- Responsive design for desktop and mobile

---

## Tech Stack

| Layer | Technology |
|--------|------------|
| Framework | React |
| Build Tool | Vite |
| Language | JavaScript |
| Routing | React Router |
| Styling | CSS |
| Data Source | Local JSON |
| Package Manager | npm |

---

## Project Structure

```text
MovieBuzz/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   │   └── movies.json
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

## Application Flow

```text
User
   │
   ▼
Search or Select Genre
   │
   ▼
Filter Local Movie Data
   │
   ▼
Render Movie Cards
   │
   ▼
Open Movie Details
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate into the project

```bash
cd MovieBuzz
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Movie Data

MovieBuzz uses a local JSON file located at:

```text
src/data/movies.json
```

Each movie contains information such as:

- Title
- Genre
- Release Year
- Duration
- Rating
- Poster
- Description

---

## Future Enhancements

- Connect to TMDB API
- User authentication
- Favorites
- Watchlist
- Dark mode
- Movie recommendations
- Sorting by rating and release date
- Pagination

---

## .gitignore

Do not commit:

```text
node_modules/
dist/
.vite/
.DS_Store
Thumbs.db
```

If a file has already been committed:

```bash
git rm -r --cached <file-or-folder>
```

---

## License

This project was created for learning purposes and demonstrates React concepts including components, routing, state management, filtering, and responsive UI development.