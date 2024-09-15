import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import {
  createRide,
  manageRide,
  ManageRide,
  DeleteRide,
  deleteRide,
  Schedule,
  RequestedRiders,
  deleteRider,
  DeleteRider,
  VerifyRider,
  verifyRider,
  StartRide,
  startRide,
  getRides,
  endRide,
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
export const useGetRequest = (id: string) => {
  return useQuery({
    queryKey: ["RequestedRiders", id],
    queryFn: () => RequestedRiders(id),
    enabled: !!id,
  });
};

export const useDeleteRider = () => {
  return useMutation({
    mutationFn: (data: DeleteRider) => deleteRider(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteRider"] });
    },
  });
};

export const useVerifyRider = () => {
  return useMutation({
    mutationFn: (data: VerifyRider) => verifyRider(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verifyRider"] });
    },
  });
};
export const useStartRide = () => {
  return useMutation({
    mutationFn: (data: StartRide) => startRide(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["startRide"] });
    },
  });
};
export const useEndRide = () => {
  return useMutation({
    mutationFn: (data: StartRide) => endRide(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["endRide"] });
    },
  });
};
export const useGetRides = (id: string) => {
  return useQuery({
    queryKey: ["RequestedRiders", id],
    queryFn: () => getRides(id),
    enabled: !!id,
  });
};
export type { Schedule };
