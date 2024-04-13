import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
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
  rating: number;
  driven: any;
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
  rating,
  driven,
}: CardProps) => {
  return (
    <SafeAreaView style={tailwind`bg-[#FFFFFF]`}>
      <View style={styles.card}>
        <View>
          <View style={tailwind`flex flex-row justify-between items-center`}>
            <Text
              style={[tailwind`text-lg py-5`, { fontFamily: "Poppins-Bold" }]}
            >
              {date}
            </Text>
            <View style={tailwind` items-center flex-row `}>
              <Image
                source={require("../../assets/CarSeat.png")}
                style={{ width: 26, height: 26 }}
              />
              <Text
                style={[
                  tailwind`text-[14px] py-5 px-2`,
                  { fontFamily: "Poppins-Bold" },
                ]}
              >
                {seatsLeft} seats left
              </Text>
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
        <View style={tailwind``} />

        <View
          style={tailwind`flex flex-row justify-between justify-between items-center pt-[20]`}
        >
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
                style={[
                  tailwind`text-[12px]
                `,
                  { fontFamily: "Poppins-Light" },
                ]}
              >
                {carDescription}
              </Text>
            </View>
            <View style={tailwind`flex-col justify-between `}>
              <View style={tailwind`flex-col justify-between `}>
                <Text
                  style={[tailwind`text-2xl`, { fontFamily: "Poppins-Bold" }]}
                >
                  {price}
                </Text>
                <View
                  style={tailwind`flex-row gap-[0] justify-center items-center`}
                >
                  <View
                    style={tailwind`flex-row gap-[-2] justify-center items-center `}
                  >
                    <Icon
                      name="star"
                      type="ionicon"
                      color="black"
                      style={styles.icon}
                    />
                    <Text
                      style={[
                        tailwind`text-[10px]`,
                        { fontFamily: "Poppins-SemiBold" },
                      ]}
                    >
                      {rating}
                    </Text>
                  </View>
                  <View style={tailwind`pt-[10]`}>
                    <Text
                      style={[
                        tailwind`text-[10px]`,
                        { fontFamily: "Poppins-SemiBold" },
                      ]}
                    >
                      . {driven}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
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
  // horizontalLine: {
  //   height: 3,
  //   backgroundColor: "#D9D9D9",
  //   marginVertical: 15,
  //   marginHorizontal: 10,
  // },
});
