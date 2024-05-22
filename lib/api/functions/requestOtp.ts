// import { baseUrl } from "../../../utils/constant";
// import { request } from "../request";


// // Define the structure of the registration request
// export interface IOTPRequest {
//   email: string;
// }

// /**
//  * The register function sends a POST request to the otp endpoint with the provided user details.
//  *
//  * @param {IOTPRequest} data - The user details to be registered.
//  * @returns {Promise<any>} - A Promise that resolves with the response from the registration endpoint.
//  */
// const requestOTP = async (data: IOTPRequest): Promise<any> => {
//   const response = await request({
//     method: "POST",
//     url: `${baseUrl}/auth/send-otp`,
//     data,
//   });
//   return response;
// };

// export default requestOTP;
