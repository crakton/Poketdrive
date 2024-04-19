// ManageTrips.tsx

import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../../nav";
import tw from "twrnc";
import { Button, Icon } from "@rneui/base";
import DriverCard from "../../../components/RideHailing/DriverCard";
import { Modal } from "../../../components/modal";

const ManageTrips = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "ManageTrips">
    >();

  // Define the data for DriverCards
  const data = [
    {
      date: "Today at 1:00pm",
      fromLocation: "Wuse",
      fromDescription: "Wuse Zone 5, under bridge opposite NNPC",
      toLocation: "Area 1",
      toDescription: "Total Filling Station",
      driverName: "Abraham",
      carDescription: "Toyota Corolla 2021",
      price: "₦700",
      seatsTaken: "2",
      isEmpty: false,
    },
    {
      date: "Tomorrow at 2:00pm",
      fromLocation: "Gwarinpa",
      fromDescription: "Gwarinpa 3rd Avenue",
      toLocation: "Wuse",
      toDescription: "Wuse Zone 5, under bridge opposite NNPC",
      driverName: "Moses",
      carDescription: "Toyota Corolla 2021",
      price: "₦700",
      seatsTaken: "1",
      isEmpty: false,
    },
    {
      date: "Tomorrow at 3:00pm",
      fromLocation: "Wuse",
      fromDescription: "Wuse Zone 5, under bridge opposite NNPC",
      toLocation: "Gwarinpa",
      toDescription: "Gwarinpa 3rd Avenue",
      driverName: "Abraham",
      carDescription: "Toyota Corolla 2021",
      price: "₦700",
      seatsTaken: "10",
      isEmpty: true,
    },
  ];

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);

  // Render each item in the FlatList using the DriverCard component
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={tw`my-5`}
      onPress={() => {
        navigation.navigate("TripItinerary");
      }}
    >
      <DriverCard
        {...item}
        onDelete={() => handleDelete(item)}
        onEdit={() => handleEdit(item)}
      />
    </TouchableOpacity>
  );

  // Function to handle deletion
  const handleDelete = (item: any) => {
    // Implement delete logic here
    setOpenDeleteModal(true);

    console.log("Deleting:", item);
  };

  // Function to handle editing
  const handleEdit = (item: any) => {
    setOpenEditModal(true);
    console.log("Editing:", item);
  };
  return (
    <SafeAreaView
      style={[tw`bg-[#FFFFFF] flex-1`, { paddingTop: StatusBar.currentHeight }]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={tw`flex flex-row items-center justify-between px-5 py-5 `}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="menu" />
        </TouchableOpacity>
        <Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
          Manage trips
        </Text>
        <Text>{""}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* modal for delete trip  */}
      <Modal isOpen={openDeleteModal}>
        <View style={tw`bg-white p-4 w-full rounded-xl`}>
          <Pressable
            onPress={() => {
              setOpenDeleteModal(false);
            }}
          >
            <Text style={[tw` `, { fontFamily: "Poppins-Bold" }]}>Close</Text>
            <View>
              <Icon
                name="trash-outline"
                type="ionicon"
                style={tw` rounded-lg `}
                color={"black"}
              />
              <Text
                style={[
                  tw` px-10 text-center py-5 text-[16px]`,
                  { fontFamily: "Poppins-Bold" },
                ]}
              >
                Are you sure you want to delete this Trip?
              </Text>
              <View
                style={tw`flex flex-row items-center justify-center gap-10`}
              >
                <TouchableOpacity style={tw` rounded-full bg-green-600 p-1`}>
                  <Icon
                    name="checkmark-outline"
                    type="ionicon"
                    color="white"
                    size={50}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw` rounded-full bg-red-600 p-1`}
                  onPress={() => {
                    setOpenDeleteModal(false);
                  }}
                >
                  <Icon
                    name="close-outline"
                    type="ionicon"
                    color="white"
                    size={50}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </View>
      </Modal>

      {/* modal for edit trip  */}
      <Modal isOpen={openEditModal}>
        <View style={tw`bg-white p-4 w-full rounded-xl`}>
          <Pressable
            onPress={() => {
              setOpenEditModal(false);
            }}
          >
            <Text style={[tw` `, { fontFamily: "Poppins-Bold" }]}>Close</Text>
            <View>
              <Icon
                name="message"
                color="black"
                type="Entypo"
                style={tw` rounded-lg `}
              />
              <Text
                style={[
                  tw` px-10 text-center py-5 text-[16px]`,
                  { fontFamily: "Poppins-Bold" },
                ]}
              >
                Are you sure you want to Edit this Trip?
              </Text>
              <View
                style={tw`flex flex-row items-center justify-center gap-10`}
              >
                <Button color={"green"} size="lg">
                  <Text
                    style={[
                      tw`text-white px-5`,
                      { fontFamily: "Poppins-Bold" },
                    ]}
                  >
                    Yes
                  </Text>
                </Button>
                <Button
                  color={"red"}
                  size="lg"
                  onPress={() => {
                    setOpenEditModal(false);
                  }}
                >
                  <Text
                    style={[
                      tw`text-white px-5`,
                      { fontFamily: "Poppins-Bold" },
                    ]}
                  >
                    No
                  </Text>
                </Button>
              </View>
            </View>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ManageTrips;
