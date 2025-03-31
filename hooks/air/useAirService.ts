import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AirService from "../../services/airService";

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
		 * Create a new airline
		 * @returns Mutation hook for creating airlines
		 */
		useCreateAirline: () => {
			return useMutation({
				mutationFn: airService.createAirline,
				onSuccess: () => {
					// Invalidate and refetch airlines list after creation
					queryClient.invalidateQueries({ queryKey: ["airline"] });
				},
			});
		},
	};
};
