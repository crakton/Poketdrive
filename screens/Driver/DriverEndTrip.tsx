import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import tw from "twrnc";
import Map from "../../components/Map";
import RideVerification from "../../components/Extras/RideVerification";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEndRide } from "../../hooks/reactQuery/useSchedule";
import { Icon } from "@rneui/base";

type DriverEndTripRouteProp = RouteProp<AuthStackParamList, "DriverEndTrip">;
type DriverEndTripNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "DriverEndTrip"
>;

const DriverEndTrip: React.FC = () => {
  const { mutate: endRide } = useEndRide();
  const route = useRoute<DriverEndTripRouteProp>();
  const { rideData } = route.params || {};

  const destination =
    rideData?.content?.rideDetails?.destination?.location?.coordinates;
  const destinationDetails = rideData?.content?.rideDetails?.destination;
  const origin = rideData?.content?.rideDetails?.origin?.location?.coordinates;
  const rideId = rideData?.content?.rideDetails?.IDs;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useNavigation<DriverEndTripNavigationProp>();

  const handleNavigation = () => {
    navigation.navigate("ManageTrips");
  };

  const [originLocation, setOriginLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const handleEnd = () => {
    if (!rideData) {
      Alert.alert("Error", "Ride data is missing.");
      return;
    }

    endRide(
      {
        driverID: rideId?.driverID,
        rideID: rideId?.rideID,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            Alert.alert("Success", "Ride ended successfully!");
            handleNavigation();
          } else {
            Alert.alert("Error", "Failed to end ride.");
            setIsLoading(false);
          }
        },
        onError: (error) => {
          console.log("Error Response:", error);
          setIsLoading(false);
          Alert.alert("Error", "Failed to end ride. Please try again later.");
        },
      }
    );
  };

  // if (loading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  return (
    <View style={{ flex: 1 }}>
      <View style={tw`z-50 absolute top-8`}>
        <HeaderWithBackButton navigation={navigation} />
      </View>
      <View style={tw`h-[65%]`}>
        {origin && destination && (
          <Map
            origin={{
              latitude: origin.lat,
              longitude: origin.lng,
            }}
            destination={{
              latitude: destination.lat,
              longitude: destination.lng,
            }}
          />
        )}
      </View>
      <View style={tw`h-[35%]`}>
        <View>
          <TouchableOpacity
            style={[styles.container, styles.cardContainer]}
            onPress={handleEnd}
          >
            <Text
              style={[
                tw`text-[15px] text-white`,
                { fontFamily: "Poppins-SemiBold" },
              ]}
            >
              End Trip
            </Text>
          </TouchableOpacity>
          <View style={tw`h-[43px] items-center justify-center`}>
            <Text
              style={[
                tw`text-[14px] text-black`,
                { fontFamily: "Poppins-Regular" },
              ]}
            >
              9.0km to destination | Est time 20min
            </Text>
          </View>
          <TouchableOpacity
            style={tw`bg-[#E3E3E3] h-[53px] items-center justify-between flex-row rounded-[2] px-3 pr-5`}
          >
            <Icon
              name="arrowright"
              color="white"
              type="antdesign"
              style={tw`p-1 bg-[#FF4E00] rounded-full`}
            />
            <Text
              style={[
                tw`px-[80] text-[17px]`,
                { fontFamily: "Poppins-Regular" },
              ]}
            >
              {destinationDetails?.name}
            </Text>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`h-[53px] items-center justify-center flex-row rounded-[2]`}
          >
            <Text
              style={[
                tw`px-[10] text-[12px]`,
                { fontFamily: "Poppins-Medium" },
              ]}
            >
              Trip summary
            </Text>
            <Icon
              name="sharealt"
              color="black"
              type="antdesign"
              style={tw`rounded-full h-[30px]`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-[#FF4E00] items-center h-[63px] justify-center flex-row mx-[40] rounded-[5]`}
          >
            <Text
              style={[
                tw`px-[80] text-[17px] text-white`,
                { fontFamily: "Poppins-Regular" },
              ]}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DriverEndTrip;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#65B741",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
  container: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
});
