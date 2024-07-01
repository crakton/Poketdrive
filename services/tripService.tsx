import { AxiosRequestConfig } from "axios";
import { fetch } from "../lib/api";

export interface Trip {
  origin: string;
  destination: string;
}

export const searchRide = async (data: Trip) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "rides/allrides",
    data,
  };

  const response = await fetch(options);
  return response;
};
