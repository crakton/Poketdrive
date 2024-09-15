import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRequestRide } from "../../hooks/reactQuery/useTrips";

const Payment = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, "Payment">>();
  const { data, mutate } = useRequestRide();
  const [rideDetails, setRideDetails] = useState<any>();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const storedDetails = await AsyncStorage.getItem("rideDetails");
        if (storedDetails) {
          setRideDetails(JSON.parse(storedDetails));
        }
      } catch (error) {
        console.error("Error fetching ride details:", error);
      }
    };

    fetchRideDetails();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("userData");
        if (jsonValue != null) {
          setUserData(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log("Error fetching user data:", e);
      }
    };

    fetchUserData();
  }, []);
  console.log(rideDetails?.id);

  const handlePayment = () => {
    setLoading(true);

    mutate(
      {
        price: rideDetails?.price,
        rideId: rideDetails?.id,
        riderId: userData?.id,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            // Notify user of success
            Alert.alert("Success", "Ride scheduled successfully!");

            // Send notification
            axios
              .post(`https://app.nativenotify.com/api/indie/notification`, {
                subID: rideDetails?.creator?.id || "defaultSubID",
                appId: 22387,
                appToken: "Wl0rlWhlSiad3m2ob0v2aB",
                title: "Passenger ride request",
                message: `${userData?.firstName} ${userData?.lastName} Was sucessfully added to your ride from ${rideDetails?.origin?.name} to ${rideDetails?.destination?.name} `,
                data: {
                  screen: "ManageTrips",
                  params: {
                    rideId: "67890",
                  },
                },
              })

              .then((response) => {
                console.log("Notification sent successfully:", response.data);
                navigation.navigate("ManageRide");
              })
              .catch((error) => {
                console.error("Error sending notification:", error);
                Alert.alert("Error", "Failed to send notification");
              })
              .finally(() => {
                setLoading(false);
              });
          } else {
            setLoading(false);
            Alert.alert("Error", "Failed to schedule ride");
          }
        },
        onError: (error) => {
          setLoading(false);
          Alert.alert("Error", "Failed to schedule ride");
          console.error("Error Response:", error);
        },
      }
    );
  };

  return (
    <View
      style={[
        tw`bg-[#FFFFFF] h-full relative`,
        { paddingTop: StatusBar.currentHeight },
      ]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View>
        <HeaderWithBackButton navigation={navigation} title="Payment" />
      </View>
      <View
        style={tw`flex flex-row mx-5 items-center justify-end absolute top-20 right-0`}
      >
        <TouchableOpacity
          style={tw` px-3 py-1 bg-red-500 rounded-lg `}
          onPress={() => navigation.navigate("WalletHome")}
        >
          <Text
            style={[tw`text-[14px] text-white`, { fontFamily: "Poppins-Bold" }]}
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
            {rideDetails?.price}
          </Text>
        </View>

        <View style={tw`border-b-2 py-3 border-[#D9D9D9]`}>
          <TouchableOpacity onPress={handlePayment} disabled={loading}>
            <Text
              style={[tw`text-xl text-center`, { fontFamily: "Poppins-Bold" }]}
            >
              {loading ? "Processing..." : "Pay with wallet"}
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
        <View style={tw`py-3 flex flex-row items-center gap-1 justify-center`}>
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
          style={tw`px-5 py-2`}
          onPress={() => navigation.navigate("FAQs")}
        >
          <Text style={[tw`text-lg`, { fontFamily: "Poppins-Medium" }]}>
            Need help?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payment;
const styles = StyleSheet.create({});
