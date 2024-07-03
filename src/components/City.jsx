import styles from "./City.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCities } from "../contexts/CityProvider";
import Spinner from './Spinner'
import Message from './Message';
import { useEffect } from "react";
import { convertToEmoji } from "./Form";

export const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const navigate = useNavigate()
  const {id} = useParams()
  const {getCurrentCity,currentCity,isCurrentCityLoading,isCurrentCityError} = useCities() 
  const { cityName, emoji, date, notes } = currentCity;

  useEffect(()=>{
    getCurrentCity(id)
  },[id])

  
  if (isCurrentCityLoading) return <Spinner/>
  if (isCurrentCityError) return <Message emoji='😰' message={'Error Occured While Fetching Data'}/>


  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <button onClick={()=>{navigate(-1)}} className={styles.backBtn}>Back</button>
      </div>
    </div>
  );
}

export default City;
