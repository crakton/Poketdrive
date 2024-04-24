import { StyleSheet, View } from "react-native";
import React from "react";
import tw from "twrnc";
import Map from "../../components/Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../../components/RideHailing/NavigateCard";
import { useNavigation } from "@react-navigation/native";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";

const MapScreen = () => {
  const stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <View>
      <View style={tw`z-50 absolute top-2 `}>
        <HeaderWithBackButton navigation={navigation} />
      </View>

      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <stack.Navigator>
          <stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
        </stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
