import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../../nav";
import HeaderWithBackButton from "../../../components/common/HeaderWithBackButton";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import DriverCard from "../../../components/RideHailing/DriverCard";

const ManageTrips = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "ManageTrips">
    >();
  return (
    <SafeAreaView style={tw`bg-[#FFFFFF] h-full`}>
      <View style={tw`flex flex-row items-center justify-between px-5 py-5 `}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AccountVerification")}
        >
          <Icon name="menu" />
        </TouchableOpacity>
        <Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
          Manage trips
        </Text>
        <Text>{""}</Text>
      </View>
      <View>
        <DriverCard />
      </View>
    </SafeAreaView>
  );
};

export default ManageTrips;

const styles = StyleSheet.create({});
