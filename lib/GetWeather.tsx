import { Weather, City, FilteredWeather, WeatherDataMode } from "../types/types";
import { FilterWeather } from "./FilterWeather";

export async function GetWeather(data: City, mode: WeatherDataMode): Promise<FilteredWeather> {
  const localizedWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lng}&exclude=minutely,hourly,daily,alerts&appid=f5b267cb21f0a116919db453b2b22f63&units=imperial`
  );
  const jsonWeather = await localizedWeather.json();
  const cityWeather: Weather = {
    name: data.name,
    lat: data.lat,
    lng: data.lng,
    temperature: jsonWeather.current.temp,
    windSpeed: jsonWeather.current.wind_speed,
    clouds: jsonWeather.current.clouds,
    alert: jsonWeather.current.alerts ? jsonWeather.current.alerts[0].event : null,
  };

  const filteredWeather = FilterWeather(cityWeather, mode);

  return filteredWeather;
}