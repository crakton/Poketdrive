import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import RideScheduleForm from "../../components/Driver/RideScheduleForm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";

const RideSchedule = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "RidePreference">
    >();
  return (
    <SafeAreaView
      style={[tw`bg-[#FFFFFF] h-full`, { paddingTop: StatusBar.currentHeight }]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView>
        <View style={tw`flex gap-[1]`}>
          <HeaderWithBackButton
            navigation={navigation}
            title={"Ride Schedule"}
          />
          <View style={tw`flex flex-row items-center justify-end px-5`}>
            <TouchableOpacity
              style={tw`bg-red-500 rounded-md`}
              onPress={() => navigation.navigate("ManageTrips")}
            >
              <Text
                style={[
                  tw`px-2 text-white  py-1`,
                  { fontFamily: "Poppins-Regular" },
                ]}
              >
                Manage trip
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tw`flex px-3 mb-5 items-start`}>
            <Text style={[tw`text-2xl px-5`, { fontFamily: "Poppins-Bold" }]}>
              uRide schedule
            </Text>
            <Text
              style={[
                tw`text-[16px] px-5 pt-2`,
                { fontFamily: "Poppins-Light" },
              ]}
            >
              Your origin, destination, and stops you are willing to make along
              the way
            </Text>
          </View>
        </View>
        <View style={tw`px-5`}>
          <RideScheduleForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RideSchedule;

const styles = StyleSheet.create({});
