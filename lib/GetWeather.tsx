import { Weather, City, FilteredWeather, WeatherDataMode } from "../types/types";
import { FilterWeather } from "./FilterWeather";
import { OpenWeather } from "./OpenWeatherClient";

export async function GetWeather(data: City, mode: WeatherDataMode): Promise<FilteredWeather | boolean> {
  // let filteredWeather: FilteredWeather = {
  //   name: data.name,
  //   lat: 0,
  //   lng: 0,
  //   temperature: 0,
  //   windSpeed: 0,
  //   clouds: 0,
  //   alert: null,
  //   exclusions: [],
  // };

  const weatherData = await OpenWeather(data.lat, data.lng);
  if (!weatherData) {
    return false;
  } else {
    const cityWeather: Weather = {
      name: data.name,
      lat: data.lat,
      lng: data.lng,
      temperature: weatherData.current.temp,
      windSpeed: weatherData.current.wind_speed,
      clouds: weatherData.current.clouds,
      alert: weatherData.current.alerts ? weatherData.current.alerts[0].event : null,
    };

    // filteredWeather = FilterWeather(cityWeather, mode);

    return FilterWeather(cityWeather, mode);
  }

  // return filteredWeather;
}
