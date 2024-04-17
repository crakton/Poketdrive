import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";

const Payment = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, "Payment">>();

  return (
    <SafeAreaView
      style={[tw`bg-[#FFFFFF] h-full`, { paddingTop: StatusBar.currentHeight }]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View>
        <HeaderWithBackButton navigation={navigation} title="Payment" />
      </View>
      <View style={tw`flex flex-row mx-5 items-center justify-end`}>
        <TouchableOpacity
          style={tw` px-5 py-2  bg-red-500 rounded-full`}
          onPress={() => navigation.navigate("WalletHome")}
        >
          <Text
            style={[tw`text-lg  text-white `, { fontFamily: "Poppins-Bold" }]}
          >
            Wallet
          </Text>
        </TouchableOpacity>
      </View>
      <View style={tw`mt-50`}>
        <View style={tw`border-b-2 pb-2 border-[#D9D9D9]`}>
          <Text
            style={[tw`text-2xl text-center`, { fontFamily: "Poppins-Bold" }]}
          >
            N 7000
          </Text>
        </View>
        <View style={tw`border-b-2 py-3 border-[#D9D9D9]`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PaymentSucessful")}
          >
            <Text
              style={[
                tw`text-xl text-center`,
                { fontFamily: "Poppins-Medium" },
              ]}
            >
              Cash
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`border-b-2 py-3 border-[#D9D9D9]`}>
          <TouchableOpacity onPress={() => navigation.navigate("Confirmation")}>
            <Text
              style={[
                tw`text-xl text-center`,
                { fontFamily: "Poppins-Medium" },
              ]}
            >
              Pay with wallet
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`border-b-2 py-3 border-[#D9D9D9]`}>
          <Text
            style={[tw`text-xl text-center`, { fontFamily: "Poppins-Medium" }]}
          >
            Token/voucher
          </Text>
        </View>
      </View>
      <View style={tw`flex flex-row mx-5 items-center justify-end`}>
        <TouchableOpacity style={tw` px-5 py-2`}
        onPress={() => navigation.navigate("FAQs")}>
          <Text style={[tw`text-lg `, { fontFamily: "Poppins-Medium" }]}>
            Need help?
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({});
