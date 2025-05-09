import { ICountryInfo } from "@app/page";

export async function getCountryFromCoordinates(
  lat: number,
  lon: number,
  apiKey: string
): Promise<ICountryInfo> {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch location data");
  }

  const data = await response.json();
  const results = data.results[0];

  if (results && results.components && results.components.country) {
    return results.components;
  } else {
    throw new Error("Country not found");
  }
}
