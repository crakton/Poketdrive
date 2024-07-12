import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Payment = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, "Payment">>();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };
  const [rideDetails, setRideDetails] = useState<any>();

  const handlePayment = () => {
    axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: `${rideDetails?.creator?.id}`,
      appId: 22440,
      appToken: "0llbsX0iYcWIkLzcRFDzew",
      title: "Passenger ride request",
      message: ``,
    });
    navigation.navigate("Confirmation");
  };
  const fetchRideDetails = async () => {
    try {
      const storedDetails = await AsyncStorage.getItem("rideDetails");
      if (storedDetails) {
        // If rideDetails exist in AsyncStorage, parse and set it
        const parsedDetails = JSON.parse(storedDetails);
        setRideDetails(parsedDetails);
      }
    } catch (error) {
      console.error("Error fetching ride details:", error);
    }
  };

  useEffect(() => {
    fetchRideDetails();
  }, []);

  return (
    <View
      style={[tw`bg-[#FFFFFF] h-full`, { paddingTop: StatusBar.currentHeight }]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View>
        <HeaderWithBackButton navigation={navigation} title="Payment" />
      </View>
      <View style={tw`flex flex-row mx-5 items-center justify-end`}>
        <TouchableOpacity
          style={tw` px-5 py-2  bg-red-500 rounded-full`}
          onPress={() => navigation.navigate("WalletHome")}
        >
          <Text
            style={[tw`text-lg  text-white `, { fontFamily: "Poppins-Bold" }]}
          >
            Wallet
          </Text>
        </TouchableOpacity>
      </View>
      <View style={tw`mt-50`}>
        <View style={tw`border-b-2 pb-2 border-[#D9D9D9]`}>
          <Text
            style={[tw`text-3xl text-center`, { fontFamily: "Poppins-Bold" }]}
          >
            {formatPrice(rideDetails?.price)}
          </Text>
        </View>

        <View style={tw`border-b-2 py-3 border-[#D9D9D9]`}>
          <TouchableOpacity onPress={handlePayment}>
            <Text
              style={[tw`text-xl text-center`, { fontFamily: "Poppins-Bold" }]}
            >
              Pay with wallet
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`border-b-2 py-3 border-[#D9D9D9]`}>
          <Text
            style={[tw`text-xl text-center`, { fontFamily: "Poppins-Bold" }]}
          >
            Token/Voucher
          </Text>
        </View>
        <View
          style={tw` py-3 flex flex-row items-center gap-1 justify-center `}
        >
          <Text
            style={[
              tw`text-[16px] text-center`,
              { fontFamily: "Poppins-Light" },
            ]}
          >
            Low on funds?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddPaymentMethod")}
          >
            <Text
              style={[
                tw`text-[16px] text-center`,
                { fontFamily: "Poppins-Bold" },
              ]}
            >
              Top Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`flex flex-row mx-5 items-center justify-end`}>
        <TouchableOpacity
          style={tw` px-5 py-2`}
          onPress={() => navigation.navigate("FAQs")}
        >
          <Text style={[tw`text-lg `, { fontFamily: "Poppins-Medium" }]}>
            Need help?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({});
