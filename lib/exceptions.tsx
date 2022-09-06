export class OpenWeatherAPIError extends Error {
  OWMAPIMessage: string;
  code: number;

  constructor(msg: string, code: number) {
    super(msg);
    this.OWMAPIMessage = msg;
    this.code = code;
  }

  getErrorMessage(): string {
    switch (this.code) {
      case 401:
        return "There is an issue with the API key.";
        break;
      case 404:
        return "Request format incorrect.";
        break;
      case 429:
        return "Exceeded request limit.";
        break;
      case 500:
        return "Critical error, contact OpenWeather.";
        break;
      case 502:
        return "Critical error, contact OpenWeather.";
        break;
      case 503:
        return "Critical error, contact OpenWeather.";
        break;
      case 504:
        return "Critical error, contact OpenWeather.";
        break;
      default:
        return "Something is really borked! Unknown error.";
        break;
    }
  }

  getOWMAPIErrorMessage(): string {
    return this.OWMAPIMessage;
  }

  getErrorCode(): number {
    return this.code;
  }
}
