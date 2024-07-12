import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../nav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CardDetails from "../../components/MyWallet/CardDetails";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import HistoryCard from "../../components/MyWallet/HistoryCard";

const WalletHistory = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();

  // Generate dummy data for transactions
  const transactionData = Array.from({ length: 20 }, (_, index) => ({
    id: index.toString(),
    date: "22 May 2021",
    from: "Kubwa",
    to: "Lokogoma",
    amount: 2000,
  }));

  return (
    <View
      style={[tw`bg-[#FFFFFF] h-full`, { paddingTop: StatusBar.currentHeight }]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <HeaderWithBackButton navigation={navigation} />
      <View style={tw`flex-row  mb-2 mx-5 -mt-5 `}>
        <View>
          <Text style={[tw`text-[25px] `, { fontFamily: "Poppins-SemiBold" }]}>
            Detail Activity
          </Text>
        </View>
      </View>

      <CardDetails />

      {/* Transaction Details */}
      <View style={tw`px-5`}>
        <View style={tw`flex-row items-center justify-between mb-2`}>
          <Text style={[tw`text-[18px] `, { fontFamily: "Poppins-SemiBold" }]}>
            Recent Transaction
          </Text>
          <TouchableOpacity>
            <Text
              style={[
                tw`underline text-gray-500`,
                { fontFamily: "Poppins-Medium" },
              ]}
            >
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`pb-[400px] h-full`}>
          <FlatList
            data={transactionData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <HistoryCard
                date={item.date}
                from={item.from}
                to={item.to}
                amount={item.amount}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default WalletHistory;
