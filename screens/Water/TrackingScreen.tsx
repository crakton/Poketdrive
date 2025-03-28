import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import Map from "../../components/Map";

const isValidCoordinates = (coords: string | any[]) =>
  Array.isArray(coords) && coords.length === 2;

interface TrackingScreenProps {
  origin: [number, number];
  destination: [number, number];
}

const TrackingScreen: React.FC<TrackingScreenProps> = ({
  origin,
  destination,
}) => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-4 py-3`}>
        <TouchableOpacity>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-semibold text-black`}>
          Detail Location
        </Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Map Section */}
      <View style={tw`h-2/5`}>
        {isValidCoordinates(origin) && isValidCoordinates(destination) ? (
          <Map
            origin={{ latitude: origin[0], longitude: origin[1] }}
            destination={{
              latitude: destination[0],
              longitude: destination[1],
            }}
          />
        ) : (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text>No valid location data available.</Text>
          </View>
        )}
      </View>

      {/* Info Section */}
      <View style={tw`px-6 pt-4`}>
        <Text style={tw`text-lg font-semibold text-black`}>
          Your <Text style={tw`text-green-600`}>Package</Text> on The Way
        </Text>
        <Text style={tw`text-gray-500 mt-1`}>
          Arriving at pick up point in 2 mins
        </Text>

        {/* Driver Details */}
        <View
          style={tw`flex-row justify-between items-center mt-4 border-b pb-4`}
        >
          <View>
            <Text style={tw`text-black font-medium`}>Harry Johnson</Text>
            <View style={tw`flex-row items-center mt-1`}>
              <MaterialIcons name="star" size={16} color="green" />
              <Text style={tw`text-gray-700 ml-1`}>4.9</Text>
            </View>
          </View>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity style={tw`mr-4`}>
              <Feather name="phone" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="message-circle" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Locations */}
        <View style={tw`mt-4`}>
          <View style={tw`flex-row items-center mb-2`}>
            <MaterialIcons name="location-on" size={20} color="green" />
            <Text style={tw`ml-2 text-black`}>
              1213 Washington Blvd, Belpre, OH
            </Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <MaterialIcons name="location-on" size={20} color="black" />
            <Text style={tw`ml-2 text-black`}>121 Pike St, Marietta, OH</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TrackingScreen;
