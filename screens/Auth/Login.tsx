import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import CountryPhoneNumber from "../../components/Auth/CountryPhoneNumber";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={[tw`bg-[#FFFFFF] h-full`, { paddingTop: StatusBar.currentHeight }]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={tw`flex flex-row items-center justify-between px-5 py-5 `}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        ></TouchableOpacity>
        <Text style={[tw``, { fontFamily: "Poppins-semibold" }]}>Login</Text>
      </View>
      <View style={tw`flex-grow`}>
        <View style={tw`flex px-3 gap-2`}>
          <Text style={[tw`text-[18px] font-bold`]}>Login Title</Text>
          <Text style={[tw`text-[14px]`, { fontFamily: "Poppins-Regular" }]}>
            Enter your registered email below.
          </Text>
        </View>
        <CountryPhoneNumber />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
