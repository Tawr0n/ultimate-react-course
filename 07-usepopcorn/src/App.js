import {useEffect, useState} from "react";
import StarRating from "./StarRating";

const tempMovieData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
        imdbID: "tt0133093",
        Title: "The Matrix",
        Year: "1999",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
        imdbID: "tt6751668",
        Title: "Parasite",
        Year: "2019",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
];

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const NavBar = ({children}) => {
    return (
        <nav className="nav-bar">
            <Logo/>
            {children}
        </nav>
    )
}

const Logo = () => {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    )
}

const SearchInput = ({query, setQuery}) => {

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}

const SearchNumResults = ({movies}) => {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    )
}

const Main = ({children}) => {
    return (
        <main className="main">
            {children}
        </main>
    )
}


const WatchedMoviesSummary = ({watched}) => {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(1)} min</span>
                </p>
            </div>
        </div>
    )
}
const WatchedMoviesList = ({watched, onDeleteWatchedMovie}) => {
    return (
        <ul className="list">
            {watched.map((movie) => <WatchedMovie movie={movie} onDeleteWatchedMovie={onDeleteWatchedMovie}
                                                  key={movie.imdbID}/>)}
        </ul>
    )
}
const WatchedMovie = ({movie, onDeleteWatchedMovie}) => {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`}/>
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
                <button onClick={() => onDeleteWatchedMovie(movie.imdbID)} className={'btn-delete'}>X</button>
            </div>
        </li>
    )
}
/*const WatchedMoviesBox = () => {
    const [isOpen2, setIsOpen2] = useState(true);
    const [watched, setWatched] = useState(tempWatchedData);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen2((open) => !open)}
            >
                {isOpen2 ? "–" : "+"}
            </button>
            {isOpen2 && (
                <>
                    <WatchedMoviesSummary watched={watched}/>
                    <WatchedMoviesList watched={watched}/>

                </>
            )}
        </div>
    )
}*/
const Box = ({children}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    )
}

const SelectedMovie = ({selectedMovieId, onCloseSelectedMovie, onAddWatchedMovie, watchedMovies}) => {
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [userRating, setUserRating] = useState('')

    const isWatched = watchedMovies.some(movie => movie.imdbID === selectedMovieId)
    const watchedMovieUserRating = watchedMovies.find(movie => movie.imdbID === selectedMovieId)?.userRating

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie

    const handleAdd = () => {
        const newWatchedMovie = {
            imdbID: selectedMovieId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating
        }
        onAddWatchedMovie(newWatchedMovie)
        onCloseSelectedMovie()
    }

    useEffect(() => {
        const callback = (e) => {
            if (e.code === 'Escape') {
                onCloseSelectedMovie()
            }
        }
        document.addEventListener('keydown', callback)

        return () => document.removeEventListener('keydown', callback)
    }, [onCloseSelectedMovie]);

    useEffect(() => {
        async function GetMovieDetails() {
            setIsLoading(true)
            const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedMovieId}`)
            const data = await res.json()
            setMovie(data)
            setIsLoading(false)
        }

        GetMovieDetails()
    }, [selectedMovieId]);

    useEffect(() => {
        if (!title) return
        document.title = `Movie | ${title}`
        return () => document.title = 'usePopcorn'
    }, [title]);

    return (
        <div className={'details'}>
            {isLoading
                ? <Loader/>
                : (<>
                    <header>
                        <button onClick={onCloseSelectedMovie} className={'btn-back'}>&larr;</button>
                        <img src={poster} alt={`Poster of ${title} movie`}/>
                        <div className={'details-overview'}>
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐</span> {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className={'rating'}>
                            {isWatched
                                ? <p>You rated this movie {watchedMovieUserRating} <span>⭐</span></p>
                                : <>
                                    <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
                                    {userRating &&
                                        <button onClick={handleAdd} className={'btn-add'}>+ Add to list</button>}
                                </>

                            }

                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>)
            }
        </div>
    )
}

const MoviesList = ({movies, onSelectMovie}) => {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie}/>)}
        </ul>
    )
}

const Movie = ({movie, onSelectMovie}) => {
    return (
        <li onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`}/>
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
}

const Loader = () => {
    return (
        <p className={'loader'}>
            Loading...
        </p>
    )
}

const ErrorMessage = ({message}) => {
    return (
        <p className={'error'}>
            <span>⛔</span> {message}
        </p>
    )
}

const API_KEY = '434a80df'
export default function App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedMovieId, setSelectedMovieId] = useState(null)

    /*useEffect(() => {
        console.log('After initial render')
    }, []);

    useEffect(() => {
        console.log('After every render')
    });
    useEffect(() => {
        console.log('D')
    }, [query]);

    console.log('During render')*/

    const handleSelectMovie = (id) => {
        setSelectedMovieId(selectedMovieId => id === selectedMovieId ? null : id)
    }

    const handleCloseSelectedMovie = () => {
        setSelectedMovieId(null)
    }

    const handleAddWatchedMovie = (movie) => {
        setWatched(watched => [...watched, movie])
    }

    const handleDeleteWatchedMovie = (id) => {
        setWatched(watched => watched.filter(movie => movie.imdbID !== id))
    }


    // Можна замінити на event handler function
    useEffect(() => {
        const controller = new AbortController()

        async function fetchMovies() {
            try {
                setIsLoading(true)
                setError('')
                const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
                    {signal: controller.signal})
                if (!res.ok) throw new Error('Something went wrong with fetching movies')

                const data = await res.json()
                if (data.Response === 'False') throw new Error('Movie not found')
                setMovies(data.Search)
            } catch (e) {
                if (e.name !== 'AbortError') {
                    console.log(e.message)
                    setError(e.message)
                }
            } finally {
                setIsLoading(false)
            }
        }

        if (query.length < 3) {
            setMovies([])
            setError('')
            return
        }
        // Закриваємо вибраний фільм, коли в пошуку міняється стрічка
        // handleCloseSelectedMovie()
        fetchMovies()

        return () => controller.abort()
    }, [query]);

    return (
        <>
            <NavBar>
                <SearchInput query={query} setQuery={setQuery}/>
                <SearchNumResults movies={movies}/>
            </NavBar>
            <Main>
                {/*<Box element={<MoviesList movies={movies}/>}/>
                <Box element={<><WatchedMoviesSummary watched={watched}/>
                    <WatchedMoviesList watched={watched}/></>}/>*/}
                <Box>
                    {isLoading
                        ? <Loader/>
                        : error
                            ? <ErrorMessage message={error}/>
                            : <MoviesList movies={movies} onSelectMovie={handleSelectMovie}/>}
                    {/*{!isLoading && !error && <MoviesList movies={movies}/>}
                    {isLoading && <Loader/>}
                    {error && <ErrorMessage message={error}/>}*/}
                </Box>
                <Box>
                    {selectedMovieId
                        ? <SelectedMovie selectedMovieId={selectedMovieId} watchedMovies={watched}
                                         onCloseSelectedMovie={handleCloseSelectedMovie}
                                         onAddWatchedMovie={handleAddWatchedMovie}/>
                        : <>
                            <WatchedMoviesSummary watched={watched}/>
                            <WatchedMoviesList watched={watched} onDeleteWatchedMovie={handleDeleteWatchedMovie}/>
                        </>}
                </Box>
            </Main>
        </>
    )
}
