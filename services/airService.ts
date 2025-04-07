import { QueryClient, MutationFunction } from "@tanstack/react-query";
import { baseUrl } from "../utils/constant";
import {
	FindFlightDTO,
	TBookFlightWithoutSharedSeatsDTO,
	TBookFlightWithSharedSeatsDTO,
	TBookSharedFlightDTO,
} from "../types/dtos/flightDto";
import AuthService from "./authService";

export default class AirService {
	private queryClient: QueryClient;

	constructor(queryClient: QueryClient) {
		this.queryClient = queryClient;
	}

	getAirlines = () => {
		const queryKey = ["airline"];
		return {
			queryKey,
			queryFn: async () => {
				const response = await fetch(`${baseUrl}/air/airline`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || "Failed to fetch airlines");
				}
				return response.json() as Promise<any>;
			},
		};
	};
	getAirlineCities = () => {
		const queryKey = ["cities"];
		return {
			queryKey,
			queryFn: async () => {
				const response = await fetch(`${baseUrl}/air/airport/cities`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || "Failed to fetch airlines");
				}
				return response.json() as Promise<any>;
			},
		};
	};
	getAirlineById = (id: string) => {
		const queryKey = ["airline", id];

		return {
			queryKey,
			queryFn: async () => {
				const response = await fetch(`${baseUrl}/air/airline/${id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						errorData.message || `Failed to fetch airline with id ${id}`
					);
				}
				return response.json() as Promise<any>;
			},
		};
	};
	getFlightById = (id: string) => {
		const queryKey = ["flight", id];

		return {
			queryKey,
			queryFn: async () => {
				const response = await fetch(`${baseUrl}/air/flights/${id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						errorData.message || `Failed to fetch airline with id ${id}`
					);
				}
				return response.json() as Promise<any>;
			},
		};
	};

	bookFullFlight: MutationFunction<
		any,
		{ payload: TBookFlightWithoutSharedSeatsDTO; id: string }
	> = async ({ payload, id }) => {
		const response = await fetch(`${baseUrl}/air/booking/${id}/book-jet`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${AuthService.getToken()}`,
			},
			body: JSON.stringify(payload),
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to book flight");
		}
		return response.json();
	};
	bookAndShareFlight: MutationFunction<
		any,
		{ payload: TBookFlightWithSharedSeatsDTO; id: string }
	> = async ({ payload, id }) => {
		const response = await fetch(`${baseUrl}/air/booking/${id}/book-jet`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${AuthService.getToken()}`,
			},
			body: JSON.stringify(payload),
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to book flight");
		}
		return response.json();
	};
	joinBookedFlight: MutationFunction<
		any,
		{ payload: TBookSharedFlightDTO; id: string }
	> = async ({ payload, id }) => {
		const response = await fetch(`${baseUrl}/air/booking/${id}/book-jet`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${AuthService.getToken()}`,
			},
			body: JSON.stringify(payload),
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to book flight");
		}
		return response.json();
	};
	findFlights: MutationFunction<any, FindFlightDTO> = async (data) => {
		const response = await fetch(`${baseUrl}/air/flights/search-flights`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to find flights");
		}
		return response.json();
	};
}
