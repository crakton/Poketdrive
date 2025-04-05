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
import { useGetOrdersFrom } from "../../hooks/reactQuery/useWater";

const FromMe = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const { data: ordersData, isLoading, isError } = useGetOrdersFrom();

  if (isLoading) {
    return <Text style={tw`text-center text-gray-500`}>Loading...</Text>;
  }

  if (isError) {
    return (
      <Text style={tw`text-center text-red-500`}>Error fetching orders.</Text>
    );
  }

  const ordersFrom = ordersData?.content?.data || [];

  const filteredOrders =
    selectedFilter === "All"
      ? ordersFrom
      : ordersFrom.filter((order: any) => order.status === selectedFilter);

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        ListHeaderComponent={
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`p-4`}
          >
            {["All", "pending", "On Process", "Delivered", "Cancelled"].map(
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
              <SvgXml xml={item.icon || orderSvg} />
            </View>
            <View style={tw`ml-4 flex-1 gap-1`}>
              <Text style={tw`text-black font-semibold text-[13px]`}>
                {item.senderInfo?.description ||
                  "Order description not available"}
              </Text>
              <Text style={tw`text-gray-500 text-[12px]`}>
                {item.senderInfo?.pickupAddress ||
                  "Pickup address not available"}
              </Text>
            </View>
            <Text
              style={[
                tw`font-medium text-[11px]`,
                { color: getStatusColor(item.status) },
              ]}
            >
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

// Utility function to return a status color based on the order status
const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "orange";
    case "On Process":
      return "blue";
    case "Delivered":
      return "green";
    case "Cancelled":
      return "red";
    default:
      return "gray";
  }
};

export default FromMe;
