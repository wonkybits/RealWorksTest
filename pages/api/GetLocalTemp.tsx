import { NextApiRequest, NextApiResponse } from "next";
import { LocalizedTemperature } from "../../types/types";

type ErrorMessage = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<LocalizedTemperature | ErrorMessage>) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
  }

  if (req.body.lat && req.body.lng) {
    const weatherPromise = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${req.body.lat}&lon=${req.body.lng}&exclude=minutely,hourly,daily,alerts&appid=${process.env.OPENWEATHERKEY}&units=imperial`
    );
    const weatherJSON = await weatherPromise.json();
    res.status(200).send({ temperature: weatherJSON.current.temp } as LocalizedTemperature);
  } else {
    res.status(400).send({ message: "Must include lat & lng data" });
  }
}
