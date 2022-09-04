export interface City {
  name: string;
  lat: number;
  lng: number;
}

export interface Weather {
  temperature: number;
  windSpeed: number;
  clouds: number;
}

export interface LocalizedWeather extends City, Weather {
  alert: string | null;
}

export interface FilteredWeather extends LocalizedWeather {
  exclusions: string[];
}

export interface HomeWeather extends City {
  temperature: number;
}

export enum WeatherDataMode {
  BEACH,
  SKI,
}
