import {useEffect, useState} from "react";

const API_KEY = '434a80df'

export function useMovies(query, /*callback*/) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Можна замінити на event handler function
    useEffect(() => {
        // callback?.()
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

    return {movies, isLoading, error}
}
