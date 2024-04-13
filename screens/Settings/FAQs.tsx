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

const FAQs = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();
  return (
    <SafeAreaView>
      <HeaderWithBackButton navigation={navigation} title="FAQs" />
      <View style={tw`relative`}>
        <View style={tw` border-t border-black mt-[20] p-[10] px-[20]`}>
          <View>
            <TouchableOpacity
              style={tw`flex-row justify-between items-center `}
            >
              <Text
                style={[tw` text-[14px] `, { fontFamily: "Poppins-SemiBold" }]}
              >
                {" "}
                What is uRide?{" "}
              </Text>

              <Icon
                name="keyboard-arrow-down"
                color="black"
                type="MaterialIcons"
                style={tw`p-1  rounded-lg w-10`}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={[tw` text-[13px] `, { fontFamily: "Poppins-Regular" }]}
            >
              uRide is a carpooling platform that connects drivers with empty
              seats in their vehicles with passengers traveling in the same
              direction
            </Text>
          </View>
        </View>
        <View style={tw` border-t border-[#E2E2E2] mt-[20] py-[10] mx-[20]`}>
          <View>
            <TouchableOpacity
              style={tw`flex-row justify-between items-center `}
            >
              <Text
                style={[tw` text-[14px] `, { fontFamily: "Poppins-SemiBold" }]}
              >
                {" "}
                How does uRide work for drivers?{" "}
              </Text>

              <Icon
                name="keyboard-arrow-down"
                color="black"
                type="MaterialIcons"
                style={tw`p-1  rounded-lg w-10`}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={[tw` text-[13px] `, { fontFamily: "Poppins-Regular" }]}
            >
              Drivers can create ride listings, set the departure time and
              location, and specify the number of available seats. Passengers
              can then request to join the ride.
            </Text>
          </View>
        </View>
        <View style={tw` border-t border-[#E2E2E2] mt-[20] py-[10] mx-[20]`}>
          <View>
            <TouchableOpacity
              style={tw`flex-row justify-between items-center `}
            >
              <Text
                style={[tw` text-[14px] `, { fontFamily: "Poppins-SemiBold" }]}
              >
                {" "}
                How does uRide work for drivers?{" "}
              </Text>

              <Icon
                name="keyboard-arrow-down"
                color="black"
                type="MaterialIcons"
                style={tw`p-1  rounded-lg w-10`}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={[tw` text-[13px] `, { fontFamily: "Poppins-Regular" }]}
            >
              Drivers can create ride listings, set the departure time and
              location, and specify the number of available seats. Passengers
              can then request to join the ride.
            </Text>
          </View>
        </View>
        <View style={tw` border-t border-[#E2E2E2] mt-[20] py-[10] mx-[20]`}>
          <View>
            <TouchableOpacity
              style={tw`flex-row justify-between items-center `}
            >
              <Text
                style={[tw` text-[14px] `, { fontFamily: "Poppins-SemiBold" }]}
              >
                {" "}
                How does uRide work for drivers?{" "}
              </Text>

              <Icon
                name="keyboard-arrow-down"
                color="black"
                type="MaterialIcons"
                style={tw`p-1  rounded-lg w-10`}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={[tw` text-[13px] `, { fontFamily: "Poppins-Regular" }]}
            >
              Drivers can create ride listings, set the departure time and
              location, and specify the number of available seats. Passengers
              can then request to join the ride.
            </Text>
          </View>
        </View>
        <View style={tw` border-t border-[#E2E2E2] mt-[20] py-[10] mx-[20]`}>
          <View>
            <TouchableOpacity
              style={tw`flex-row justify-between items-center `}
            >
              <Text
                style={[tw` text-[14px] `, { fontFamily: "Poppins-SemiBold" }]}
              >
                {" "}
                How do I pay for a ride on uRide?{" "}
              </Text>

              <Icon
                name="keyboard-arrow-down"
                color="black"
                type="MaterialIcons"
                style={tw`p-1  rounded-lg w-10`}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={[tw` text-[13px] `, { fontFamily: "Poppins-Regular" }]}
            >
              Payment is typically made through the uRide platform, and it may
              involve credit card or other online payment methods.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FAQs;

const styles = StyleSheet.create({});
