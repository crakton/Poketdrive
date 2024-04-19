import React, { useState } from "react";
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
import { Avatar, Icon, Image } from "@rneui/base";
import { SvgXml } from "react-native-svg";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../nav";

const NavigateCard = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, "MapScreen">>();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

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

  return (
    <ScrollView style={tailwind`bg-[#F3F3F3] flex-1`}>
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
              <Text style={[tailwind`text-lg`, { fontFamily: "Poppins-Bold" }]}>
                Wuse
              </Text>
              <Text
                style={[tailwind`text-base`, { fontFamily: "Poppins-Light" }]}
              >
                NNPC Filling Station
              </Text>
            </View>
          </View>
          <View>
            <Text style={[tailwind`text-lg`, { fontFamily: "Poppins-Bold" }]}>
              Sun. Sep 3 at 10am
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
              <Text style={[tailwind`text-lg`, { fontFamily: "Poppins-Bold" }]}>
                Area 1
              </Text>
              <Text
                style={[tailwind`text-base`, { fontFamily: "Poppins-Light" }]}
              >
                Total Filling Station
              </Text>
            </View>
          </View>
          <View>
            <Text style={[tailwind`text-lg`, { fontFamily: "Poppins-Bold" }]}>
              Est. 10:30
            </Text>
          </View>
        </View>
        <View style={tailwind`flex flex-row justify-center pt-1 items-center`}>
          <Text style={[tailwind`text-sm`, { fontFamily: "Poppins-Bold" }]}>
            4 Seats left
          </Text>
          <View style={styles.verticalLine} />

          <Text style={[tailwind`text-sm`, { fontFamily: "Poppins-Bold" }]}>
            {formatPrice(700)} per seat
          </Text>
        </View>
        <View
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
        </View>
      </View>
      <View
        style={tailwind`flex flex-row items-center justify-between px-5 mt-1 bg-white`}
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
          <Text style={[tailwind`text-lg`, { fontFamily: "Poppins-Bold" }]}>
            Florence
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
      </View>
      <View style={tailwind`flex px-5 mt-1 bg-white py-2 justify-center gap-3`}>
        <View style={tailwind`flex flex-row px-5 pt-1 `}>
          <Icon
            name="briefcase"
            type="ionicon"
            color="black"
            style={styles.icon}
          />
          <Text style={[tailwind`text-lg`, { fontFamily: "Poppins-Regular" }]}>
            Medium Luggage
          </Text>
        </View>
        <View style={tailwind`flex flex-row items-center justify-center gap-5`}>
          <TouchableOpacity
            style={tailwind`rounded-[1rem] bg-[#F25B3E] p-3 my-2`}
            onPress={() => navigation.navigate("Payment")}
          >
            <Text
              style={[
                tailwind`text-center text-2xl text-white`,
                { fontFamily: "Poppins-Bold" },
              ]}
            >
              Request to Book
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tailwind`border p-2 rounded-full bg-black`}
            onPress={handlePhoneCall}
          >
            <Icon name="call-outline" type="ionicon" color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={tailwind`border p-2 rounded-full bg-black`}>
            <Icon
              name="chatbubble-ellipses-outline"
              type="ionicon"
              color="white"
            />
          </TouchableOpacity>
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
