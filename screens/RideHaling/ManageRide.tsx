import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import tailwind from "twrnc";
import { Icon } from "@rneui/base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../nav";
import { useGetRides } from "../../hooks/reactQuery/useSchedule";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RideCard from "../../components/RideHailing/RideCard";

const ManageRide = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "ManageTrips">
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
  }, []);

  const { data } = useGetRides(userData?.id);
  const ride = data?.content?.ride;

  return (
    <SafeAreaView
      style={[tw`bg-[#FFFFFF] flex-1`, { paddingTop: StatusBar.currentHeight }]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={tw`flex flex-row items-center justify-between px-5 py-5 `}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="home" size={28} />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-[18px] text-gray-800`,
            { fontFamily: "Poppins-Bold" },
          ]}
        >
          Manage rides
        </Text>
        <Text>{""}</Text>
      </View>
      {ride ? (
        <RideCard ride={ride} />
      ) : (
        <Text style={tw`text-center mt-5`}>No rides available</Text>
      )}
    </SafeAreaView>
  );
};

export default ManageRide;
