import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";

const PaymentSucessful = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();
  return (
    <SafeAreaView
      style={[tw`bg-[#FFFFFF] h-full`, { paddingTop: StatusBar.currentHeight }]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View>
        <HeaderWithBackButton navigation={navigation} title="Payment" />
        <TouchableOpacity
          style={tw`items-center justify-center p-[16] bg-[#FF4E00] mt-6 mb-10 `}
        >
          <Text
            style={[
              tw`text-white text-[24px] `,
              { fontFamily: "Poppins-SemiBold" },
            ]}
          >
            Sucessful
          </Text>
        </TouchableOpacity>
        <View style={[tw`flex items-center justify-center`]}>
          <View
            style={[
              tw`p-1 bg-[#FF4E00] rounded-full h-40 w-40 items-center justify-center`,
            ]}
          >
            <Icon
              name="check"
              color="white"
              type="antdesign"
              size={100} // Adjust the size to make the icon bigger
            />
          </View>
        </View>
        <View style={[tw`flex items-center justify-center mt-[15]`]}>
          <Text style={tw`text-[37px] font-bold`}>N700</Text>
        </View>
        <TouchableOpacity
          style={[
            tw`flex bg-[#FF4E00]  items-center justify-center mt-[15] mx-[20] rounded-[8] p-[22]`,
          ]}
        >
          <Text
            style={[
              tw`text-[24px]  text-white`,
              { fontFamily: "Poppins-SemiBold" },
            ]}
          >
            Done
          </Text>
        </TouchableOpacity>
        <View style={[tw`flex items-center justify-center mt-[15]`]}>
          <Text style={[tw`text-[18px]   `, { fontFamily: "Poppins-Medium" }]}>
            {" "}
            recipt{" "}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentSucessful;
