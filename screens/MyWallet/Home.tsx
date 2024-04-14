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
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../nav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { card } from "../../assets/card";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import CardDetails from "../../components/MyWallet/CardDetails";

const WalletHome = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();

  return (
    <SafeAreaView style={[tw`bg-[#FFFFFF] h-full`, { paddingTop: StatusBar.currentHeight }]}>
    <StatusBar translucent backgroundColor="transparent" />
      <View>
        <HeaderWithBackButton navigation={navigation} />
        <View
          style={tw`flex-row h-[50px]  mt-5 mb-2 mx-5 items-center justify-between`}
        >
          <View>
            <Text
              style={[tw`text-[30px] `, { fontFamily: "Poppins-SemiBold" }]}
            >
              My Wallet
            </Text>
          </View>
          <TouchableOpacity
            style={tw`bg-[#FF4E00] rounded-xl py-2 mb-2 px-4`}
            onPress={() => navigation.navigate("WalletHistory")}
          >
            <Text
              style={[
                tw`text-white text-[15px] `,
                { fontFamily: "Poppins-SemiBold" },
              ]}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <CardDetails />
      <TouchableOpacity
        style={tw`bg-[#FF4E00] rounded-[20px] mx-4 items-center py-4 px-4`}
        onPress={() => navigation.navigate("PaymentSucessful")}
      >
        <Text
          style={[
            tw`text-white text-[24px] `,
            { fontFamily: "Poppins-SemiBold" },
          ]}
        >
          Pay
        </Text>
      </TouchableOpacity>
      <View style={tw`items-center my-3`}>
        <Text
          style={[tw`h-[30px] text-[22px] `, { fontFamily: "Poppins-Medium" }]}
        >
          {" "}
          Top up Wallet
        </Text>
      </View>
      <View style={tw`mt-2`}>
        <Text
          style={[
            tw`h-[35px] text-[18px] font-black mx-4`,
            { fontFamily: "Poppins-Medium" },
          ]}
        >
          {" "}
          Other payment method
        </Text>
      </View>

      <TouchableOpacity
        style={tw`flex-row flex rounded-[20px] bg-white mx-4 items-center py-4 px-4 mt-2`}
      >
        <Icon
          name="plus"
          color="white"
          type="antdesign"
          style={tw`p-1 bg-[#FF4E00] rounded-lg w-10`}
        />
        <Text
          style={[
            tw`text-black text-[15px]   ml-[80px]`,
            { fontFamily: "Poppins-Medium" },
          ]}
        >
          Pay with Bank
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`rounded-[20px] bg-white mx-4 items-center py-4 px-4 mt-2 flex-row flex`}
        onPress={() => navigation.navigate("AddPaymentMethod")}
      >
        <Icon
          name="plus"
          color="white"
          type="antdesign"
          style={tw`p-1 bg-[#FF4E00] rounded-lg w-10`}
        />
        <Text
          style={[
            tw`text-black text-[15px]   ml-[80px]`,
            { fontFamily: "Poppins-Medium" },
          ]}
        >
          Add Payment Method
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WalletHome;
