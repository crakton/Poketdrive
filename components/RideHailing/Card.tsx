import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tailwind from "twrnc";
import { Icon } from "@rneui/base";
import { Avatar } from "@rneui/themed";

interface CardProps {
  date: string;
  seatsLeft: number;
  fromLocation: string;
  fromDescription: string;
  toLocation: string;
  toDescription: string;
  driverImage: string;
  driverName: string;
  carDescription: string;
  price: string;
}

const Card: React.FC<CardProps> = ({
  date,
  seatsLeft,
  fromLocation,
  fromDescription,
  toLocation,
  toDescription,
  driverImage,
  driverName,
  carDescription,
  price,
}: CardProps) => {
  return (
    <SafeAreaView style={tailwind`bg-[#FFFFFF]`}>
      <View style={styles.card}>
        <View>
          <View style={tailwind`flex flex-row justify-between`}>
            <Text
              style={[tailwind`text-lg py-5`, { fontFamily: "Poppins-Bold" }]}
            >
              {date}
            </Text>
            <Text
              style={[tailwind`text-lg py-5`, { fontFamily: "Poppins-Bold" }]}
            >
              {seatsLeft} seats left
            </Text>
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
              <Text style={[tailwind`text-lg`, { fontFamily: "Poppins-Bold" }]}>
                {fromLocation}
              </Text>
              <Text
                style={[tailwind`text-base`, { fontFamily: "Poppins-Light" }]}
              >
                {fromDescription}
              </Text>
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
                tailwind`text-lg flex-row gap-2`,
                { fontFamily: "Poppins-Bold", alignItems: "center" },
              ]}
            >
              <Text style={[tailwind`text-lg`, { fontFamily: "Poppins-Bold" }]}>
                {toLocation}
              </Text>
              <Text
                style={[tailwind`text-base`, { fontFamily: "Poppins-Light" }]}
              >
                {toDescription}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        <View style={tailwind`flex flex-row justify-between items-center`}>
          <View style={tailwind`flex flex-row gap-4`}>
            <View>
              <Avatar
                size={50}
                rounded
                source={{
                  uri: driverImage,
                }}
              />
            </View>
            <View>
              <Text style={[tailwind`text-lg`, { fontFamily: "Poppins-Bold" }]}>
                {driverName}
              </Text>
              <Text
                style={[tailwind`text-base`, { fontFamily: "Poppins-Light" }]}
              >
                {carDescription}
              </Text>
            </View>
          </View>
          <View>
            <Text style={[tailwind`text-2xl`, { fontFamily: "Poppins-Bold" }]}>
              {price}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Card;

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
