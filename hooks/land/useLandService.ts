import LandService from "@services/landService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
/**
 * Custom hook for accessing land-related data and operations
 *
 * This hook initializes the LandService and provides wrapped React Query hooks
 * for data fetching and mutations.
 */

export const useLandService = () => {
	const queryClient = useQueryClient();
	const landService = new LandService(queryClient);

	return {
		/**
		 * Post a trip
		 */
		usePostTrip: () => {
			return useMutation({
				mutationFn: landService.postTrip,
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["rides"] });
				},
			});
		},
	};
};
