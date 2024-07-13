import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import {
  createRide,
  manageRide,
  ManageRide,
  DeleteRide,
  deleteRide,
  Schedule,
} from "../../services/scheduleService";
import { fetch } from "../../lib/api";

const queryClient = new QueryClient();
export const useSchedule = () => {
  return useMutation({
    mutationFn: (data: Schedule) => {
      return fetch({
        method: "POST",
        url: "rides/book_ride",
        data: data,
      });
    },
  });
};

export const useManageRide = () => {
  return useMutation({
    mutationFn: (data: ManageRide) => manageRide(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manageRide"] });
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
