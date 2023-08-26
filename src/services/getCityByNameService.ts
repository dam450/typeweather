import { api } from "./api";

export interface ICityProps {
  id: string
  name: string
  longitude: number
  latitude: number
}

export interface ICityApiResponse {
  id: string
  name: string
  sys: {
    country?: string
    sunrise: number
    sunset: number
  }
  coord: {
    lat: number
    lon: number
  }
}

export async function getCityByNameService(name: string): Promise<ICityProps | null> {
  try {
    const { data } = await api.get<ICityApiResponse>(`/weather?q=${name}`);

    console.log("data: ", data)

    const city = {
      id: data.id,
      name: data.sys.country ? `${data.name}, ${data.sys.country}` : data.name,
      longitude: data.coord.lon,
      latitude: data.coord.lat,
    };

    return city;
  } catch (error) {
    return null;
  }
}
