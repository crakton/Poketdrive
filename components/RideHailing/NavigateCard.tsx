import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Linking,
} from "react-native";
import tailwind from "twrnc";
import { Avatar, Icon } from "@rneui/base";
import { SvgXml } from "react-native-svg";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { IUser } from "@types/user";
import {
  markConversationAsRead,
  setActiveConversation,
  // setCurrentUserId is not a named export
} from "@redux/features/chatSlice";

type NavigateCardProps = {
  rideDetails: any; // Define the type of data you expect to receive
};

const NavigateCard: React.FC<NavigateCardProps> = ({ rideDetails }: any) => {
  console.log(rideDetails.creator.id, "data");
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, "MapScreen">>();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  useEffect(() => {
    AsyncStorage.setItem("rideDetails", JSON.stringify(rideDetails));
  }, [rideDetails]);

  const carSeatSvg = `
    <svg width="30" height="30" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6594 2.716C12.9614 4.297 12.2984 7.588 11.0714 10.593C8.96643 15.749 8.96043 15.754 5.06743 15.232C0.517429 14.622 -0.98557 16.119 0.62743 19.658C1.54643 21.674 2.41343 22 6.86543 22C11.2464 22 12.1974 21.657 13.0944 19.75C14.8934 15.926 16.2004 9.718 16.2514 4.75C16.2944 0.59 16.0424 0 14.2204 0C12.4964 0 12.2294 0.465 12.6594 2.716Z" fill="#565656"/>
    </svg>
  `;
  const carSeatSelectedSvg = `
    <svg width="30" height="30" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6594 2.716C12.9614 4.297 12.2984 7.588 11.0714 10.593C8.96643 15.749 8.96043 15.754 5.06743 15.232C0.517429 14.622 -0.98557 16.119 0.62743 19.658C1.54643 21.674 2.41343 22 6.86543 22C11.2464 22 12.1974 21.657 13.0944 19.75C14.8934 15.926 16.2004 9.718 16.2514 4.75C16.2944 0.59 16.0424 0 14.2204 0C12.4964 0 12.2294 0.465 12.6594 2.716Z" fill="#DDDD"/>
    </svg>
  `;

  const phoneNumber = "1234567890"; // Replace this with the desired phone number
  const dispatch = useAppDispatch();
  const { conversations, isConnected } = useAppSelector((state) => state.chat);
  const [userData, setUserData] = useState<IUser | null>(null);

  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const tokenValue = await AsyncStorage.getItem("token");
        const userDataStr = await AsyncStorage.getItem("userData");

        if (userDataStr) {
          const parsedUserData = JSON.parse(userDataStr);
          setUserData(parsedUserData);
          // Set current user ID in Redux store
          dispatch(setCurrentUserId(parsedUserData.id));
        }

        if (tokenValue) {
          setToken(tokenValue);
        }
      } catch (e) {
        console.log("Error fetching user data:", e);
      }
    };

    fetchUserData();
  }, [dispatch]);
  const navigateToChat = useCallback(
    (conversationId: string, recipientId: string, recipientName: string) => {
      dispatch(setActiveConversation(conversationId));
      dispatch(markConversationAsRead(conversationId));
      navigation.navigate("Message", {
        conversationId,
        recipientId,
        recipientName,
      });
    },
    [dispatch, navigation]
  );
  const initiateChat = useCallback(
    (recipientId: string, recipientName: string) => {
      if (!userData?.id) return;

      // Use existing conversation if it exists
      const existingConversation = conversations.find((c) =>
        c.participants.includes(recipientId)
      );

      if (existingConversation) {
        navigateToChat(existingConversation.id, recipientId, recipientName);
      } else {
        // For new chats, we'll create the conversationId in the format user1_user2 (sorted)
        const participants = [userData.id, recipientId].sort();
        const conversationId = participants.join("_");

        // Navigate to the chat screen, the actual chat creation will happen there
        navigateToChat(conversationId, recipientId, recipientName);
      }
    },
    [userData, conversations, navigateToChat]
  );

  const handlePhoneCall = () => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  };

  // Price formatter function
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Function to toggle seat selection
  const toggleSeatSelection = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      // If seat is already selected, remove it from the array
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      // If seat is not selected, add it to the array
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };
  console.log(rideDetails.creator.id, "rideDetails");
  return (
    <ScrollView style={tailwind`bg-white h-full flex-1`}>
      <View style={tailwind`px-5 py-5 bg-[#FFFF]`}>
        <View style={tailwind`flex flex-row justify-between`}>
          <View style={tailwind`flex flex-row`}>
            <Icon
              name="location"
              type="ionicon"
              color="green"
              style={styles.icon}
            />
            <View style={[tailwind``, { fontFamily: "Poppins-Bold" }]}>
              <Text
                style={[tailwind`text-[13px]`, { fontFamily: "Poppins-Bold" }]}
              >
                {rideDetails?.origin?.name}
              </Text>
              <Text
                style={[tailwind`text-[13px]`, { fontFamily: "Poppins-Light" }]}
              >
                {rideDetails.origin.name}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={[tailwind`text-[13px]`, { fontFamily: "Poppins-Bold" }]}
            >
              {new Date(rideDetails?.departure_time).toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={tailwind`flex flex-row justify-between mt-5`}>
          <View style={tailwind`flex flex-row`}>
            <Icon
              name="location"
              type="ionicon"
              color="red"
              style={styles.icon}
            />
            <View style={[tailwind``, { fontFamily: "Poppins-Bold" }]}>
              <Text
                style={[tailwind`text-[13px]`, { fontFamily: "Poppins-Bold" }]}
              >
                {rideDetails?.destination?.name}
              </Text>
              <Text
                style={[tailwind`text-[13px]`, { fontFamily: "Poppins-Light" }]}
              >
                {rideDetails?.destination?.name}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={[tailwind`text-[13px]`, { fontFamily: "Poppins-Bold" }]}
            >
              Est. 10:30
            </Text>
          </View>
        </View>
        <View style={tailwind`flex flex-row justify-center pt-1 items-center`}>
          <Text style={[tailwind`text-sm`, { fontFamily: "Poppins-Bold" }]}>
            {rideDetails?.remaining_capacity} Seats left
          </Text>
          <View style={styles.verticalLine} />

          <Text style={[tailwind`text-sm`, { fontFamily: "Poppins-Bold" }]}>
            {formatPrice(rideDetails?.price)} per seat
          </Text>
        </View>
        {/* <View
          style={tailwind`flex flex-row items-center justify-center gap-5 pt-5`}
        >
          <View>
            <Text style={[tailwind`text-lg`, { fontFamily: "Poppins-Bold" }]}>
              Booked
            </Text>
          </View>

          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            keyExtractor={(item, index) => index.toString()} // Change keyExtractor to use index
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => toggleSeatSelection(item)}
                style={[
                  tailwind`flex flex-row mx-1 items-center justify-center gap-5 rounded-full p-2`,
                  selectedSeats.includes(item)
                    ? tailwind`bg-[#565656]`
                    : tailwind`bg-[#DDDDDD]`,
                ]}
              >
                <SvgXml
                  xml={
                    selectedSeats.includes(item)
                      ? carSeatSelectedSvg
                      : carSeatSvg
                  }
                />
              </TouchableOpacity>
            )}
          />

          <View>
            <TouchableOpacity>
              <Icon
                name="chevron-forward-outline"
                type="ionicon"
                color="gray"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
      <TouchableOpacity
        style={tailwind`flex flex-row items-center justify-between px-5 mt-1 bg-white`}
        onPress={() => navigation.navigate("DriverDetails")}
      >
        <View
          style={tailwind`flex flex-row items-center justify-start gap-5 py-1`}
        >
          <Avatar
            size={50}
            rounded
            source={{
              uri: "https://randomuser.me/api/portraits/men/36.jpg",
            }}
          />
          <Text style={[tailwind`text-[14px]`, { fontFamily: "Poppins-Bold" }]}>
            {rideDetails?.creator?.name?.firstName}
          </Text>
        </View>
        <View>
          <TouchableOpacity>
            <Icon
              name="chevron-forward-outline"
              type="ionicon"
              color="gray"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View style={tailwind`flex px-5 mt-1 bg-white py-2 justify-center gap-3`}>
        <View style={tailwind`flex flex-row px-5 pt-1 `}>
          <Icon
            name="briefcase"
            type="ionicon"
            color="black"
            style={styles.icon}
          />
          <Text
            style={[tailwind`text-[14px]`, { fontFamily: "Poppins-Regular" }]}
          >
            {rideDetails?.luggage_type}
          </Text>
        </View>
        <View style={tailwind`flex flex-row items-center justify-start gap-5`}>
          <TouchableOpacity
            style={tailwind`rounded-[1rem] bg-[#F25B3E] py-[12px] w-[60%] my-2`}
            onPress={() => navigation.navigate("Payment")}
          >
            <Text
              style={[
                tailwind`text-center text-[16px] text-white`,
                { fontFamily: "Poppins-SemiBold" },
              ]}
            >
              Request to Book
            </Text>
          </TouchableOpacity>
          <View style={tailwind`flex flex-row gap-5`}>
            {/* <TouchableOpacity
              style={tailwind`border p-2 rounded-full bg-black`}
              onPress={handlePhoneCall}
            >
              <Icon name="call-outline" type="ionicon" color="white" />
            </TouchableOpacity> */}

            <TouchableOpacity
              style={tailwind`border p-2 rounded-full bg-black`}
              onPress={() =>
                navigateToChat(
                  userData?.id ?? "",
                  rideDetails?.creator?.name?.firstName,
                  rideDetails?.creator?.id
                )
              }
            >
              <Icon
                name="chatbubble-ellipses-outline"
                type="ionicon"
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  verticalLine: {
    width: 1.5,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 11.3,
    height: 30,
  },
});

export default NavigateCard;
