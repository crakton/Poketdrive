import React from "react";
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tailwind from "twrnc";
import { Icon } from "@rneui/base";
import { Avatar } from "@rneui/themed";
import { SvgXml } from "react-native-svg";

// interface CardProps {
//   date: string;
//   seatsLeft: number;
//   fromLocation: string;
//   fromDescription: string;
//   toLocation: string;
//   toDescription: string;
//   driverImage: string;
//   driverName: string;
//   carDescription: string;
//   price: string;
// }

// const DriverCard: React.FC<CardProps> = ({
//   date,
//   seatsLeft,
//   fromLocation,
//   fromDescription,
//   toLocation,
//   toDescription,
//   driverImage,
//   driverName,
//   carDescription,
//   price,
// }: CardProps) => {

const carSeatSelectedSvg = `
    <svg width="15" height="15" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6594 2.716C12.9614 4.297 12.2984 7.588 11.0714 10.593C8.96643 15.749 8.96043 15.754 5.06743 15.232C0.517429 14.622 -0.98557 16.119 0.62743 19.658C1.54643 21.674 2.41343 22 6.86543 22C11.2464 22 12.1974 21.657 13.0944 19.75C14.8934 15.926 16.2004 9.718 16.2514 4.75C16.2944 0.59 16.0424 0 14.2204 0C12.4964 0 12.2294 0.465 12.6594 2.716Z" fill="#DDDD"/>
    </svg>
  `;

const DriverCard = () => {
  return (
    <SafeAreaView style={tailwind`bg-[#FFFFFF]`}>
      <View style={styles.card}>
        <View>
          <View style={tailwind`flex flex-row items-center justify-between`}>
            <Text
              style={[tailwind`text-lg py-5`, { fontFamily: "Poppins-Bold" }]}
            >
              Today at 1:00pm
            </Text>
            <View
              style={tailwind`flex flex-row gap-2 items-center  justify-center`}
            >
              <View>
                <TouchableOpacity
                  style={[
                    tailwind`flex flex-row mx-2 items-center rounded-full p-2`,

                    tailwind`bg-[#049813]`,
                  ]}
                >
                  <Text
                    style={[
                      tailwind`text-[10px] text-white pb-2`,
                      { fontFamily: "Poppins-Bold" },
                    ]}
                  >
                    2
                  </Text>
                  <SvgXml xml={carSeatSelectedSvg} />
                </TouchableOpacity>
              </View>
              <View style={tailwind`flex  flex-row pt-2 gap-2`}>
                <TouchableOpacity>
                  <Icon name="trash-outline" type="ionicon" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="create-outline" type="ionicon" />
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
              <Text style={[tailwind`text-lg`, { fontFamily: "Poppins-Bold" }]}>
                Wuse
              </Text>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    tailwind`text-base mx-2`,
                    { fontFamily: "Poppins-Light", flexWrap: "wrap" },
                  ]}
                >
                  Wuse Zone 5, under bridge opposite NNPC
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
                tailwind`text-lg flex-row gap-2`,
                { fontFamily: "Poppins-Bold", alignItems: "center" },
              ]}
            >
              <Text style={[tailwind`text-lg`, { fontFamily: "Poppins-Bold" }]}>
                Area 1
              </Text>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    tailwind`text-base mx-2`,
                    { fontFamily: "Poppins-Light", flexWrap: "wrap" },
                  ]}
                >
                  Total Filling Station
                </Text>
              </View>
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
                  uri: "https://randomuser.me/api/portraits/men/36.jpg",
                }}
              />
            </View>
            <View>
              <Text style={[tailwind`text-lg`, { fontFamily: "Poppins-Bold" }]}>
                Abraham
              </Text>
              <Text
                style={[tailwind`text-base`, { fontFamily: "Poppins-Light" }]}
              >
                Toyota Corolla 2021
              </Text>
            </View>
          </View>
          <View>
            <Text style={[tailwind`text-2xl`, { fontFamily: "Poppins-Bold" }]}>
              N 700
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DriverCard;

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
