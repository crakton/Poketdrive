// DriverCard.tsx

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tailwind from "twrnc";
import { Icon } from "@rneui/base";
import { SvgXml } from "react-native-svg";

interface CardProps {
  departure_time: string;
  fromLocation: string;
  fromDescription: string;
  toLocation: string;
  toDescription: string;
  driverName: string;
  carDescription: string;
  price: string;
  seatsTaken: number;
  onDelete: () => any; // onDelete prop function
  onEdit: () => void; // onEdit prop function
  isEmpty?: boolean;
  rideId: string;
}

const carSeatSelectedSvg = `
    <svg width="15" height="15" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6594 2.716C12.9614 4.297 12.2984 7.588 11.0714 10.593C8.96643 15.749 8.96043 15.754 5.06743 15.232C0.517429 14.622 -0.98557 16.119 0.62743 19.658C1.54643 21.674 2.41343 22 6.86543 22C11.2464 22 12.1974 21.657 13.0944 19.75C14.8934 15.926 16.2004 9.718 16.2514 4.75C16.2944 0.59 16.0424 0 14.2204 0C12.4964 0 12.2294 0.465 12.6594 2.716Z" fill="#DDDD"/>
    </svg>
  `;
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
};

const DriverCard: React.FC<CardProps> = ({
  departure_time,
  fromLocation,
  fromDescription,
  toLocation,
  toDescription,
  driverName,
  carDescription,
  price,
  seatsTaken,
  onDelete,
  onEdit,
  rideId,
  isEmpty,
}: CardProps) => {
  return (
    <View style={styles.card}>
      <View>
        <View style={tailwind`flex flex-row items-center justify-between`}>
          <Text
            style={[tailwind`text-[14px] py-5`, { fontFamily: "Poppins-Bold" }]}
          >
            {departure_time}
          </Text>
          <View
            style={tailwind`flex flex-row gap-2 items-center  justify-center`}
          >
            <View>
              <TouchableOpacity
                style={[
                  tailwind`flex flex-row mx-2 items-center rounded-full`,
                  isEmpty ? tailwind`bg-[#FF0000]` : tailwind`bg-[#049813]`,
                ]}
              >
                <View style={tailwind`p-1`}>
                  <Text
                    style={[
                      tailwind`text-[10px] text-center text-white pb-2`,
                      { fontFamily: "Poppins-Bold" },
                    ]}
                  >
                    {seatsTaken}
                  </Text>
                </View>
                <View style={tailwind`mr-1`}>
                  <SvgXml xml={carSeatSelectedSvg} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={tailwind`flex flex-row gap-2`}>
              <TouchableOpacity onPress={onDelete}>
                <Icon name="trash-outline" type="ionicon" />
              </TouchableOpacity>
              <TouchableOpacity onPress={onEdit}>
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
            <Text
              style={[tailwind`text-[16px]`, { fontFamily: "Poppins-Bold" }]}
            >
              {fromLocation}
            </Text>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  tailwind`text-base mx-2`,
                  { fontFamily: "Poppins-Light", flexWrap: "wrap" },
                ]}
              >
                {fromDescription}
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
            <Text
              style={[tailwind`text-[16px]`, { fontFamily: "Poppins-Bold" }]}
            >
              {toLocation}
            </Text>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  tailwind`text-base mx-2`,
                  { fontFamily: "Poppins-Light", flexWrap: "wrap" },
                ]}
              >
                {toDescription}
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
              style={[tailwind`text-[14px]`, { fontFamily: "Poppins-Bold" }]}
            >
              {driverName}
            </Text>
            <Text
              style={[tailwind`text-[14px]`, { fontFamily: "Poppins-Light" }]}
            >
              {carDescription}
            </Text>
            <Text
              style={[tailwind`text-[14px]`, { fontFamily: "Poppins-Light" }]}
            >
              {rideId}
            </Text>
          </View>
        </View>
        <View>
          <Text style={[tailwind`text-2xl`, { fontFamily: "Poppins-Bold" }]}>
            {formatPrice(parseInt(price))}
          </Text>
        </View>
      </View>
    </View>
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
