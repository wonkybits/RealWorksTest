import { FilteredWeather, LocalizedWeather, WeatherDataMode } from "../types/types";

export function FilterWeather(data: LocalizedWeather[], mode: WeatherDataMode): FilteredWeather[] | null {
  const newFilteredWeather: FilteredWeather[] = data.map((city) => {
    const exclusions: string[] = [];

    if (mode === WeatherDataMode.BEACH) {
      if (city.temperature < 70) exclusions.push("Too Cold");

      if (city.windSpeed > 20) exclusions.push("Too Windy");

      if (city.clouds > 15) exclusions.push("Too Cloudy");

      if (city.alert) exclusions.push("A weather alert for the area is in effect");
    } else {
      if (city.temperature > 50) exclusions.push("Too Warm");

      if (city.alert) exclusions.push("A weather alert for the area is in effect");
    }

    return { ...city, exclusions: exclusions };
  });

  return newFilteredWeather;
}
