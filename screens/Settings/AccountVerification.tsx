import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/base";
import React from "react";
import tw from "twrnc";
import Profile from "../../components/Settings/Profile";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../nav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const AccountVerification = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();
  return (
    <View>
      <Profile />
      <View style={tw`flex-row justify-between mt-[40] items-center`}></View>
      <TouchableOpacity style={tw`flex-row justify-between px-[25] `}>
        <Text style={[tw` text-[16px] `, { fontFamily: "Poppins-Regular" }]}>
          Account Verification
        </Text>

        <TouchableOpacity
          style={tw` bg-[#F25B3E] mr-[20] rounded-lg`}
          onPress={() => navigation.navigate("IdVerification")}
        >
          <Text
            style={[
              tw` text-[12px] p-[10] px-[15] text-white`,
              { fontFamily: "Poppins-Bold" },
            ]}
          >
            Pending
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={tw`flex-row justify-between p-[25] `}>
        <Text style={[tw` text-[16px] `, { fontFamily: "Poppins-Regular" }]}>
          Card Management{" "}
        </Text>

        <Icon
          name="navigate-next"
          color="black"
          type="MaterialIcons"
          style={tw`p-1  rounded-lg w-10`}
        />
      </TouchableOpacity>
      <View style={tw`ml-[20]`}>
        <Text style={[tw`text-gray-500`, { fontFamily: "Poppins-Regular" }]}>
          {" "}
          Account Settings
        </Text>
      </View>
      <TouchableOpacity style={tw`flex-row justify-between p-[15] px-[25]`}>
        <Text style={[tw` text-[16px] `, { fontFamily: "Poppins-Regular" }]}>
          Wallet{" "}
        </Text>

        <Icon
          name="navigate-next"
          color="black"
          type="MaterialIcons"
          style={tw`p-1  rounded-lg w-10`}
        />
      </TouchableOpacity>
      <TouchableOpacity style={tw`flex-row justify-between p-[15] px-[25]`}>
        <Text style={[tw` text-[16px] `, { fontFamily: "Poppins-Regular" }]}>
          Help
        </Text>

        <Icon
          name="navigate-next"
          color="black"
          type="MaterialIcons"
          style={tw`p-1  rounded-lg w-10`}
        />
      </TouchableOpacity>
      <TouchableOpacity style={tw`flex-row justify-between p-[15] px-[25]`}>
        <Text style={[tw` text-[16px] `, { fontFamily: "Poppins-Regular" }]}>
          Address
        </Text>

        <Icon
          name="navigate-next"
          color="black"
          type="MaterialIcons"
          style={tw`p-1  rounded-lg w-10`}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row justify-between p-[15] px-[25]`}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={[tw` text-[16px]`, { fontFamily: "Poppins-Regular" }]}>
          Settings{" "}
        </Text>

        <Icon
          name="navigate-next"
          color="black"
          type="MaterialIcons"
          style={tw`p-1  rounded-lg w-10`}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`justify-center items-center`}
        onPress={() => navigation.goBack()}
      >
        <Text
          style={[
            tw` text-[18px] ml-[-5] text-[#FF4E00]`,
            { fontFamily: "Poppins-SemiBold" },
          ]}
        >
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountVerification;

const styles = StyleSheet.create({});
