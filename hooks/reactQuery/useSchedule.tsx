import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import {
  createRide,
  manageRide,
  ManageRide,
  DeleteRide,
  deleteRide,
  Schedule,
} from "../../services/scheduleService";

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

export const useSchedule = () => {
  return useMutation({
    mutationFn: (data: Schedule) => createRide(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Schedule"] });
    },
  });
};

export const useManageRide = () => {
  return useMutation({
    mutationFn: (data: ManageRide) => manageRide(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Schedule"] });
    },
  });
};
export const useDeleteRide = () => {
  return useMutation({
    mutationFn: (data: DeleteRide) => deleteRide(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteRide"] });
    },
  });
};
export type { Schedule };
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
