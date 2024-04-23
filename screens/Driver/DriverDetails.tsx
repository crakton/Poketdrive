import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import { Icon } from "@rneui/base";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import { Poppins_500Medium } from "@expo-google-fonts/poppins";

const DriverDetails = () => {
  const stack = createNativeStackNavigator();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <SafeAreaView>
      <View style={tw`z-50 absolute top-2 `}>
        <HeaderWithBackButton navigation={navigation} />
      </View>
      <View
        style={tw`bg-gray-200 py-[50] justify-between items-baseline flex-row`}
      >
        <View style={styles.texts}>
          <Text style={[tw`text-[14px]`, { fontFamily: "Poppins-Medium" }]}>
            Toyota Corolla, Black
          </Text>
        </View>
        <View style={styles.text}>
          <Text style={[tw`text-[14px]`, { fontFamily: "Poppins-Medium" }]}>
            KRD 534 AH
          </Text>
        </View>
      </View>
      <View style={tw`py-[30] flex-row justify-between items-center`}>
        <TouchableOpacity style={tw`ml-[25]`}>
          <Image source={require("../../assets/Profile.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`h-[70px] w-[70px] rounded-full bg-gray-700 justify-center `}
        >
          <Icon
            name="messenger"
            color="white"
            type="fontisto"
            style={tw`rounded-lg`}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`h-[70px] w-[70px] rounded-full justify-center mr-[20]`}
        >
          <Image source={require("../../assets/Batch.png")} />
        </TouchableOpacity>
      </View>
      <View style={tw`bg-gray-200 py-[25]`}>
        <Text
          style={[
            tw`absolute bottom-2 left-10 text-[16px]`,
            { fontFamily: "Poppins-SemiBold" },
          ]}
        >
          News And Highlight
        </Text>
      </View>
      <View style={tw`mt-[20] flex-row `}>
        <TouchableOpacity
          style={tw`h-[120px] w-[120px] rounded-lg bg-gray-300 mx-[10]`}
        ></TouchableOpacity>
        <TouchableOpacity
          style={tw`h-[120px] w-[120px] rounded-lg bg-gray-300 mx-[10]`}
        ></TouchableOpacity>
        <TouchableOpacity
          style={tw`h-[120px] w-[120px] rounded-lg bg-gray-300 mx-[10]`}
        ></TouchableOpacity>
      </View>
      <View style={tw`flex-col mx-[10] mt-5`}>
        <Text
          style={[
            tw`text-[18px] font-semibold`,
            { fontFamily: "Poppins-SemiBold" },
          ]}
        >
          Your Route
        </Text>
        <View
          style={tw`mt-4 flex-row items-center bg-gray-300 py-[20] rounded-lg`}
        >
          <Icon
            name="location"
            type="ionicon"
            color="red"
            style={tw` pl-[10]`}
          />
          <Text
            style={[
              tw`text-[18px] font-semibold ml-2`,
              { fontFamily: "Poppins-SemiBold" },
            ]}
          >
            Wuse
          </Text>
        </View>
        <View
          style={tw`mt-3 flex-row items-center bg-gray-300 py-[20] rounded-lg`}
        >
          <Icon
            name="location"
            type="ionicon"
            color="green"
            style={tw` pl-[10]`}
          />
          <Text
            style={[
              tw`text-[18px] font-semibold ml-2`,
              { fontFamily: "Poppins-SemiBold" },
            ]}
          >
            Area 1
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DriverDetails;

const styles = StyleSheet.create({
  text: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingRight: 10,
    paddingBottom: 10,
  },
  texts: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingLeft: 10,
    paddingBottom: 10,
  },
});
