import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import tailwind from "twrnc";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Card from "../../components/RideHailing/Card";
import { Icon } from "@rneui/base";
import { format, isToday, isTomorrow, parseISO } from "date-fns";

type AuthStackParamList = {
  MapScreen: { rideDetails?: any }; // Updated to include rideDetails as optional
};
const formatDate = (dateString: string) => {
  const date = parseISO(dateString);

  if (isToday(date)) {
    return "Today";
  } else if (isTomorrow(date)) {
    return "Tomorrow";
  } else {
    return format(date, "PPPPpp");
  }
};

const RideSelection = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const route = useRoute();
  const { data }: any = route.params;
  const [rideData, setRideData] = useState([]);

  useEffect(() => {
    const formattedData = data?.content?.map(
      (ride: { departure_time: string }) => ({
        ...ride,
        formattedDate: formatDate(ride.departure_time),
      })
    );

    setRideData(formattedData);
  }, [data]);
  console.log(data?.content, "data?.content?.length");

  return (
    <View
      style={[
        tailwind`bg-white flex-1 h-full `,
        { paddingTop: StatusBar.currentHeight },
      ]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View>
        <HeaderWithBackButton navigation={navigation} title="Search results" />
      </View>

      {data?.content === undefined ? (
        <View
          style={[
            tailwind`flex-1 h-full flex items-center bg-[#FFFFF] justify-center `,
          ]}
        >
          <Icon
            name="remove-circle-outline"
            type="ionicon"
            color="red"
            size={24}
          />
          <Text
            style={[tailwind`text-[16px]`, { fontFamily: "Poppins-Regular" }]}
          >
            No rides available
          </Text>
        </View>
      ) : (
        <View style={tailwind` pb-40`}>
          <Text style={[tailwind`text-[16px] px-5`]}>Available Rides</Text>
          <FlatList
            data={data?.content}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => {
                  navigation.navigate("MapScreen", { rideDetails: item });
                }}
              >
                <Card
                  date={new Date(item?.departure_time)?.toLocaleString()}
                  seatsLeft={item?.remaining_capacity}
                  fromLocation={`${item?.origin?.name},`}
                  fromDescription={`${item?.origin?.name},`}
                  toLocation={`${item?.destination?.name},`}
                  toDescription={`${item?.destination?.name},`}
                  driverImage={
                    item?.creator?.profilePicture ||
                    "https://randomuser.me/api/portraits/men/36.jpg"
                  }
                  driverName={`${item?.creator?.name?.firstName}, ${item?.creator?.name?.lastName}`}
                  carDescription={`${item?.carName}, ${item?.carNumber}`}
                  price={`${item?.price}`}
                  rating={4.9}
                  driven={`35 driven`}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          />
        </View>
      )}
    </View>
  );
};

export default RideSelection;
const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    marginTop: -20,
  },
});
