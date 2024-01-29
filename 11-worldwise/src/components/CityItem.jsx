import styles from './CityItem.module.css'
import {Link} from "react-router-dom";
import {useCities} from "../contexts/CitiesContext.jsx";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
const CityItem = ({city}) => {
    const {currentCity, deleteCity} = useCities()
    const {cityName, emoji, date, id, position} = city

    const handleDeleteCity = (e) => {
        e.preventDefault()
        deleteCity(id)
    }

    return (
        <li>
            <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`}
                  to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={styles.emoji}>{emoji?.length > 1 ? emoji : <img src={emoji.props.src}
                                                                                 alt={emoji.props.alt}/>}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button onClick={handleDeleteCity} className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
};

export default CityItem;
