import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../nav";
import DriverCard from "../../components/RideHailing/DriverCard";
import { useGetRides } from "../../hooks/reactQuery/useSchedule";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  // Transform the trip data to the structure needed by the DriverCard
  const transformTripData = (trip: any) => ({
    fromLocation: trip?.origin || "Unknown Origin", // Adjusting as per your data structure
    fromDescription: trip?.origin || "Unknown Origin",
    toLocation: trip?.destination || "Unknown Destination",
    toDescription: trip?.destination || "Unknown Destination",
    driverName: trip?.creator?.name || "Unknown Driver",
    carDescription: `Luggage Type: ${trip?.LuggageType || "Not specified"}`,
    price: trip?.price?.toString() || "0",
    rideId: trip?.mainID || "N/A",
    seatsTaken: (trip?.totalCapacity || 0) - (trip?.remainingCapacity || 0),
    isEmpty: trip?.remainingCapacity === trip?.totalCapacity,
    onDelete: () => {
      // Add your delete logic here
    },
    onEdit: () => {
      // Add your edit logic here
    },
  });

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={tw`my-5`}
      onPress={() => {
        navigation.navigate("TripItinerary", {
          tripId: item.mainID,
        });
      }}
    >
      <DriverCard departure_time={""} {...transformTripData(item)} />
    </TouchableOpacity>
  );

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
      {data?.content?.ride ? (
        <FlatList
          data={data.content.ride} // Accessing the array of rides
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={tw`text-center mt-5`}>No rides available</Text>
      )}
    </SafeAreaView>
  );
};

export default ManageRide;

const styles = StyleSheet.create({});
