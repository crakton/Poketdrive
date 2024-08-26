import { AxiosRequestConfig } from "axios";
import { fetch } from "../lib/api";

export interface Trip {
  origin: string;
  destination: string;
}
export interface Request {
  price: number;
  rideId: string;
  riderId: string;
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
export const RequestRide = async (data: Request) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "rides/add_rider",
    data,
  };

  const response = await fetch(options);
  return response;
};
