import styles from "./CountryItem.module.css";

function CountryItem({country}) {
    return (
        <li className={styles.countryItem}>
      <span>{country.emoji?.length > 1 ? country.emoji : <img src={country.emoji.props.src}
                                                              alt={country.emoji.props.alt}/>}</span>
            <span style={{textAlign: 'center'}}>{country.country}</span>
        </li>
    );
}

export default CountryItem;
