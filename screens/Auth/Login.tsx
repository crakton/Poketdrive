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
import { Icon } from "@rneui/base";
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
        >
          <Icon name="arrow-back-outline" type="ionicon" color="black" />
        </TouchableOpacity>
        <Text style={[tw``, { fontFamily: "Poppins-Black" }]}>Login</Text>
      </View>
      <ScrollView>
        <View style={tw`flex px-3`}>
          <Text style={[tw`text-2xl`, { fontFamily: "Poppins-Black" }]}>
            Login Title
          </Text>
          <Text style={[tw`text-lg py-5`, { fontFamily: "Poppins-Regular" }]}>
            Put your registered phone number below.
          </Text>
        </View>
        <CountryPhoneNumber />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
