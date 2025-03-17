import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import tw from "twrnc";
import Map from "../../components/Map";
import RideVerification from "../../components/Extras/RideVerification";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EndTrip = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();

  // const [originLocation, setOriginLocation] = useState<{
  //   lat: number;
  //   lng: number;
  // } | null>(null);
  // const [destination, setDestination] = useState<{
  //   lat: number;
  //   lng: number;
  // } | null>(null);
  // const [rideDetails, setRideDetails] = useState<null>(null);
  // const [loading, setLoading] = useState(true);

  // const destinationName = rideDetails?.destination?.name;

  // useEffect(() => {
  //   const fetchRideDetails = async () => {
  //     try {
  //       // Retrieve saved ride details
  //       const rideDetailsString = await AsyncStorage.getItem("rideDetails");

  //       const rideDetails = rideDetailsString
  //         ? JSON.parse(rideDetailsString)
  //         : {};
  //       const destination = rideDetails?.destination?.location?.coordinates;
  //       const origin = rideDetails?.origin?.location?.coordinates;
  //       setRideDetails(rideDetails);
  //       setDestination(destination || null);
  //       setOriginLocation(origin || null);

  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching ride details: ", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchRideDetails();
  // }, []);

  // if (loading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  return (
    <View style={{ flex: 1 }}>
      <View style={tw`z-50 absolute top-8`}>
        <HeaderWithBackButton navigation={navigation} />
      </View>
      <View style={tw`h-[65%]`}>
        <Map
          origin={{
            latitude: 9.0752322,
            longitude: 7.4767315,
          }}
          destination={{
            latitude: 9.0641062,
            longitude: 7.422939500000001,
          }}
        />
      </View>
      <View style={tw`h-[35%]`}>
        <RideVerification
          destinationName={"jabi"}
          title="End Trip"
          classes={{ cardContainer: styles.cardContainer }}
          direction="TripConfirmation"
        />
      </View>
    </View>
  );
};

export default EndTrip;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#65B741",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
});
