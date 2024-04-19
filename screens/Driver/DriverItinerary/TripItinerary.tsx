import React from "react";
import {
  FlatList,
  Linking,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tailwind from "twrnc";
import { Button, Icon } from "@rneui/base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../nav";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import TripItineraryCard from "../../../components/RideHailing/TripItineraryCard";
import { Modal } from "../../../components/modal";

interface Passenger {
  id: string;
  name: string;
  avatarUri: string;
  carDescription: string;
}

const TripItinerary = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "TripItinerary">
    >();
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [selectedPassenger, setSelectedPassenger] =
    React.useState<Passenger | null>(null);

  const phoneNumber = "1234567890"; // Replace this with the desired phone number

  const driverInfo = [
    {
      id: "1",
      name: "Abraham",
      avatarUri: "https://avatars.githubusercontent.com/u/68823331?v=4",
      carDescription: "Red Toyota Camry",
    },
    {
      id: "2",
      name: "Moses",
      avatarUri: "https://avatars.githubusercontent.com/u/68823331?v=4",
      carDescription: "Blue Toyota Corolla",
    },
    {
      id: "3",
      name: "John",
      avatarUri: "https://avatars.githubusercontent.com/u/68823331?v=4",
      carDescription: "Black Honda Accord",
    },
    {
      id: "4",
      name: "John",
      avatarUri: "https://avatars.githubusercontent.com/u/68823331?v=4",
      carDescription: "Black Honda Accord",
    },
    {
      id: "5",
      name: "John",
      avatarUri: "https://avatars.githubusercontent.com/u/68823331?v=4",
      carDescription: "Black Honda Accord",
    },
    {
      id: "6",
      name: "John",
      avatarUri: "https://avatars.githubusercontent.com/u/68823331?v=4",
      carDescription: "Black Honda Accord",
    },
  ];

  // funtion to make call
  const handlePhoneCall = () => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  };

  // Define the onDelete and onEdit functions
  const handleDelete = (item: Passenger) => {
    // Logic to handle delete action
    console.log("Delete action", item?.id);
    setSelectedPassenger(item);
    setOpenDeleteModal(true);
  };
  // Define the onDelete and onEdit functions
  const handleChat = (item: Passenger) => {
    // Logic to handle delete action
    console.log("Chat action", item?.id);
    setSelectedPassenger(item);
  };

  // Render item function for the FlatList
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={tailwind`my-5`}
      onPress={() => {
        navigation.navigate("TripItinerary");
      }}
    >
      <TripItineraryCard
        name={item?.name}
        avatarUri={item?.avatarUri}
        carDescription={item?.carDescription}
        onDelete={() => handleDelete(item)}
        onCall={handlePhoneCall}
        onChat={() => handleChat(item)}
      />
    </TouchableOpacity>
  );
  return (
    <SafeAreaView
      style={[
        tailwind`bg-[#FFFFFF] flex-1`,
        { paddingTop: StatusBar.currentHeight },
      ]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={tailwind`flex flex-row items-center justify-between px-5 py-5 `}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" type="ionicon" color="black" />
        </TouchableOpacity>
        <Text style={[tailwind`text-lg`, { fontFamily: "Poppins-Bold" }]}>
          Wuse 2 to Gwarinpa
        </Text>
        <Text>{""}</Text>
      </View>

      {/* Render the FlatList */}
      <FlatList
        data={driverInfo}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={tailwind`rounded-[1rem] bg-[#FF4E00] p-3 my-2 mx-5`}
      >
        <Text
          style={[
            tailwind`text-center text-xl text-white`,
            { fontFamily: "Poppins-Bold" },
          ]}
        >
          Start Trip
        </Text>
      </TouchableOpacity>

      {/* modal to delete a passenger */}
      <Modal isOpen={openDeleteModal}>
        <View style={tailwind`bg-white p-4 w-full rounded-xl`}>
          <Pressable
            onPress={() => {
              setOpenDeleteModal(false);
            }}
          >
            <Text style={[tailwind` `, { fontFamily: "Poppins-Bold" }]}>
              Close
            </Text>
            <View>
              <Icon
                name="trash-outline"
                type="ionicon"
                style={tailwind` rounded-lg `}
                color={"black"}
              />

              <Text
                style={[
                  tailwind` px-10 text-center py-5 text-[16px]`,
                  { fontFamily: "Poppins-Bold" },
                ]}
              >
                Are you sure you want to delete {selectedPassenger?.name} from
                this Trip?
              </Text>
              <View
                style={tailwind`flex flex-row items-center justify-center gap-10`}
              >
                <TouchableOpacity
                  style={tailwind` rounded-full bg-green-600 p-1`}
                >
                  <Icon
                    name="checkmark-outline"
                    type="ionicon"
                    color="white"
                    size={50}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={tailwind` rounded-full bg-red-600 p-1`}
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
      {/* Modal for Payment recived from passenger*/}
      {/* <Modal isOpen={openDeleteModal}>
        <View style={tailwind`bg-white p-4 w-full rounded-xl`}>
          <Pressable
            onPress={() => {
              setOpenDeleteModal(false);
            }}
          >
            <Text style={[tailwind` `, { fontFamily: "Poppins-Bold" }]}>
              Close
            </Text>
            <View style={tailwind`flex items-center gap`}>
              <Avatar
                size={80}
                rounded
                source={{ uri: selectedPassenger?.avatarUri }}
              />
              <View>
                <Text
                  style={[
                    tailwind` px-10 text-center pt-5 text-[16px]`,
                    { fontFamily: "Poppins-Black" },
                  ]}
                >
                  Payment Recieved
                </Text>
                <Text
                  style={[
                    tailwind` px-10 text-center pb-5 text-[16px]`,
                    { fontFamily: "Poppins-Bold" },
                  ]}
                >
                  {selectedPassenger?.name}
                </Text>
              </View>

              <View
                style={tailwind`flex flex-row items-center justify-center gap-10`}
              >
                <Button
                  color={"green"}
                  size="lg"
                  onPress={() => {
                    setOpenDeleteModal(false);
                  }}
                >
                  <Text
                    style={[
                      tailwind`text-white px-5`,
                      { fontFamily: "Poppins-Bold" },
                    ]}
                  >
                    Yes
                  </Text>
                </Button>
              </View>
            </View>
          </Pressable>
        </View>
      </Modal> */}

      {/* Modal for Trip request from passenger*/}
      {/* <Modal isOpen={openDeleteModal}>
        <View style={tailwind`bg-white p-4 w-full rounded-xl`}>
          <Pressable
            onPress={() => {
              setOpenDeleteModal(false);
            }}
          >
            <Text style={[tailwind` `, { fontFamily: "Poppins-Bold" }]}>
              Close
            </Text>
            <View style={tailwind`flex items-center gap`}>
              <Text
                style={[
                  tailwind` px-10 text-center py-5 text-[16px]`,
                  { fontFamily: "Poppins-Bold" },
                ]}
              >
                You have a trip request from
              </Text>

              <Avatar
                size={80}
                rounded
                source={{ uri: selectedPassenger?.avatarUri }}
              />
              <Text
                style={[
                  tailwind` px-10 text-center py-5 text-[16px]`,
                  { fontFamily: "Poppins-Bold" },
                ]}
              >
                {selectedPassenger?.name}
              </Text>

              <View
                style={tailwind`flex flex-row items-center justify-center gap-10`}
              >
                <TouchableOpacity
                  style={tailwind` rounded-full bg-green-600 p-1`}
                >
                  <Icon
                    name="checkmark-outline"
                    type="ionicon"
                    color="white"
                    size={50}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={tailwind` rounded-full bg-red-600 p-1`}
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
      </Modal> */}

      {/* Modal for confirm Stop from passenger*/}
      {/* <Modal isOpen={openDeleteModal}>
        <View style={tailwind`bg-white p-4 w-full rounded-xl`}>
          <Pressable
            onPress={() => {
              setOpenDeleteModal(false);
            }}
          >
            <Text style={[tailwind` `, { fontFamily: "Poppins-Bold" }]}>
              Close
            </Text>
            <View style={tailwind`flex items-center gap`}>
              <Text
                style={[
                  tailwind` px-10 text-center py-5 text-[16px]`,
                  { fontFamily: "Poppins-Bold" },
                ]}
              >
                Confirm End Trip From
              </Text>

              <Avatar
                size={80}
                rounded
                source={{ uri: selectedPassenger?.avatarUri }}
              />
              <Text
                style={[
                  tailwind` px-10 text-center py-5 text-[16px]`,
                  { fontFamily: "Poppins-Bold" },
                ]}
              >
                {selectedPassenger?.name}
              </Text>

              <View
                style={tailwind`flex flex-row items-center justify-center gap-10`}
              >
                <TouchableOpacity
                  style={tailwind` rounded-full bg-green-600 p-1`}
                >
                  <Icon
                    name="checkmark-outline"
                    type="ionicon"
                    color="white"
                    size={50}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </View>
      </Modal> */}
    </SafeAreaView>
  );
};

export default TripItinerary;
