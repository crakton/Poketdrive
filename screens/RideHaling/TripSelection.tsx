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
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import TripForm from "../../components/RideHailing/TripForm";

const data = [
  {
    id: 1,
    title: "Nyanya",
  },
  {
    id: 2,
    title: "Area 1",
  },
  {
    id: 3,
    title: "Maraba",
  },
  {
    id: 4,
    title: "Wuse",
  },
];

const TripSelection = () => {
  const navigation = useNavigation();

  return (
    <View
      style={[tw`bg-[#FFFFFF] h-full`, { paddingTop: StatusBar.currentHeight }]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View>
        <SafeAreaView
          style={tw`flex flex-row items-center justify-between px-5 pt-3 w-full`}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" type="ionicon" color="black" />
          </TouchableOpacity>

          <Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
            Find a trip
          </Text>

          <TouchableOpacity
            style={tw`bg-red-500 rounded-md`}
            onPress={() => {
              navigation.navigate("ManageRide" as never);
            }}
          >
            <Text
              style={[
                tw`px-2 text-white text-[12px] py-1`,
                { fontFamily: "Poppins-Regular" },
              ]}
            >
              rides
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <View style={tw`px-3 py-5`}>
        <TripForm />
      </View>
      {/* <View>
        <View>
          <Text
            style={[tw`text-xl text-center`, { fontFamily: "Poppins-Medium" }]}
          >
            Recent Search(4)
          </Text>
          <FlatList
            style={tw`border-t mt-5 border-gray-300`}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity style={tw`px-10 py-5 border-b border-gray-300`}>
                <Text
                  style={[
                    tw`text-lg text-black`,
                    { fontFamily: "Poppins-Medium" },
                  ]}
                >
                  {item?.title}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View> */}
    </View>
  );
};

export default TripSelection;

const styles = StyleSheet.create({});
