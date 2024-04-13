import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface HistoryCardProps {
  date: string;
  from: string;
  to: string;
  amount: number;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  date,
  from,
  to,
  amount,
}) => {
  return (
    <GestureHandlerRootView>
      <TouchableOpacity
        style={tw`bg-white rounded-lg flex-row p-2 items-center justify-between mb-3`}
      >
        <View style={tw`bg-white rounded-lg flex-row p-2 items-center gap-5`}>
          <View style={tw`bg-orange-500 p-2  rounded-full`}>
            <Icon name="trending-down" type="ionicon" color="white" />
          </View>
          <View>
            <Text>{date}</Text>
            <View style={tw`flex-row gap-1`}>
              <Text style={[tw`text-[14px] `,{fontFamily:"Poppins-Regular"}]}>{from}</Text>
              <Text style={[tw`text-[14px] `,{fontFamily:"Poppins-Regular"}]}>-</Text>
              <Text style={[tw`text-[14px] `,{fontFamily:"Poppins-Regular"}]}>{to}</Text>
            </View>
          </View>
        </View>
        <View style={tw`flex-row gap-2 items-center`}>
        <Text>-</Text>
        <Text style={tw`text-[16px]`}>N{amount}</Text>
        </View>

      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

export default HistoryCard;
