import { QueryClient, MutationFunction } from "@tanstack/react-query";
import { baseUrl } from "../utils/constant";

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

	createAirline: MutationFunction<any, any> = async (data) => {
		const response = await fetch(`${baseUrl}/air/airline`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to create airline");
		}
		return response.json();
	};
}
