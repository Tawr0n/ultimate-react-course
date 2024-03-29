import {useEffect, useRef, useState} from "react";
import StarRating from "./StarRating";
import {useMovies} from "./useMovies";
import {useLocalStorageState} from "./useLocalStorageState";
import {useKey} from "./useKey";

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
    const inputEl = useRef(null);
    
    useKey('enter', function () {
        if (document.activeElement === inputEl.current) return
        inputEl.current.focus()
        setQuery('')
    })

    // useEffect(() => {
    //     const el = document.querySelector('.search')
    //     console.log(el)
    //     el.focus()
    // }, []);

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
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

    const countRef = useRef(0)

    useEffect(() => {
        if (userRating) countRef.current++
    }, [userRating]);

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
            userRating,
            countRatingDecisions: countRef.current
        }
        onAddWatchedMovie(newWatchedMovie)
        onCloseSelectedMovie()
    }

    useKey('escape', onCloseSelectedMovie)

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
    const [selectedMovieId, setSelectedMovieId] = useState(null)
    const {movies, isLoading, error} = useMovies(query)
    const [watched, setWatched] = useLocalStorageState([], 'watchedMovies');


    const handleSelectMovie = (id) => {
        setSelectedMovieId(selectedMovieId => id === selectedMovieId ? null : id)
    }

    function handleCloseSelectedMovie() {
        setSelectedMovieId(null)
    }

    const handleAddWatchedMovie = (movie) => {
        setWatched(watched => [...watched, movie])

        // localStorage.setItem('watchedMovies', JSON.stringify([...watched, movie]))
    }

    const handleDeleteWatchedMovie = (id) => {
        setWatched(watched => watched.filter(movie => movie.imdbID !== id))
    }


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
