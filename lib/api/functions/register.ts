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
 * @param {IRegisterRequest}  - The type interface of the function parameters.
 * @param {string} firstName - The first name of the user trying to register.
 * @param {string} lastName - The last name of the user trying to register.
 * @param {string} email - The email of the user trying to register.
 * @param {string} password - The password of the user trying to register.
 *
 * @returns {Promise<any>} - The `register` function is returning a Promise that resolves with the response
 * from the `request` function, which is the result of making a POST request to the registration endpoint with the
 * provided user details.
 */
const register = async (data: IRegisterRequest): Promise<any> => {
  const response = await request({
    key: "REGISTER",
    method: "POST",
    url: `${baseUrl}/auth/register`,
    data, // Use 'data' for the request body
  });

  return response;
};

export default register;
