import { useCities } from "../contexts/CityContext";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import NoData from "./NoData";

function CityList() {
  const { cities, deleteCity, isCityiesLoading, isCitiesError } = useCities();

  if (isCityiesLoading) return <Spinner />;
  if (isCitiesError)
    return <Message emoji={"😰"} message={"Error In Fetching Data"} />;

  if (cities.length === 0 ) return <NoData data={'Cities'}/>

  return (
    <div className={styles.cityList}>
      {cities.map((city) => {
        return (
          <CityItem
            key={city.id}
            emoji={city.emoji}
            name={city.cityName}
            date={city.date}
            deleteCity={deleteCity}
            id={city.id}
            position={city.position}
          />
        );
      })}
    </div>
  );
}

export default CityList;
