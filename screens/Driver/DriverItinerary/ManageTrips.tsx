import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../../nav";
import tw from "twrnc";
import { Button, Icon } from "@rneui/base";
import DriverCard from "../../../components/RideHailing/DriverCard";
import { Modal } from "../../../components/modal";
import { useManageRide } from "../../../hooks/reactQuery/useSchedule";
import { useDeleteRide } from "../../../hooks/reactQuery/useSchedule";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define CardProps interface with appropriate types
interface CardProps {
  departure_time: string;
  fromLocation: string;
  fromDescription: string;
  toLocation: string;
  toDescription: string;
  driverName: string;
  rideId: string;
  carDescription: string;
  price: string;
  seatsTaken: number;
  onDelete: () => any;
  onEdit: () => void;
  isEmpty: boolean;
}

const ManageTrips = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "ManageTrips">
    >();

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [tripsData, setTripsData] = useState<any[]>([]); // Ensure tripsData is properly typed
  const { mutate, isPending } = useManageRide();
  const { mutate: deleteRideMutate } = useDeleteRide();
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  // Render function for FlatList items
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={tw`my-5`}
      onPress={() => navigation.navigate("TripItinerary")}
    >
      <DriverCard {...transformTripData(item)} />
    </TouchableOpacity>
  );

  // Format departure time function
  const formatDepartureTimeAlt = (departureTime: string) => {
    const departureDate = new Date(departureTime);
    const now = new Date();

    // Function to check if dates are the same day
    const isSameDay = (date1: Date, date2: Date) =>
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();

    // Function to check if date is tomorrow
    const isTomorrow = (date: Date) => {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return isSameDay(date, tomorrow);
    };

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    if (isSameDay(departureDate, now)) {
      return `Today at ${departureDate.toLocaleTimeString("en-US", options)}`;
    }

    if (isTomorrow(departureDate)) {
      return `Tomorrow at ${departureDate.toLocaleTimeString(
        "en-US",
        options
      )}`;
    }

    return `${departureDate.toLocaleDateString(
      "en-GB"
    )} at ${departureDate.toLocaleTimeString("en-US", options)}`;
  };

  // Transform trip data function to match CardProps interface
  const transformTripData = (trip: any): CardProps => ({
    departure_time: formatDepartureTimeAlt(trip.departure_time),
    fromLocation: trip?.origin.name,
    fromDescription: trip?.origin.name,
    toLocation: trip?.destination.name,
    toDescription: trip?.destination.name,
    driverName: trip?.creator,
    carDescription: `Luggage Type: ${trip.luggage_type}`,
    price: trip?.price?.toString(),
    rideId: trip?.mainID,
    seatsTaken: trip?.total_capacity - trip?.remaining_capacity,
    onDelete: () => {
      setSelectedTripId(trip?.mainID);
      setOpenDeleteModal(true);
      console.log(selectedTripId);
    },
    onEdit: () => handleEdit(trip),
    isEmpty: trip?.remaining_capacity === trip?.total_capacity,
  });
  // console.log(trip, "trip");
  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("userData");
        if (jsonValue !== null) {
          const parsedData = JSON.parse(jsonValue);
          setUserData(parsedData);
          handleContinue(parsedData); // Call handleContinue with parsed user data
        }
      } catch (e) {
        console.log("Error fetching user data:", e);
      }
    };

    fetchUserData();
  }, []);

  // Handle continue function after fetching user data
  const handleContinue = async (userData: any) => {
    if (!userData) {
      return;
    }

    // Mutate trips data based on user email
    mutate(
      {
        email: userData.email,
      },
      {
        onSuccess: (data) => {
          setTripsData(data.content);
        },
        onError: () => {
          Alert.alert("Error", "Failed to schedule ride");
        },
      }
    );
  };

  // Handle delete trip function
  const handleDelete = async () => {
    if (!selectedTripId) return;
    deleteRideMutate(
      { id: selectedTripId },
      {
        onSuccess: async () => {
          Alert.alert("Success", "Trip deleted successfully");
          setOpenDeleteModal(false);
          setSelectedTripId(null);
          const jsonValue = await AsyncStorage.getItem("userData");
          if (jsonValue !== null) {
            const userData = JSON.parse(jsonValue);

            handleContinue(userData);
          }
        },
        onError: () => {
          Alert.alert("Error", "Failed to delete trip");
        },
      }
    );
  };

  // Handle edit trip function
  const handleEdit = (item: any) => {
    setOpenEditModal(true);
    // Implement edit logic here if needed
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
        data={tripsData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Modal for delete trip */}
      <Modal isOpen={openDeleteModal}>
        <View style={tw`bg-white p-4 w-full rounded-xl`}>
          <Pressable
            onPress={() => {
              setOpenDeleteModal(false);
              setSelectedTripId(null); // Clear selected trip ID on cancel
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
                <TouchableOpacity
                  style={tw` rounded-full bg-green-600 p-1`}
                  onPress={() => handleDelete()} // Call handleDelete here
                >
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
                    setSelectedTripId(null); // Clear selected trip ID on cancel
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

      {/* Modal for edit trip */}
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
