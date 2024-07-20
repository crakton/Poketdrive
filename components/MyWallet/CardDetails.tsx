import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWalletDetails } from "../../hooks/reactQuery/useWallet";
import Loader from "../loader/Loader";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";

const formatBalance = (balance: number | null) => {
  if (balance === null || balance === undefined) return "Loading...";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(balance)
    .replace("NGN", "₦"); // replace 'NGN' with the currency symbol '₦'
};

const CardDetails = () => {
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserData();
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <Text>Not available</Text>;
  }

  const balance = data?.content?.balance || 0;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        <View style={[tw`rounded-[10]`, styles.container]}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../../assets/history-wallet.png")}
              style={styles.backgroundImage}
            >
              <View
                style={tw`flex flex-row items-center justify-between w-full pb-6`}
              >
                <View>
                  <Text
                    style={[
                      tw`text-white text-[4]`,
                      { fontFamily: "Poppins-Regular" },
                    ]}
                  >
                    Current Balance
                  </Text>
                  <Text style={[tw`text-white  text-[34px] font-bold`]}>
                    {formatBalance(balance)}
                  </Text>
                </View>
                <View style={tw`h-[15px] w-[40px] bg-gray-400`}></View>
              </View>
              <View
                style={tw`flex flex-row items-center justify-between w-full pt-6`}
              >
                <Text style={tw`text-white`}>{data?.content?.userId}</Text>
                <Text style={tw`text-white `}>09/12</Text>
              </View>
            </ImageBackground>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginRight: 15,
    marginLeft: 15,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  backgroundImage: {
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default CardDetails;
