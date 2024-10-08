import { useCities } from "../contexts/CityContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import NoData from "./NoData";


function CountryList() {
  const { cities } = useCities();
  const uniqueCountries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);


  if (uniqueCountries.length === 0 ) return <NoData data={'Countries'}/>

  return (
    <div className={styles.countryList}>
      {uniqueCountries.map((country) => {
        return <CountryItem key={country.country} country={country} />;
      })}
    </div>
  );
}

export default CountryList;
