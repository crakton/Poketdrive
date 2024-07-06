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
  MapScreen: { data: any };
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
    const formattedData = data.content.map(
      (ride: { departure_time: string }) => ({
        ...ride,
        formattedDate: formatDate(ride.departure_time),
      })
    );

    setRideData(formattedData);
  }, [data]);

  console.log(data, "data");
  return (
    <View
      style={[
        tailwind`bg-white flex-1 h-full `,
        // { paddingTop: StatusBar.currentHeight },
      ]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View>
        <HeaderWithBackButton navigation={navigation} title="Search results" />
      </View>

      <Text style={[tailwind`text-2xl px-5 pb-2 pl-[5%]`]}>Today</Text>

      {data?.content?.length === 0 ? (
        <View
          style={[
            tailwind`flex-1 h-full flex items-center bg-[#FFFFF] justify-center `,
          ]}
        >
          <Icon
            name="remove-circle-outline"
            type="ionicon"
            color="red"
            size={40}
          />
          <Text
            style={[tailwind`text-[20px]`, { fontFamily: "Poppins-Regular" }]}
          >
            No rides available
          </Text>
        </View>
      ) : (
        <FlatList
          data={data.content}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => {
                navigation.navigate("MapScreen", { data });
              }}
            >
              <Card
                date={new Date(item.departure_time).toLocaleString()}
                seatsLeft={item.remaining_capacity}
                fromLocation={item.origin.name}
                fromDescription={item.origin.name}
                toLocation={item.destination.name}
                toDescription={item.destination.name}
                driverImage={
                  item.creator.profilePicture ||
                  "https://randomuser.me/api/portraits/men/36.jpg"
                }
                driverName={`${item.creator.name.firstName} ${item.creator.name.lastName}`}
                carDescription={`${item.carName} ${item.carNumber}`}
                price={`${item.price}`}
                rating={4.9}
                driven={`35 driven`}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default RideSelection;
const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
  },
});
