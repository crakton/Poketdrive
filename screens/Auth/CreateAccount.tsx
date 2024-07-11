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
import { Icon, Image } from "@rneui/base";
import RegisterForm from "../../components/Auth/RegisterForm";

const CreateAccount = () => {
  return (
    <SafeAreaView
      style={[tw`bg-[#FFFFFF] h-full`, { paddingTop: StatusBar.currentHeight }]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={tw`flex flex-row items-center justify-center px-5 mt-[-1rem]`}
      >
        <Image
          style={{
            width: 250,
            height: 100,
            resizeMode: "contain",
          }}
          source={require("../../assets/logo.png")}
        />
      </View>
      <ScrollView>
        <View style={tw`flex px-3`}>
          <Text style={[tw`text-2xl`]}>Create an Account</Text>
        </View>

        <View style={tw`px-3 py-5`}>
          <RegisterForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({});
