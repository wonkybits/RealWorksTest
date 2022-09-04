import { LocalizedWeather, City, FilteredWeather, WeatherDataMode } from "../types/types";
import { FilterWeather } from "./FilterWeather";

export async function GetWeather(data: City[], mode: WeatherDataMode): Promise<FilteredWeather[] | null> {
  const cityPromises = data.map((city) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lng}&exclude=minutely,hourly,daily,alerts&appid=f5b267cb21f0a116919db453b2b22f63&units=imperial`
    );
  });
  const responses = await Promise.all(cityPromises);
  const jsonResponses = await Promise.all(responses.map((res) => res.json()));
  const cityWeather: LocalizedWeather[] = jsonResponses.map((jsonRes, index) => {
    return {
      name: data[index].name,
      lat: data[index].lat,
      lng: data[index].lng,
      temperature: jsonRes.current.temp,
      windSpeed: jsonRes.current.wind_speed,
      clouds: jsonRes.current.clouds,
      alert: jsonRes.current.alerts ? jsonRes.current.alerts[0].event : null,
    };
  });
  const filteredWeather = FilterWeather(cityWeather, mode);

  return filteredWeather;
}
