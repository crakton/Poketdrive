import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../../nav";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import DriverCard from "../../../components/RideHailing/DriverCard";

const ManageTrips = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "ManageTrips">
    >();

  const handleEdit = (item: any) => {
    console.log("Edit button clicked for card index:", item);
    // Implement your edit logic here
  };

  const handleDelete = (item: any) => {
    console.log("Delete button clicked for card index:", item);
    // Implement your delete logic here
  };

  const data = [
    {
      id: 1,
      date: "Today at 1:00pm",
      location1: "Wuse",
      address1: "Wuse Zone 5, under bridge opposite NNPC",
      location2: "Area 1",
      address2: "Total Filling Station",
      driverName: "Abraham",
      carInfo: "Toyota Corolla 2021",
      price: "N 700",
      avatarUri: "https://randomuser.me/api/portraits/women/32.jpg",
      seatsNumber: 2,
    },
    {
      id: 2,
      date: "Today at 1:00pm",
      location1: "Location 1",
      address1: "Wuse Zone 5, under bridge",
      location2: "Location 2",
      address2: "Address 2",
      driverName: "John",
      carInfo: "Honda Civic 2020",
      price: "N 800",
      avatarUri: "https://randomuser.me/api/portraits/men/37.jpg",
      seatsNumber: 3,
    },
    {
      id: 3,
      date: "Today at 1:00pm",
      location1: "Location 3",
      address1: "Address 3",
      location2: "Location 4",
      address2: "Address 4",
      driverName: "Emily",
      carInfo: "Ford Mustang 2019",
      price: "N 900",
      avatarUri: "https://randomuser.me/api/portraits/women/36.jpg",
      seatsNumber: 4,
    },
  ];

  return (
    <SafeAreaView
      style={[tw`bg-[#FFFFFF] h-full`, { paddingTop: StatusBar.currentHeight }]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={tw`flex flex-row items-center justify-between px-5 py-5 `}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AccountVerification")}
        >
          <Icon name="menu" />
        </TouchableOpacity>
        <Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
          Manage trips
        </Text>
        <Text>{""}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <DriverCard
            date={item.date}
            location1={item.location1}
            address1={item.address1}
            location2={item.location2}
            address2={item.address2}
            driverName={item.driverName}
            carInfo={item.carInfo}
            price={item.price}
            avatarUri={item.avatarUri}
            seatsNumber={item.seatsNumber}
            onEdit={() => handleEdit(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </SafeAreaView>
  );
};

export default ManageTrips;

const styles = StyleSheet.create({});
