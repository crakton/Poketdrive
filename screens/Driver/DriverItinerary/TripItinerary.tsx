import React, { useEffect, useState } from "react";
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
import {
  useVerifyRider,
  useStartRide,
} from "../../../hooks/reactQuery/useSchedule";
import TripItineraryCard from "../../../components/RideHailing/TripItineraryCard";
import { Modal } from "../../../components/modal";
import CodeVerification from "../../../components/Driver/CodeVerification";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const { mutate } = useDeleteRider();
  const { mutate: verifyRider } = useVerifyRider();
  const { mutate: startRide } = useStartRide();
  const { data, isSuccess, refetch } = useGetRequest(tripId as string);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [confirmModal, setConfirmModal] = React.useState(false);
  const [selectedPassenger, setSelectedPassenger] =
    React.useState<Passenger | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const requestedRiders = data?.content?.riders;
  const phoneNumber = "1234567890";
  const handlePhoneCall = () => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  };
  const handleNavigation = () => {
    navigation.navigate("EndTrip");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("userData");
        if (jsonValue !== null) {
          const parsedData = JSON.parse(jsonValue);
          setUserData(parsedData);
        }
      } catch (e) {
        console.log("Error fetching user data:", e);
      }
    };

    fetchUserData();
  }, []);

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
              setIsLoading(false);
              Alert.alert("Success", "Rider deleted successfully!");
              refetch();
            } else {
              Alert.alert("Error", "Failed to delete rider.");
              setIsLoading(false);
            }
          },
          onError: (error) => {
            console.log("Error Response:", error);
            setIsLoading(false);
            Alert.alert(
              "Error",
              "Failed to delete rider. Please try again later."
            );
          },
        }
      );
    }
  };
  const [successModal, setSuccessModal] = useState(false);
  const handleVerify = (code: string) => {
    const numericCode = parseInt(code, 10);
    if (selectedItem) {
      setIsLoading(true);
      console.log(numericCode, tripId, selectedItem.id);

      verifyRider(
        {
          rideId: tripId,
          userId: selectedItem.id,
          code: numericCode,
        },
        {
          onSuccess: (data) => {
            if (data.success) {
              console.log("Success Response:", data);
              setConfirmModal(false);
              setIsLoading(false);
              setSuccessModal(true);
              refetch();
            } else {
              Alert.alert("Error", "Failed to verify rider.");
              setIsLoading(false);
            }
          },
          onError: (error) => {
            setIsLoading(false);
            Alert.alert(
              "Error",
              "Failed to verify rider. Please try again later."
            );
          },
        }
      );
    }
  };
  const handleStart = () => {
    startRide(
      {
        driverID: userData.id,
        rideID: tripId,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            Alert.alert("Success", "Rider deleted successfully!");
            handleNavigation();
          } else {
            Alert.alert("Error", "Start Trip.");
            setIsLoading(false);
          }
        },
        onError: (error) => {
          console.log("Error Response:", error);
          setIsLoading(false);
          console.log(userData.id, tripId);
          Alert.alert(
            "Error",
            "Failed to delete rider. Please try again later."
          );
        },
      }
    );
  };
  const handleConfirm = (item: Passenger) => {
    setSelectedItem(item);
    setConfirmModal(true);
  };

  const handleDeleteModal = (item: Passenger) => {
    setSelectedItem(item);
    setOpenDeleteModal(true);
  };
  const handleResendCode = () => {};

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
        isVerified={item?.isVerified} // Pass the verification status
      />
    </TouchableOpacity>
  );
  const [code, setCode] = useState("");
  const handleVerifyButtonClick = () => {
    if (!isNaN(Number(code))) {
      handleVerify(code);
    } else {
      Alert.alert("Invalid Code", "Please enter a valid numeric code.");
    }
  };

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
        onPress={handleStart}
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

              <CodeVerification code={code} setCode={setCode} />

              <View style={tailwind`flex flex-row items-center`}>
                <Text style={tailwind`px-1 text-center py-5 text-[13px]`}>
                  Didn’t receive code?{" "}
                </Text>
                <TouchableOpacity onPress={handleResendCode}>
                  <Text style={tailwind`text-[#F25B3E] font-semibold`}>
                    Resend Code
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={handleVerifyButtonClick}
                style={tailwind`bg-[#F25B3E] w-full rounded-[12px] flex justify-center items-center`}
              >
                <Text
                  style={[
                    tailwind`px-1 text-center py-5 text-[24px] py-4 text-white font-bold`,
                  ]}
                >
                  Verify
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </Modal>
      {/* // Success Modal after verification */}
      <Modal isOpen={successModal}>
        <View style={tailwind`bg-white p-6 w-full rounded-xl items-center`}>
          <Icon
            name="checkmark-circle-outline"
            type="ionicon"
            color="green"
            size={80}
          />
          <Text
            style={[tailwind`text-xl mt-4`, { fontFamily: "Poppins-Bold" }]}
          >
            Rider Verified!
          </Text>
          <TouchableOpacity
            style={tailwind`rounded-[1rem] bg-[#F25B3E] p-3 mt-5 w-full`}
            onPress={() => setSuccessModal(false)}
          >
            <Text
              style={[
                tailwind`text-center text-xl text-white`,
                { fontFamily: "Poppins-Bold" },
              ]}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default TripItinerary;
