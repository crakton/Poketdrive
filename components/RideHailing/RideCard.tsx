import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "@rneui/base";
import tailwind from "twrnc";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";

interface Ride {
  origin: string;
  destination: string;
  departureTime: string;
  creator: {
    creatorName: string;
  };
  LuggageType: string;
  remainingCapacity: number;
  price: string;
}

interface RideCardProps {
  ride: Ride;
}

const RideCard: React.FC<RideCardProps> = ({ ride }) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "ManageTrips">
    >();
  const handleNext = () => {
    navigation.navigate("EndTrip");
  };
  const limitWords = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };
  return (
    <TouchableOpacity onPress={handleNext} style={styles.card}>
      <View>
        <View style={tailwind`flex flex-row items-center justify-between`}>
          <Text
            style={[tailwind`text-[13px] py-5`, { fontFamily: "Poppins-Bold" }]}
          >
            {ride?.departureTime}
          </Text>
          <View
            style={tailwind`flex flex-row gap-2 items-center  justify-center`}
          >
            <View>
              <TouchableOpacity
                style={[tailwind`flex flex-row mx-2 items-center rounded-full`]}
              >
                <View style={tailwind`p-1`}>
                  <Text
                    style={[
                      tailwind`text-[10px] text-center text-white pb-2`,
                      { fontFamily: "Poppins-Bold" },
                    ]}
                  >
                    {ride.origin}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Icon
            name="location"
            type="ionicon"
            color="green"
            style={styles.icon}
          />
          <View
            style={[
              tailwind`text-lg flex-row gap-2`,
              { fontFamily: "Poppins-Bold", alignItems: "center" },
            ]}
          >
            <Text
              style={[tailwind`text-[16px]`, { fontFamily: "Poppins-Bold" }]}
            >
              {limitWords(ride.origin, 2)}
            </Text>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  tailwind`text-base mx-2`,
                  { fontFamily: "Poppins-Light", flexWrap: "wrap" },
                ]}
              >
                {limitWords(ride.origin, 2)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.itemContainer}>
          <Icon
            name="location"
            type="ionicon"
            color="red"
            style={styles.icon}
          />
          <View
            style={[
              tailwind`text-[14px] flex-row gap-2`,
              { fontFamily: "Poppins-Bold", alignItems: "center" },
            ]}
          >
            <Text
              style={[tailwind`text-[14px]`, { fontFamily: "Poppins-Bold" }]}
            >
              {limitWords(ride.destination, 2)}
            </Text>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  tailwind`text-[14px] mx-2`,
                  { fontFamily: "Poppins-Light", flexWrap: "wrap" },
                ]}
              >
                {limitWords(ride.destination, 2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={tailwind`flex flex-row justify-between items-center`}>
        <View style={tailwind`flex flex-row gap-4`}>
          <View>
            <Text
              style={[tailwind`text-[12px]`, { fontFamily: "Poppins-Bold" }]}
            >
              Driver: {ride.creator.creatorName}
            </Text>
            <Text
              style={[tailwind`text-[12px]`, { fontFamily: "Poppins-Light" }]}
            >
              Luggage: {ride.LuggageType}
            </Text>
            <Text
              style={[tailwind`text-[12px]`, { fontFamily: "Poppins-Light" }]}
            >
              Remaining capacity: {ride.remainingCapacity}
            </Text>
          </View>
        </View>
        <View>
          <Text style={[tailwind`text-[18px]`, { fontFamily: "Poppins-Bold" }]}>
            {ride.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RideCard;
const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: "#FFF",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
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
    height: 20,
  },
  horizontalLine: {
    height: 3,
    backgroundColor: "#D9D9D9",
    marginVertical: 15,
    marginHorizontal: 10,
  },
});
