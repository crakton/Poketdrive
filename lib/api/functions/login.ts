import request from "../request";

/**
 * The `ILoginRequest` interface defines the structure of an object that represents a login request.
 * It specifies three properties:
 * 1. `email`: A required string property representing the email of the user trying to log in.
 * 2. `password`: A required string property representing the password of the user trying to log in.
 * 3. `phoneNumber`: An optional string property representing the phone number of the user.
 */
export interface ILoginRequest {
    email: string;
    password: string;
    phoneNumber?: string;
}


/**
 * The login function sends a POST request to the login endpoint with the provided email and password
 * parameters.
 *
 * @param {ILoginRequest}  - The type interface of the function parameters.
 * @param {string} email - The email of the user trying to log in.
 * @param {string} password - The password of the user trying to log in.
 * @param {string} [phoneNumber] - Optional parameter for the user's phone number.
 *
 * @returns {Promise<any>} - The `login` function is returning a Promise that resolves with the response
 * from the `request` function, which is the result of making a POST request to the login endpoint with the
 * provided email and password parameters.
 */
const login = async ({ email, password }: ILoginRequest ) => {
    const response = request({
        key: ENDPOINT.LOGIN,
        method: 'POST',
        url: ENDPOINT.LOGIN,
        params: {
            email,
            password,
        }
    });

    return response;
}

export default login;