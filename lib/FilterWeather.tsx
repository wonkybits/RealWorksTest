import { FilteredWeather, Weather, WeatherDataMode } from "../types/types";

export function FilterWeather(data: Weather, mode: WeatherDataMode): FilteredWeather {
  const exclusions: string[] = [];

  if (mode === WeatherDataMode.BEACH) {
    if (data.temperature < 70) exclusions.push("Too Cold");

    if (data.windSpeed > 20) exclusions.push("Too Windy");

    if (data.clouds > 15) exclusions.push("Too Cloudy");

    if (data.alert) exclusions.push("A weather alert for the area is in effect");
  } else {
    if (data.temperature > 50) exclusions.push("Too Warm");

    if (data.alert) exclusions.push("A weather alert for the area is in effect");
  }

  const newFilteredWeather: FilteredWeather = { ...data, exclusions: exclusions };

  return newFilteredWeather;
}
