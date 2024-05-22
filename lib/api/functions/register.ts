import { baseUrl } from "../../../utils/constant";
import request from "../request";

// Define the structure of the registration request
export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * The register function sends a POST request to the registration endpoint with the provided user details.
 *
 * @param {IRegisterRequest} data - The user details to be registered.
 * @returns {Promise<any>} - A Promise that resolves with the response from the registration endpoint.
 */
const register = async (data: IRegisterRequest): Promise<any> => {
  const response = await request({
    method: "POST",
    url: `${baseUrl}/auth/register`,
    data,
  });

  return response;
};

export default register;
