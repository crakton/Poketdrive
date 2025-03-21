import axios from "axios";
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

export const VerifytOTP = async (otpData: number) => {
	try {
		const res = await axios.post(`${baseUrl}/auth/verify-otp`, otpData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return res.data;
	} catch (error) {
		throw error;
	}
};
