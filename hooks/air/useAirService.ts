import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AirService from "../../services/airService";
import { FindFlightDTO } from "../../types/dtos/flightDto";

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
		 * Fetch all open flights
		 */
		useGetFlights: () => {
			const { queryKey, queryFn } = airService.getFligts();
			return useQuery({
				queryKey,
				queryFn,
			});
		},
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
				enabled: !!id,
			});
		},

		/**
		 * Fetch a specific flight by ID
		 * @param id - The ID of the flight to fetch
		 */
		useGetFlightById: <T>(id: string) => {
			const { queryKey, queryFn } = airService.getFlightById(id);
			return useQuery<T>({
				queryKey,
				queryFn,
				enabled: !!id,
			});
		},

		/**
		 * Find flights based on search criteria
		 */
		useFindFlights: () => {
			return useMutation({
				mutationFn: (data: FindFlightDTO) => airService.findFlights(data),
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["flights"] });
				},
			});
		},

		/**
		 * Book a full flight
		 */
		useBookFullFlight: () => {
			return useMutation({
				mutationFn: airService.bookFullFlight,
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["bookings"] });
				},
			});
		},

		/**
		 * Book and share a flight
		 */
		// useBookAndShareFlight: () => {
		//   return useMutation({
		//     mutationFn: airService.bookAndShareFlight,
		//     onSuccess: () => {
		//       queryClient.invalidateQueries({ queryKey: ["bookings"] });
		//     },
		//   });
		// },

		/**
		 * Join an already booked shared flight
		 */
		// useJoinBookedFlight: () => {
		//   return useMutation({
		//     mutationFn: airService.joinBookedFlight,
		//     onSuccess: () => {
		//       queryClient.invalidateQueries({ queryKey: ["bookings"] });
		//     },
		//   });
		// },
	};
};
