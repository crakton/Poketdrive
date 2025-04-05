import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import {
  getCouponRate,
  getOrderFrom,
  getOrderTo,
  getRate,
  sendOrder,
} from "../../services/waterService";
import { SendFormState } from "../../redux/features/waterSendSlice";
import Toast from "react-native-toast-message";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";

const queryClient = new QueryClient();

export const useSendOrder = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return useMutation({
    mutationFn: (data: SendFormState) => sendOrder(data),
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Order successfully created" });
      queryClient.invalidateQueries({ queryKey: ["order"] });
      navigation.reset({
        index: 0,
        routes: [{ name: "SucessScreen" }],
      });
    },
  });
};
export const useGetCouponRate = (kg: number, coupon: string) => {
  return useQuery({
    queryKey: ["getCouponRate", kg, coupon],

    queryFn: () => getCouponRate(kg, coupon),
    enabled: !!kg && !!coupon,
  });
};
export const useGetRate = (kg: number) => {
  return useQuery({
    queryKey: ["getRate"],
    queryFn: () => getRate(kg),
    enabled: !!kg,
  });
};
export const useGetOrdersFrom = () => {
  return useQuery({
    queryKey: ["getRate"],
    queryFn: () => getOrderFrom(),
  });
};
export const useGetOrdersTo = () => {
  return useQuery({
    queryKey: ["getRate"],
    queryFn: () => getOrderTo(),
  });
};
