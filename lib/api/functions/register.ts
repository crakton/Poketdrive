import { baseUrl } from "../../../utils/constant";
import { request } from "../request";

export const RegisterUser = async (RegisterData: any) => {
  const res = await request("POST", `${baseUrl}/auth/register`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: RegisterData,
  });

  return res;
};

export const RequestOTP = async (OTPEmail: any) => {
  const res = await request("POST", `${baseUrl}/auth/send-otp`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: OTPEmail,
  });

  return res;
};

export const VerifytOTP = async (OTP: any) => {
  try {
    const res = await request("POST", `${baseUrl}/auth/verify-otp`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: OTP,
    });

    return res.data;
  } catch (error: any) {
    let errorMessage = "Failed to verify OTP";
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      errorMessage = error.response.data.message;
    }
    throw new Error(errorMessage);
  }
};
