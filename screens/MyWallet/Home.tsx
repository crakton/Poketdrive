import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
  RefreshControl,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../nav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import CardDetails from "../../components/MyWallet/CardDetails";
import ContinueButton from "@components/ui/ContinueButton";

const WalletHome = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();

  return (
    <View
      style={[tw`bg-[#FFFFFF] h-full`, { paddingTop: StatusBar.currentHeight }]}
    >
      <HeaderWithBackButton navigation={navigation} />
      <View
        style={tw`flex-row h-[50px] -mt-7   mb-2 mx-5 items-center justify-between`}
      >
        <View>
          <Text style={[tw`text-[18px] `, { fontFamily: "Poppins-SemiBold" }]}>
            My Wallet
          </Text>
        </View>
        <TouchableOpacity
          style={tw`bg-[#FF4E00] rounded-xl py-[5px] mb-2 px-4`}
          onPress={() => navigation.navigate("WalletHistory")}
        >
          <Text
            style={[
              tw`text-white text-[12px] `,
              { fontFamily: "Poppins-SemiBold" },
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-1 justify-between flex h-full`}>
        <CardDetails />
        <View style={tw`px-5 pb-10`}>
          <ContinueButton
            onPress={() => navigation.navigate("AddPaymentMethod")}
            text={"Top up Wallet"}
            disabled={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginRight: 15,
    marginLeft: 15,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  backgroundImage: {
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default WalletHome;
