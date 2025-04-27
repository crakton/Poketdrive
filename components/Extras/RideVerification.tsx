import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import { Avatar, Icon, Image } from "@rneui/base";
import { SvgXml } from "react-native-svg";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../nav";
import ContinueButton from "@components/ui/ContinueButton";

interface RideVerificationProps {
  title: string;
  destinationName: any;
  classes?: any;
  direction: string;
}

const RideVerification: React.FC<RideVerificationProps> = ({
  title,
  classes,
  destinationName,
  direction,
}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();
  const limitWords = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };
  return (
    <View>
      <TouchableOpacity
        style={[styles.container, classes?.cardContainer]}
        onPress={() =>
          navigation.navigate(direction as keyof AuthStackParamList)
        }
      >
        <Text
          style={[
            tw`text-[15px] text-white`,
            { fontFamily: "Poppins-SemiBold" },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
      <View style={tw` h-[43px] items-center justify-center `}>
        <Text
          style={[
            tw`text-[14px] text-black`,
            { fontFamily: "Poppins-Regular" },
          ]}
        >
          20km to {limitWords(destinationName, 2)} | Est time 20min
        </Text>
      </View>
      <TouchableOpacity
        style={tw`bg-[#E3E3E3] h-[43px] items-center justify-center flex-row  rounded-[2] px-3 pr-5`}
      >
        {/* <Icon
          name="arrowright"
          color="white"
          type="antdesign"
          style={tw`p-1 bg-[#FF4E00] rounded-full  `}
        /> */}
        <Text
          style={[tw`px-[80] text-[14px]`, { fontFamily: "Poppins-Regular" }]}
        >
          {" "}
          {destinationName}
        </Text>
        <View></View>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`pt-3 items-center justify-center flex-row  rounded-[2]`}
      >
        <Text
          style={[tw`px-[10] text-[12px]`, { fontFamily: "Poppins-Medium" }]}
        >
          Trip summary
        </Text>
        <Icon
          name="sharealt"
          color="black"
          type="antdesign"
          style={tw`rounded-full h-[30px] `}
        />
      </TouchableOpacity>

      <View style={tw` mx-[20] rounded-[5]`}>
        <ContinueButton
          text={"Back"}
          onPress={() => navigation.goBack()}
          disabled={false}
        />
      </View>
    </View>
  );
};

export default RideVerification;

const styles = StyleSheet.create({
  container: {
    // Define your container styles here
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
});
