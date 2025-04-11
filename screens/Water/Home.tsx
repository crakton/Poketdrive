import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Icon } from "@rneui/base";
import tw from "twrnc";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import {
  sendSvg,
  orderSvg,
  rateSvg,
  helpSvg,
  walletSvg,
  otherSvg,
} from "../../utils/svg";
import { transactions } from "../../utils/constant";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWalletDetails } from "../../hooks/reactQuery/useWallet";

const formatBalance = (balance: number | null) => {
  if (balance === null || balance === undefined) return "Loading...";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(balance)
    .replace("NGN", "₦");
};

const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const icons = [
    { xml: sendSvg, label: "Send", screen: "TourDetails" },
    { xml: orderSvg, label: "My Orders", screen: "Order" },
    { xml: rateSvg, label: "Check Rates", screen: "OtherScreen" },
    { xml: helpSvg, label: "Help Center", screen: "OtherScreen" },
    { xml: walletSvg, label: "Wallet", screen: "OtherScreen" },
    { xml: otherSvg, label: "Others", screen: "Profile" },
  ];
  const [userData, setUserData] = useState<any>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

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

  useEffect(() => {
    fetchUserData();
  }, []);

  const { isLoading, data, refetch } = useWalletDetails(userData?.id as string);
  const balance = data?.content?.balance || 0;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserData();
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const renderTransaction = ({
    item,
  }: {
    item: {
      id: string;
      trackingNumber: string;
      status: string;
      time: string;
      icon: string;
    };
  }) => (
    <TouchableOpacity
      style={tw`border border-gray-200 rounded-[12px] h-[70px] p-3 flex-row gap-2 justify-between items-center m-1 mb-3`}
    >
      <View style={tw`flex-row gap-2 items-center`}>
        <View
          style={tw`flex justify-center items-center w-[50px] h-[50px] bg-gray-200 rounded-[10px]`}
        >
          <SvgXml xml={item.icon} />
        </View>
        <View style={tw`flex gap-1`}>
          <Text style={tw`text-[#191D31] text-[14px] pl-3 font-normal`}>
            {item.trackingNumber}
          </Text>
          <Text style={tw`text-[#A7A9B7] text-[14px] pl-3 font-normal`}>
            {item.status}
          </Text>
        </View>
      </View>

      <View>
        <Text style={tw`text-[#A7A9B7] text-[14px] font-normal`}>
          {item.time}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={tw`flex-1`}
    >
      <View style={tw`flex-1`}>
        <View style={tw`bg-[#FF6633] h-[310px] px-5`}>
          <SafeAreaView style={tw`flex-1 gap-5`}>
            <View style={tw`flex-row justify-end items-center px-3`}>
              <TouchableOpacity
                style={tw`border border-[#FFFFFF33] rounded-full h-12 w-12 flex justify-center items-center`}
              >
                <Icon
                  name="notifications-outline"
                  type="ionicon"
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
            </View>

            <View style={tw`flex px-3 gap-3`}>
              <View
                style={tw`bg-[#FFFFFF] p-4 rounded-[12px] flex-row justify-between items-center`}
              >
                <View style={tw`flex gap-2`}>
                  <Text style={tw`text-[#A7A9B7] text-[13px]`}>
                    My Balance{" "}
                  </Text>
                  <Text style={tw`text-[#000000] text-[18px] font-medium`}>
                    {formatBalance(balance)}
                  </Text>
                </View>
                <View style={tw`flex-row gap-2 items-center`}>
                  <Text style={tw`text-[#1D272F] text-[13px] font-semibold`}>
                    Top Up
                  </Text>
                  <TouchableOpacity>
                    <Icon
                      name="plussquare"
                      type="antdesign"
                      size={24}
                      color="#1D272F"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={tw`bg-[#000000] p-3 py-4 rounded-[12px] flex-row items-center`}
              >
                <Icon
                  name="search"
                  type="feather"
                  size={20}
                  color="white"
                  style={tw`mr-3`}
                />
                <TextInput
                  style={tw`flex-1 text-white`}
                  placeholder="Enter track number"
                  placeholderTextColor="#A7A9B7"
                />
                <TouchableOpacity>
                  <Icon
                    name="scan1"
                    type="antdesign"
                    size={20}
                    color="white"
                    style={tw`ml-3`}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>

        <View style={tw`p-5 flex gap-3`}>
          <Text style={tw`text-[#191D31] text-[16px] pl-3 font-semibold`}>
            Features
          </Text>
          <View style={tw`flex flex-wrap flex-row justify-between`}>
            {icons.map((item, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate(item.screen as any)}
                key={index}
                style={tw`border border-gray-300 w-[109px] rounded-[12px] h-[82px] p-3 flex gap-2 items-center justify-center m-1 mb-3`}
              >
                <SvgXml xml={item.xml} />
                <Text style={tw`text-[#191D31] text-[12px] font-semibold`}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={tw`px-5 flex `}>
          <Text style={tw`text-[#191D31] text-[16px] pl-3 font-normal`}>
            Recent transactions
          </Text>
          <FlatList
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={(item) => item.id}
            style={tw`mt-1`}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
