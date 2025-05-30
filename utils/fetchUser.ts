import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUserDetails = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem("userData");
		if (jsonValue != null) {
			return JSON.parse(jsonValue) as TUserDetails;
		}
	} catch (e) {
		console.log("Error fetching user data:", e);
	}
};

export type TUserDetails = {
	Bearer_token: string;
	email: string;
	emailVerified: boolean;
	firstName: string;
	id: string;
	lastName: string;
	role: string;
};
