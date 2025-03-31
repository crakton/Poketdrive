import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import tw from "twrnc";
import { SvgXml } from "react-native-svg";
import { orderSvg } from "../../utils/svg";

const FromMe = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const orders = [
    {
      id: "1",
      description: "Order 1 description",
      color: "green",
      status: "Delivered",
      icon: orderSvg,
      origin: [37.7749, -122.4194],
      destination: [37.7929, -122.3969],
    },
    {
      id: "2",
      description: "Order 2 description",
      color: "orange",
      status: "Pending",
      icon: orderSvg,
      origin: [37.7749, -122.4194],
      destination: [37.8029, -122.3929],
    },
    {
      id: "3",
      description: "Order 3 description",
      color: "blue",
      status: "On Process",
      icon: orderSvg,
      origin: [37.7649, -122.4094],
      destination: [37.8129, -122.3829],
    },
    {
      id: "4",
      description: "Order 4 description",
      color: "red",
      status: "Cancelled",
      icon: orderSvg,
      origin: [37.7549, -122.3994],
      destination: [37.8229, -122.3729],
    },
  ];

  const filteredOrders =
    selectedFilter === "All"
      ? orders
      : orders.filter((order) => order.status === selectedFilter);

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        ListHeaderComponent={
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`p-4`}
          >
            {["All", "Pending", "On Process", "Delivered"].map(
              (filter, index) => (
                <TouchableOpacity
                  key={index}
                  style={tw`px-4 py-2 h-9 mr-2 rounded-full ${
                    selectedFilter === filter
                      ? "bg-black"
                      : "border border-gray-300"
                  }`}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text
                    style={tw`${
                      selectedFilter === filter ? "text-white" : "text-black"
                    } font-medium`}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        }
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`border border-gray-200 rounded-[12px] h-[70px] p-3 flex-row gap-2 justify-between items-center m-1 mb-3`}
            onPress={() =>
              navigation.navigate("TrackingScreen", {
                order: item,
              })
            }
          >
            <View
              style={tw`flex justify-center items-center w-[50px] h-[50px] bg-gray-100 rounded-[10px]`}
            >
              <SvgXml xml={item.icon} />
            </View>
            <View style={tw`ml-4 flex-1 gap-1`}>
              <Text style={tw`text-black font-semibold text-[13px]`}>
                {item.description}
              </Text>
              <Text style={tw`text-gray-500 text-[12px]`}>
                {item.description}
              </Text>
            </View>
            <Text style={[tw`font-medium text-[11px]`, { color: item.color }]}>
              {item.status}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={tw`text-center text-gray-500`}>No orders found</Text>
        }
      />
    </View>
  );
};

export default FromMe;
