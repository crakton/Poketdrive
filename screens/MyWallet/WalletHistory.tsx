import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWalletHistory } from "../../hooks/reactQuery/useWallet";
import Loader from "../../components/loader/Loader";

const WalletHistory = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("userData");
        if (jsonValue !== null) {
          const parsedData = JSON.parse(jsonValue);
          setUserData(parsedData);
        }
      } catch (e) {
        console.log("Error fetching user data:", e);
      }
    };

    fetchUserData();
  }, [setUserData]);

  const { isLoading, data } = useWalletHistory(userData?.id as string);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }

  return (
    <View
      style={[tw`bg-[#FFFFFF] h-full`, { paddingTop: StatusBar.currentHeight }]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <HeaderWithBackButton navigation={navigation} />
      <View style={tw`flex-row mb-2 mx-5 -mt-5`}>
        <View>
          <Text style={[tw`text-[25px]`, { fontFamily: "Poppins-SemiBold" }]}>
            Detail Activity
          </Text>
        </View>
      </View>

      <CardDetails />

      {/* Transaction Details */}
      <View style={tw`px-5`}>
        <View style={tw`flex-row items-center justify-between mb-2`}>
          <Text style={[tw`text-[18px]`, { fontFamily: "Poppins-SemiBold" }]}>
            Recent Transaction
          </Text>
          {/* <TouchableOpacity>
            <Text
              style={[
                tw`underline text-gray-500`,
                { fontFamily: "Poppins-Medium" },
              ]}
            >
              See All
            </Text>
          </TouchableOpacity> */}
        </View>
        <View style={tw`pb-[400px] h-full`}>
          <FlatList
            data={data.content}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <HistoryCard
                transactionDate={item.data.transactionDate}
                from="Source"
                to="Destination"
                amount={item.data.amount}
                status={item.data.status}
                transactionType={item.transactionType}
                reference={item.data.reference}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default WalletHistory;
