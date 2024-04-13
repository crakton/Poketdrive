import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import RideSchduleForm from "../../components/Driver/RideSchduleForm";

const RideSchdule = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-[#FFFFFF] h-full`}>
      <ScrollView>
        <View style={tw`flex gap-[1]`}>
          <HeaderWithBackButton
            navigation={navigation}
            title={"Ride Schdule"}
          />
          <View style={tw`flex flex-row items-center justify-end px-5`}>
            <TouchableOpacity style={tw`bg-red-500 rounded-md`}>
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
          {/* <View style={[tw`bg-gray-600 my-5`, { height: 1 }]} /> */}

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
              way
            </Text>
          </View>
        </View>
        <View style={tw`px-5`}>
          <RideSchduleForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RideSchdule;

const styles = StyleSheet.create({});
