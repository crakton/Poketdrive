import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";

const Settings = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();
  return (
    <SafeAreaView>
      <HeaderWithBackButton navigation={navigation} title="Settings" />
      <View style={tw`relative`}>
        <View>
          <TouchableOpacity
            style={tw`flex-row justify-between pt-[50] pb-[20] border-b border-[#E2E2E2] mx-[20] `}
          >
            <Text style={[tw` text-[16px] `, { fontFamily: "Poppins-Medium" }]}>
              {" "}
              Account Information{" "}
            </Text>

            <Icon
              name="navigate-next"
              color="black"
              type="MaterialIcons"
              style={tw`p-1  rounded-lg w-10`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row justify-between py-[20] border-b border-[#E2E2E2] mx-[20] `}
          >
            <Text style={[tw` text-[16px] `, { fontFamily: "Poppins-Medium" }]}>
              {" "}
              Payment Infomation{" "}
            </Text>

            <Icon
              name="navigate-next"
              color="black"
              type="MaterialIcons"
              style={tw`p-1  rounded-lg w-10`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row justify-between py-[20] border-b border-[#E2E2E2] mx-[20] `}
          >
            <Text style={[tw` text-[16px] `, { fontFamily: "Poppins-Medium" }]}>
              {" "}
              Region/Country
            </Text>

            <Icon
              name="navigate-next"
              color="black"
              type="MaterialIcons"
              style={tw`p-1  rounded-lg w-10`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row justify-between py-[20] border-b border-[#E2E2E2] mx-[20] `}
            onPress={() => navigation.navigate("FAQs")}
          >
            <Text style={[tw` text-[16px] `, { fontFamily: "Poppins-Medium" }]}>
              {" "}
              Help/FAQs
            </Text>

            <Icon
              name="navigate-next"
              color="black"
              type="MaterialIcons"
              style={tw`p-1  rounded-lg w-10`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row justify-between py-[20] border-b border-[#E2E2E2] mx-[20] `}
          >
            <Text style={[tw` text-[16px] `, { fontFamily: "Poppins-Medium" }]}>
              {" "}
              Terms of use
            </Text>

            <Icon
              name="navigate-next"
              color="black"
              type="MaterialIcons"
              style={tw`p-1  rounded-lg w-10`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row justify-between py-[20] border-b border-[#E2E2E2] mx-[20] `}
          >
            <Text style={[tw` text-[16px] `, { fontFamily: "Poppins-Medium" }]}>
              {" "}
              URide preferences{" "}
            </Text>

            <Icon
              name="navigate-next"
              color="black"
              type="MaterialIcons"
              style={tw`p-1  rounded-lg w-10`}
            />
          </TouchableOpacity>
        </View>
        <View style={tw`relative top-[30] `}>
          <TouchableOpacity
            style={tw`justify-center items-center`}
            onPress={() => navigation.navigate("Home")}
          >
            <Text
              style={[
                tw` text-[18px] ml-[-5]`,
                { fontFamily: "Poppins-SemiBold" },
              ]}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
