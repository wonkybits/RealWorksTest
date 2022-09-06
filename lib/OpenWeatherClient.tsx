import { OpenWeatherAPIError } from "./exceptions";

export async function OpenWeather(lat: number, lng: number) {
  try {
    const weatherPromise = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,daily&appid=${process.env.OPENWEATHERKEY}&units=imperial`
    );
    const jsonWeather = await weatherPromise.json();
    if (jsonWeather.cod) {
      throw new OpenWeatherAPIError(jsonWeather.message, jsonWeather.cod);
    }

    return jsonWeather;
  } catch (error) {
    if (error instanceof OpenWeatherAPIError) {
      console.error(`OpenWeatherAPI exception caught -> ${error.getErrorMessage()}, code -> ${error.getErrorCode()}.`);
      console.error(`Error message from OpenWeatherAPI -> ${error.getOWMAPIErrorMessage()}`);
    } else {
      console.error(`OpenWeather error caught -> ${error}`);
    }

    return false;
  }
}
