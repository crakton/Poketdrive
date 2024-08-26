import React, { useState } from "react";
import {
  Alert,
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
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import { useGetRequest } from "../../../hooks/reactQuery/useSchedule";
import { useDeleteRider } from "../../../hooks/reactQuery/useSchedule";
import TripItineraryCard from "../../../components/RideHailing/TripItineraryCard";
import { Modal } from "../../../components/modal";
import CodeVerification from "../../../components/Driver/CodeVerification";

interface Passenger {
  id: string;
  name: string;
  avatarUri: string;
  carDescription: string;
}
type TripItineraryRouteProp = RouteProp<AuthStackParamList, "TripItinerary">;

const TripItinerary = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "TripItinerary">
    >();
  const route = useRoute<TripItineraryRouteProp>();

  const [trip, setTrip] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<Passenger | null>(null);
  const { tripId } = route.params || {};
  const { mutate, isPending } = useDeleteRider();
  const { data, isSuccess, refetch } = useGetRequest(tripId as string);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [confirmModal, setConfirmModal] = React.useState(false);
  const [selectedPassenger, setSelectedPassenger] =
    React.useState<Passenger | null>(null);

  const requestedRiders = data?.content?.riders;
  // console.log(requestedRiders);

  const phoneNumber = "1234567890"; // Replace this with the desired phone number

  // funtion to make call
  const handlePhoneCall = () => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  };

  // Define the onDelete and onEdit functions
  const handleDelete = () => {
    if (selectedItem) {
      // Start loading
      setIsLoading(true);

      mutate(
        {
          rideId: tripId,
          riderId: selectedItem.id,
        },
        {
          onSuccess: (data) => {
            if (data.success) {
              console.log("Success Response:", data);
              setOpenDeleteModal(false);
              setIsLoading(false); // Stop loading on success
              Alert.alert("Success", "Rider deleted successfully!");
              refetch();
            } else {
              Alert.alert("Error", "Failed to delete rider.");
              setIsLoading(false); // Stop loading on failure
            }
          },
          onError: (error) => {
            console.log("Error Response:", error); // Log the error
            setIsLoading(false); // Stop loading on error
            Alert.alert(
              "Error",
              "Failed to delete rider. Please try again later."
            );
          },
        }
      );
    }
  };
  const handleConfirm = (item: Passenger) => {
    setSelectedItem(item);
    setConfirmModal(true);
  };
  const handleDeleteModal = (item: Passenger) => {
    setSelectedItem(item);
    setOpenDeleteModal(true);
  };
  const handleResendCode = () => {
    // Logic for resending the code
  };

  const handleChat = (item: Passenger) => {
    console.log("Chat action", item?.id);
    setSelectedPassenger(item);
  };

  // Render item function for the FlatList
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={tailwind`my-3`}
      onPress={() => handleConfirm(item)}
    >
      <TripItineraryCard
        name={item?.name}
        avatarUri="https://avatars.githubusercontent.com/u/68823331?v=4"
        carDescription={item?.email}
        onDelete={() => handleDeleteModal(item)}
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
        data={requestedRiders}
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
                // style={tailwind` rounded-lg `}
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
                  style={tailwind` rounded-sm bg-green-600 py-2 px-5`}
                  onPress={handleDelete}
                >
                  <Text style={tailwind`text-white font-bold`}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tailwind` rounded-sm bg-red-600 py-2 px-5`}
                  onPress={() => {
                    setOpenDeleteModal(false);
                  }}
                >
                  <Text style={tailwind`text-white font-bold`}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </View>
      </Modal>
      {/* Modal for Trip request from passenger */}
      <Modal isOpen={confirmModal}>
        <View style={tailwind`bg-white pb-0 pt-4  w-full rounded-xl`}>
          <Pressable>
            <TouchableOpacity
              onPress={() => {
                setConfirmModal(false);
              }}
            >
              <Text style={[tailwind` px-4`, { fontFamily: "Poppins-Bold" }]}>
                Close
              </Text>
            </TouchableOpacity>

            <View style={tailwind`flex items-center gap`}>
              <View
                style={tailwind`flex justify-center items-center  w-[50%] gap-2 pb-3`}
              >
                <Icon
                  name="chatbox-ellipses"
                  type="ionicon"
                  color="black"
                  size={30}
                />
                <Text
                  style={[
                    tailwind` text-[16px]`,
                    { fontFamily: "Poppins-Bold" },
                  ]}
                >
                  Security Check
                </Text>
                <Text
                  style={[
                    tailwind` text-[14px] text-gray-600 text-center`,
                    { fontFamily: "Poppins-Normal" },
                  ]}
                >
                  Enter the code we’ve sent to {selectedPassenger?.name}
                </Text>
              </View>

              <CodeVerification />
              <View style={tailwind`flex flex-row items-center`}>
                <Text style={[tailwind`px-1 text-center py-5 text-[13px]`, ,]}>
                  Didn’t receive code?{" "}
                </Text>
                <TouchableOpacity onPress={handleResendCode}>
                  <Text
                    style={{ color: "#F25B3E", fontFamily: "Poppins-SemiBold" }}
                  >
                    Resend Code
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={tailwind`bg-[#F25B3E] w-full rounded-[12px] flex justify-center items-center`}
              >
                <Text
                  style={[
                    tailwind`px-1 text-center py-5 text-[24px] py-4 text-white font-bold `,
                    ,
                  ]}
                >
                  Verify
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default TripItinerary;
