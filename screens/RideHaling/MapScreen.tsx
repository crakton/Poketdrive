import React from "react";
import { View } from "react-native";
import tw from "twrnc";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../../components/RideHailing/NavigateCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import Map from "../../components/Map";

const MapScreen = ({ route }: any) => {
  const stack = createNativeStackNavigator();
  const navigation = useNavigation();

  // Provide a default value for rideDetails
  const { rideDetails = {} } = route.params || {};

  return (
    <View style={{ flex: 1 }}>
      <View style={tw`z-50 absolute top-2`}>
        <HeaderWithBackButton navigation={navigation} />
      </View>

      <View style={tw`flex-1`}>
        <Map />
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
