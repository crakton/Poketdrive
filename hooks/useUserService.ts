import UserService from "@services/userService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Custom hook for accessing airline-related data and operations
 *
 * This hook initializes the UserService and provides wrapped React Query hooks
 * for data fetching and mutations.
 */
export const useUserService = () => {
	const queryClient = useQueryClient();
	const userService = new UserService(queryClient);

	return {
		/**
		 * Fetch user wallet details
		 */
		useGetWallet: (userId: string) => {
			const { queryKey, queryFn } = userService.getWallet(userId);
			return useQuery({
				queryKey,
				queryFn,
			});
		},

		/**
		 * Fetch all wallet history
		 */
		useGetWalletHistory: (userId: string) => {
			const { queryKey, queryFn } = userService.getWalletHistory(userId);
			return useQuery({
				queryKey,
				queryFn,
			});
		},
	};
};
