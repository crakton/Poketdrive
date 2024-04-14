import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import tailwind from "twrnc";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Card from "../../components/RideHailing/Card";

type AuthStackParamList = {
  MapScreen: undefined;
};

const cardData = [
  {
    date: "Today at 1:00pm",
    seatsLeft: 4,
    fromLocation: "Wuse",
    fromDescription: "Opposite NNPC Mega Station",
    toLocation: "Area 1",
    toDescription: "Behind the market",
    driverImage: "https://randomuser.me/api/portraits/men/36.jpg",
    driverName: "Favour",
    carDescription: "Toyota Corolla 2024",
    price: "₦500",
    link: "MapScreen",
    rating: 4.9,
    driven: "35 driven",
  },
  {
    date: "Today at 1:00pm",
    seatsLeft: 2,
    fromLocation: "Wuse",
    fromDescription: "Opposite NNPC Mega Station",
    toLocation: "Area 1",
    toDescription: "Behind the market",
    driverImage: "https://randomuser.me/api/portraits/men/36.jpg",
    driverName: "Favour",
    carDescription: "Toyota Corolla 2024",
    price: "₦500",
    link: "MapScreen",
    rating: 4.8,
    driven: "25 driven",
  },
  {
    date: "Today at 1:00pm",
    seatsLeft: 3,
    fromLocation: "Wuse",
    fromDescription: "Opposite NNPC Mega Station",
    toLocation: "Area 1",
    toDescription: "Behind the market",
    driverImage: "https://randomuser.me/api/portraits/men/36.jpg",
    driverName: "Favour",
    carDescription: "Toyota Corolla 2024",
    price: "₦500",
    link: "MapScreen",
    rating: 4.4,
    driven: "25 driven",
  },
];

const RideSelection = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <SafeAreaView
      style={[
        tailwind`bg-[#FFFFFF] h-full`,
        { paddingTop: StatusBar.currentHeight },
      ]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View>
        <HeaderWithBackButton navigation={navigation} title="Search results" />
      </View>
      <View>
        <Text
          style={[
            tailwind`text-2xl px-5 pb-2`,
            { fontFamily: "Poppins-Regular" },
          ]}
        >
          Today
        </Text>
        <FlatList
          data={cardData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => {
                navigation.navigate(item.link as keyof AuthStackParamList);
              }}
            >
              <Card
                date={item.date}
                seatsLeft={item.seatsLeft}
                fromLocation={item.fromLocation}
                fromDescription={item.fromDescription}
                toLocation={item.toLocation}
                toDescription={item.toDescription}
                driverImage={item.driverImage}
                driverName={item.driverName}
                carDescription={item.carDescription}
                price={item.price}
                rating={item.rating}
                driven={item.driven}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default RideSelection;
const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
  },
});
