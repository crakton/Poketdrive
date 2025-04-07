import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AirService, { FindFlightDTO } from "../../services/airService";

/**
 * Custom hook for accessing airline-related data and operations
 *
 * This hook initializes the AirService and provides wrapped React Query hooks
 * for data fetching and mutations.
 */
export const useAirService = () => {
	const queryClient = useQueryClient();
	const airService = new AirService(queryClient);

	return {
		/**
		 * Fetch all airlines
		 */
		useGetAirlines: () => {
			const { queryKey, queryFn } = airService.getAirlines();
			return useQuery({
				queryKey,
				queryFn,
			});
		},
		/**
		 * Fetch all supported cities
		 */
		useGetAirlineCities: () => {
			const { queryKey, queryFn } = airService.getAirlineCities();
			return useQuery({
				queryKey,
				queryFn,
			});
		},

		/**
		 * Fetch a specific airline by ID
		 * @param id - The ID of the airline to fetch
		 */
		useGetAirlineById: (id: string) => {
			const { queryKey, queryFn } = airService.getAirlineById(id);
			return useQuery({
				queryKey,
				queryFn,
				// Only fetch when ID is present
				enabled: !!id,
			});
		},
		/**
		 * Fetch a specific flight by ID
		 * @param id - The ID of the airline to fetch
		 */
		useGetFlightById: <T>(id: string) => {
			const { queryKey, queryFn } = airService.getFlightById(id);
			return useQuery<T>({
				queryKey,
				queryFn,
				// Only fetch when ID is present
				enabled: !!id,
			});
		},

		/**
		 * Create a new airline
		 * @returns Mutation hook for finding flgihts
		 * @Params {departureCity:string, destinationCity:string }
		 */
		// useFindFlights: (payload: FindFlightDTO) => {
		// 	return useMutation({
		// 		mutationFn: () => airService.findFlights(payload),
		// 		onSuccess: () => {
		// 			// Invalidate and refetch airlines list after creation
		// 			queryClient.invalidateQueries({ queryKey: ["findFlights"] });
		// 		},
		// 		onError: (error) => {
		// 			console.log(error);
		// 		},
		// 	});
		// },
	};
};
