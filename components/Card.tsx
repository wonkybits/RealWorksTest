import styles from "../styles/Card.module.css";
import { FilteredWeather } from "../types/types";

interface CardProps {
  data: FilteredWeather;
}

export default function Card(props: CardProps) {
  return (
    <div className={`${styles.card} ${props.data.exclusions.length > 0 ? styles.nogo : ""}`}>
      <span className={styles.city}>
        <span className={styles.label}>City:</span>
        {props.data.name}
      </span>
      <div className={styles.coord_container}>
        <span className={styles.coord}>
          <span className={styles.label}>Latitude:</span>
          {props.data.lat}
        </span>
        <span className={styles.coord}>
          <span className={styles.label}>Longitude:</span>
          {props.data.lng}
        </span>
      </div>
      <div className={styles.weather_container}>
        <span className={styles.title}>Weather</span>
        <div className={styles.weather_data_container}>
          <span className={styles.weather_data}>
            <span className={styles.label}>Temperature:</span>
            {props.data.temperature}
          </span>
          <span className={styles.weather_data}>
            <span className={styles.label}>Wind Speed:</span>
            {props.data.windSpeed}
          </span>
        </div>
        {props.data.alert && (
          <div className={styles.alert}>
            <span className={styles.small_title}>Alert:</span>
            <span className={styles.body}>{props.data.alert}</span>
          </div>
        )}
        {props.data.exclusions.length > 0 && (
          <div className={styles.exclusion_container}>
            <span className={styles.title}>Reasons not to go:</span>
            <ul className={styles.body}>
              {props.data.exclusions.map((item, index) => {
                return <li key={`exclusion-${index}`}>{item}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
