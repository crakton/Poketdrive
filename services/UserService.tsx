import { AxiosRequestConfig } from "axios";
import { request } from "../lib/api";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string[];
}

export const register = async (user: User) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "/register",
    data: user,
  };

  const response = await request(options);
  return response;
};

export const login = async (user: User) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "/login",
    data: user,
  };

  const response = await request(options);
  return response;
};
