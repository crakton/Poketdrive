import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountVerification = () => {
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

  return (
    <View>
      <View
        style={tw`h-[202px] bg-[#F25B3E] relative flex justify-center items-center`}
      >
        <View style={tw`absolute top-[75%] justify-center items-center`}>
          <Image source={require("../../assets/Profile.png")} />
        </View>
      </View>
      <View style={tw`mt-[50]  justify-center items-center `}>
        <Text style={[tw` text-[14px]`, { fontFamily: "Poppins-SemiBold" }]}>
          {userData?.firstName}
        </Text>
        <Text style={[tw` text-[14px]`, { fontFamily: "Poppins-Regular" }]}>
          {userData?.email}
        </Text>
      </View>
    </View>
  );
};

export default AccountVerification;

const styles = StyleSheet.create({});
