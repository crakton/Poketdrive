import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import tw from "twrnc";

const AccountVerification = () => {
  return (
    <View>
      <View
        style={tw`h-[202px] bg-[#F25B3E] relative flex justify-center items-center`}
      >
        <View style={tw`absolute top-[75%] justify-center items-center`}>
          <Image source={require("../../assets/Profile.png")} />
        </View>
      </View>
      <View style={tw`mt-[50]  justify-center items-center `}>
        <Text style={[tw` text-[14px]`,{fontFamily:"Poppins-SemiBold"}]}>Florence</Text>
        <Text style={[tw` text-[14px]`,{fontFamily:"Poppins-Regular"}]}>Florence01@gmail.com</Text>
      </View>
    </View>
  );
};

export default AccountVerification;

const styles = StyleSheet.create({});
