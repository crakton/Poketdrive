import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import {
  WalletPayment,
  walletPayment,
  walletDetails,
  walletHistory,
} from "../../services/walletService";
import { string } from "yup";

const queryClient = new QueryClient();

export const useWalletPayment = () => {
  return useMutation({
    mutationFn: (data: WalletPayment) => {
      return walletPayment(data);
    },
  });
};
export const useWalletDetails = (id: string) => {
  return useQuery({
    queryKey: ["cardDetails", id],
    queryFn: () => walletDetails(id),
    enabled: !!id,
  });
};

export const useWalletHistory = (id: string) => {
  return useQuery({
    queryKey: ["walletHistory", id],
    queryFn: () => walletHistory(id),
    enabled: !!id,
  });
};
