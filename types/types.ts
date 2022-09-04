export interface City {
  name: string;
  lat: number;
  lng: number;
}

export interface Weather extends City {
  temperature: number;
  windSpeed: number;
  clouds: number;
  alert: string | null;
}

export interface FilteredWeather extends Weather {
  exclusions: string[];
}

export enum WeatherDataMode {
  BEACH,
  SKI,
  NEITHER,
}
