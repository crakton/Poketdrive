import { QueryClient, MutationFunction } from "@tanstack/react-query";
import api from "../lib/api"; // Import the axios instance

export default class UserService {
	private queryClient: QueryClient;

	constructor(queryClient: QueryClient) {
		this.queryClient = queryClient;
	}

	getWallet = (userId: string) => {
		const queryKey = ["wallet", userId];
		return {
			queryKey,
			queryFn: async () => {
				const response = await api.get(
					`/wallet/wallet_details?userId=${userId}`
				);
				return response.data;
			},
		};
	};
	getWalletHistory = (userId: string) => {
		const queryKey = ["wallet-history", userId];
		return {
			queryKey,
			queryFn: async () => {
				const response = await api.get(
					`wallet/transaction_history?userId=${userId}`
				);
				return response.data;
			},
		};
	};

	getUsers = () => {
		const queryKey = ["users"];
		return {
			queryKey,
			queryFn: async () => {
				const response = await api.get("/users");
				return response.data;
			},
		};
	};
	getUser = (userId: string) => {
		const queryKey = ["user", userId];
		return {
			queryKey,
			queryFn: async () => {
				const response = await api.get(`/users/${userId}`);
				return response.data;
			},
		};
	};
}
