import {createContext, useCallback, useContext, useEffect, useReducer} from "react";

const BASE_URL = 'http://localhost:8000'

const CitiesContext = createContext()

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {}
}

function reducer(state, action) {
    switch (action.type) {
        case 'loading': {
            return {...state, isLoading: action.payload}
        }
        case 'setCities': {
            return {...state, cities: action.payload}
        }
        case 'setCurrentCity': {
            return {...state, currentCity: action.payload}
        }
        case 'addCity': {
            return {...state, cities: [...state.cities, action.payload], currentCity: action.payload}
        }
        case 'deleteCity': {
            return {
                ...state,
                cities: state.cities.filter(city => city.id !== action.payload),
                currentCity: action.payload === state.currentCity.id ? {} : state.currentCity
            }
        }
        default:
            throw new Error('Unknown action type')
    }
}

const CitiesProvider = ({children}) => {
    const [{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({type: 'loading', payload: true})
        fetch(`${BASE_URL}/cities`)
            .then(res => res.json())
            .then(data => dispatch({type: 'setCities', payload: data}))
            .catch(() => alert('There was an error loading cities...'))
            .finally(() => dispatch({type: 'loading', payload: false}))
    }, []);

    const getCity = useCallback(async function getCity(id) {
        if (Number(id) === currentCity.id) return
        try {
            dispatch({type: 'loading', payload: true})
            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json()
            dispatch({type: 'setCurrentCity', payload: data})
        } catch (e) {
            alert('There was an error loading the city...')
        } finally {
            dispatch({type: 'loading', payload: false})
        }
    }, [currentCity.id])

    async function addCity(newCity) {
        try {
            dispatch({type: 'loading', payload: true})
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            dispatch({type: 'addCity', payload: data})
        } catch (e) {
            alert('There was an error adding the city.')
        } finally {
            dispatch({type: 'loading', payload: false})
        }
    }

    async function deleteCity(id) {
        try {
            dispatch({type: 'loading', payload: true})
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            })
            dispatch({type: 'deleteCity', payload: id})
        } catch (e) {
            alert('There was an error deleting the city.')
        } finally {
            dispatch({type: 'loading', payload: false})
        }
    }

    return (
        <CitiesContext.Provider value={{cities, isLoading, currentCity, getCity, addCity, deleteCity}}>
            {children}
        </CitiesContext.Provider>
    );
};

const useCities = () => {
    const context = useContext(CitiesContext)
    if (context === undefined) throw new Error('CitiesContext was used outside the CitiesProvider')
    return context
}

export {CitiesProvider, useCities};
