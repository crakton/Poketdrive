import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import Map from "../../components/Map";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../types";

const isValidCoordinates = (coords: { latitude: number; longitude: number }) =>
  coords &&
  typeof coords.latitude === "number" &&
  typeof coords.longitude === "number";

interface TrackingScreenProps {
  origin?: { latitude: number; longitude: number };
  destination?: { latitude: number; longitude: number };
}

const TrackingScreen: React.FC<TrackingScreenProps> = ({}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "TrackingScreen">>();
  const { order } = route.params;
  useEffect(() => {
    console.log("Received order data:", order);
  }, [order]);
  const origin = {
    latitude: order?.tracking?.senderCordinates?.lat || 0,
    longitude: order?.tracking?.senderCordinates?.lng || 0,
  };

  const destination = {
    latitude: order?.tracking?.receiverCordinates?.lat || 0,
    longitude: order?.tracking?.receiverCordinates?.lng || 0,
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Fixed Header */}
      <View style={tw`flex-row items-center justify-between px-4 py-3`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-semibold text-[14px] text-black`}>
          Detail Location
        </Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={tw`flex-grow`}>
        <View style={tw`h-4/7`}>
          {isValidCoordinates(origin) && isValidCoordinates(destination) ? (
            <Map origin={origin} destination={destination} />
          ) : (
            <View style={tw`flex-1 justify-center items-center`}>
              <Text>No valid location data available.</Text>
            </View>
          )}
        </View>

        {/* Info Section */}
        <View style={tw`px-6 pt-4 flex gap-1`}>
          <Text style={tw`text-lg font-semibold text-black`}>
            Your <Text style={tw`text-[#0CCC70]`}>Package</Text> on The Way
          </Text>
          <Text style={tw`text-gray-500 mt-1`}>
            Estimated delivery in {order?.estimatedDeliveryDays} days
          </Text>
          <View style={tw`w-full h-[1px] bg-gray-200 mt-4`} />

          {/* Driver Details */}
          <View
            style={tw`flex-row justify-between items-center mt-4 border-gray-200 border-b pb-4  pl-[20%]`}
          >
            <View>
              <Text style={tw`text-black font-medium`}>Harry Johnson</Text>
              <View style={tw`flex-row items-center mt-1`}>
                <MaterialIcons name="star" size={16} color="#0CCC70" />
                <Text style={tw`text-gray-500 ml-1`}>4.9</Text>
              </View>
            </View>
            <View style={tw`flex-row items-center gap-4`}>
              <TouchableOpacity style={tw`mr-4`}>
                <MaterialIcons name="phone" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="message" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Location Details */}
          <View style={tw`mt-4`}>
            <View style={tw`flex-row items-center mb-1`}>
              <MaterialIcons name="adjust" size={20} color="#0CCC70" />
              <Text style={tw`ml-2 text-black`}>
                {order?.senderInfo?.pickupAddress}
              </Text>
            </View>

            <View style={tw`ml-[9px] h-4 border-l border-gray-500 `} />

            <View style={tw`flex-row items-center mt-1`}>
              <MaterialIcons name="location-on" size={20} color="black" />
              <Text style={tw`ml-2 text-black`}>
                {order?.receiversInfo?.receiversAddress}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrackingScreen;
