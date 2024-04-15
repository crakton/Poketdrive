import { AxiosRequestConfig } from "axios";
import { request } from "../libs/api";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string[];
}

const register = async (user: User) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "/register",
    data: user,
  };

  const response = await request(options);
  return response;
};
