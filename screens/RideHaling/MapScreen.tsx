import React, { useEffect } from "react";
import { View } from "react-native";
import tw from "twrnc";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../../components/RideHailing/NavigateCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import Map from "../../components/Map";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MapScreen = ({ route }: any) => {
  const stack = createNativeStackNavigator();
  const navigation = useNavigation();

  const { rideDetails = {} } = route.params || {};
  const destination = rideDetails?.destination?.location?.coordinates;
  const origin = rideDetails?.origin?.location?.coordinates;

  useEffect(() => {
    const saveRideDetails = async () => {
      try {
        await AsyncStorage.setItem("rideDetails", JSON.stringify(rideDetails));
        console.log("Ride details saved successfully");
      } catch (error) {
        console.log("Error saving ride details: ", error);
      }
    };

    saveRideDetails();
  }, [rideDetails]);
  return (
    <View style={{ flex: 1 }}>
      <View style={tw`z-50 absolute top-2`}>
        <HeaderWithBackButton navigation={navigation} />
      </View>

      <View style={tw`flex-1`}>
        <Map
          origin={{ latitude: origin.lat, longitude: origin.lng }}
          destination={{
            latitude: destination.lat,
            longitude: destination.lng,
          }}
        />
      </View>

      <View style={tw`flex-1`}>
        <stack.Navigator>
          <stack.Screen name="NavigateCard" options={{ headerShown: false }}>
            {(props) => <NavigateCard {...props} rideDetails={rideDetails} />}
          </stack.Screen>
        </stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;
