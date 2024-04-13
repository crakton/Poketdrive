import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "@rneui/base";

const NavFavourite = () => {
  const data = [
    {
      id: "123",
      icon: "home",
      location: "Home",
      destination: "Code Street, London, UK",
    },
    {
      id: "456",
      icon: "briefcase",
      location: "Work",
      destination: "London Eye, London, UK",
    },
  ];
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
        )}
        renderItem={({ item: { icon, location, destination } }) => (
          <TouchableOpacity style={tw`flex-row items-center p-5`}>
            <Icon
              style={tw`p-2 bg-gray-300 rounded-full mr-4`}
              name={icon}
              type="ionicon"
              size={18}
            />
            <View>
              <Text style={tw`font-semibold text-lg`}>{location}</Text>
              <Text style={tw`text-gray-500`}>{destination}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavFavourite;

const styles = StyleSheet.create({});
