import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { searchRide, Trip } from "../../services/tripService";

const queryClient = new QueryClient();

// export const useGetTrips = () => {
//   return useQuery({
//     queryKey: ["listings"],
//     queryFn: async () => await getListing(),
//   });
// };

// export const useGetListingById = (id: string) => {
//   return useQuery({
//     queryKey: ["listing", id],
//     queryFn: () => getList(id),
//   });
// };

export const useSearchRide = () => {
  return useMutation({
    mutationFn: (data: Trip) => searchRide(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};

// export const useUpdateListing = () => {
//   return useMutation({
//     mutationFn: ({ id, data }: { id: string; data: any }) =>
//       updateListing(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["listings"] });
//     },
//   });
// };

// export const useDeleteListing = () => {
//   return useMutation({
//     mutationFn: (id: string) => deleteListing(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["listings"] });
//     },
//   });
// };
