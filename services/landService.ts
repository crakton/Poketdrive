import { QueryClient, MutationFunction } from "@tanstack/react-query";
import api from "../lib/api"; // Import the axios instance
import { Schedule } from "./scheduleService";

export default class LandService {
	private queryClient: QueryClient;

	constructor(queryClient: QueryClient) {
		this.queryClient = queryClient;
	}

	// payTrip = (id: string) => {
	//   const queryKey = ["pay-flight", id];
	//   return {
	//     queryKey,
	//     queryFn: async () => {
	//       const response = await api.get(
	//         `/wallet/initialize_flight_payment/${id}`
	//       );
	//       return response.data;
	//     },
	//   };
	// };

	postTrip: MutationFunction<any, Schedule> = async (payload) => {
		const response = await api.post(`rides/book_ride`, payload);
		return response.data;
	};
}
