import styles from './CountryList.module.css'
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";

// eslint-disable-next-line react/prop-types
const CountryList = ({cities, isLoading}) => {
    if (isLoading) return <Spinner/>
    if (!cities.length) return <Message message='Add your first city by clicking on a city on the map'/>

    const countries = cities.reduce((acc, city) => {
        if (acc.map(el => el.country).includes(city.country)) {
            return acc
        } else return [...acc, {country: city.country, emoji: city.emoji}]

    }, [])
    return (
        <ul className={styles.countryList}>
            {countries.map(country => <CountryItem country={country} key={country.country}/>)}
        </ul>
    );
};

export default CountryList;
