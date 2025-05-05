import { QueryClient, MutationFunction } from "@tanstack/react-query";
import api from "../lib/api"; // Import the axios instance

import {
	FindFlightDTO,
	TBookFlightWithoutSharedSeatsDTO,
	TBookFlightWithSharedSeatsDTO,
	TBookSharedFlightDTO,
} from "../types/dtos/flightDto";
import { isDate } from "node:util/types";

export default class AirService {
	private queryClient: QueryClient;

	constructor(queryClient: QueryClient) {
		this.queryClient = queryClient;
	}

	getFligts = () => {
		const queryKey = ["flights"];
		return {
			queryKey,
			queryFn: async () => {
				const response = await api.get("/air/flights");
				return response.data;
			},
		};
	};
	getAirlines = () => {
		const queryKey = ["airline"];
		return {
			queryKey,
			queryFn: async () => {
				const response = await api.get("/air/airline");
				return response.data;
			},
		};
	};

	getAirlineCities = () => {
		const queryKey = ["cities"];
		return {
			queryKey,
			queryFn: async () => {
				const response = await api.get("/air/airport/cities");
				return response.data;
			},
		};
	};

	getAirlineById = (id: string) => {
		const queryKey = ["airline", id];
		return {
			queryKey,
			queryFn: async () => {
				const response = await api.get(`/air/airline/${id}`);
				return response.data;
			},
		};
	};

	getFlightById = (id: string) => {
		const queryKey = ["flight", id];
		return {
			queryKey,
			queryFn: async () => {
				const response = await api.get(`/air/flights/${id}`);
				return response.data;
			},
		};
	};

	payFlight = (id: string) => {
		const queryKey = ["pay-flight", id];
		return {
			queryKey,
			queryFn: async () => {
				const response = await api.get(
					`/wallet/initialize_flight_payment/${id}`
				);
				return response.data;
			},
		};
	};

	bookFullFlight: MutationFunction<
		any,
		{ payload: TBookFlightWithoutSharedSeatsDTO; id: string }
	> = async ({ payload, id }) => {
		const response = await api.post(`/air/booking/${id}/book-jet`, payload);
		return response.data;
	};

	bookAndShareFlight: MutationFunction<
		any,
		{ payload: TBookFlightWithSharedSeatsDTO; id: string }
	> = async ({ payload, id }) => {
		console.log("payload", payload);
		const response = await api.post(`/air/booking/${id}/book-jet`, payload);
		return response.data;
	};

	joinBookedFlight: MutationFunction<
		any,
		{ payload: TBookSharedFlightDTO; id: string }
	> = async ({ payload, id }) => {
		const response = await api.post(`/air/booking/${id}/book-jet`, payload);
		return response.data;
	};

	findFlights: MutationFunction<any, FindFlightDTO> = async (data) => {
		const response = await api.post(`/air/flights/search-flights`, data);
		return response.data;
	};
}
