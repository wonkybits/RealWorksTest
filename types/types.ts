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

export interface LocalizedTemperature {
  temperature: number;
}

export interface LocalWeather extends LocalizedTemperature {
  lat: number;
  lng: number;
}

export enum WeatherDataMode {
  BEACH,
  SKI,
  NEITHER,
}
