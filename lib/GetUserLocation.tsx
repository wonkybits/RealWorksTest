import { City } from "../types/types";

export async function GetUserLocation(): Promise<City | null> {
  await navigator.geolocation.getCurrentPosition((position) => {
    const currLoc = {
      name: "test",
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    console.log(`GetUserLocation, currLoc -> ${JSON.stringify(currLoc)}`);

    return currLoc;
  });

  return null;
}
