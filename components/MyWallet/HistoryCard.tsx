import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface HistoryCardProps {
  transactionDate: string;
  from: string;
  to: string;
  amount: number;
  status: string;
  transactionType: string;
  reference?: string;
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("NGN", "₦"); // replace 'NGN' with the currency symbol '₦'
};

const HistoryCard: React.FC<HistoryCardProps> = ({
  transactionDate,
  from,
  to,
  amount,
  status,
  transactionType,
  reference,
}) => {
  return (
    <GestureHandlerRootView>
      <TouchableOpacity
        style={tw`bg-white rounded-lg flex-row p-2 items-center justify-between mb-3`}
      >
        <View style={tw`bg-white rounded-lg flex-row p-2 items-center gap-5`}>
          <View style={tw`bg-orange-500 p-2 rounded-full`}>
            <Icon
              name={status === "success" ? "checkmark" : "close"}
              type="ionicon"
              color="white"
            />
          </View>
          <View>
            <Text>{new Date(transactionDate).toLocaleDateString()}</Text>
            {transactionType === "credit" ? (
              <Text>{reference}</Text>
            ) : (
              <View style={tw`flex-row gap-1`}>
                <Text
                  style={[tw`text-[14px] `, { fontFamily: "Poppins-Regular" }]}
                >
                  {from}
                </Text>
                <Text
                  style={[tw`text-[14px] `, { fontFamily: "Poppins-Regular" }]}
                >
                  -
                </Text>
                <Text
                  style={[tw`text-[14px] `, { fontFamily: "Poppins-Regular" }]}
                >
                  {to}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={tw`flex-row gap-2 items-center`}>
          <Text>{transactionType === "credit" ? "+" : "-"}</Text>
          <Text style={tw`text-[16px]`}>{formatAmount(amount)}</Text>
        </View>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

export default HistoryCard;
