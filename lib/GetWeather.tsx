import { Weather, City, FilteredWeather, WeatherDataMode } from "../types/types";
import { FilterWeather } from "./FilterWeather";

export async function GetWeather(data: City, mode: WeatherDataMode): Promise<FilteredWeather> {
  let filteredWeather: FilteredWeather = {
    name: "",
    lat: 0,
    lng: 0,
    temperature: 0,
    windSpeed: 0,
    clouds: 0,
    alert: null,
    exclusions: [],
  };

  try {
    const localizedWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lng}&exclude=minutely,hourly,daily,alerts&appid=${process.env.OPENWEATHERKEY}&units=imperial`
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

    filteredWeather = FilterWeather(cityWeather, mode);

    return filteredWeather;
  } catch (error) {
    console.log(`An error occured while loading weather for City: ${data.name}, error -> ${error}`);
  }

  return filteredWeather;
}
