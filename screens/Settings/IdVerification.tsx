import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/base";
import React from "react";
import tw from "twrnc";
import Profile from "../../components/Settings/Profile";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../nav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const IdVerification = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();
  return (
    <View style={tw`justify-between flex-1`}>
      <View>
        <Profile />
        <View style={tw`flex-row justify-between mt-[40] items-center px-[10]`}>
          <Text
            style={[
              tw` text-[16px] ml-[20]`,
              { fontFamily: "Poppins-Regular" },
            ]}
          >
            Account Verification
          </Text>
          <TouchableOpacity
            style={tw` bg-[#1DA664] mr-[20] rounded-[5]`}
            onPress={() => navigation.navigate("IdVerification")}
          >
            <Text
              style={[
                tw` text-[12px] p-[10] px-[15] text-white`,
                { fontFamily: "Poppins-Bold" },
              ]}
            >
              Active
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`p-[10] px-[60]`}>
          <Text style={[tw` text-[18px] `, { fontFamily: "Poppins-Bold" }]}>
            Verification
          </Text>
        </View>
        <View style={tw`bg-white mx-[30] rounded-[5]  py-2`}>
          <View style={tw`flex-row items-center px-10 `}>
            <Icon
              name="credit-card"
              color="#D9D9D9"
              type="MaterialIcons"
              style={tw` rounded-lg `}
            />
            <TouchableOpacity onPress={() => navigation.navigate("IdDetails")}>
              <Text
                style={[tw` text-[14px]`, { fontFamily: "Poppins-Medium" }]}
              >
                Driver's License
              </Text>
            </TouchableOpacity>
            <View style={tw`flex-row items-center px-[10]`}>
              <Icon
                name="filter-center-focus"
                color="#gray"
                type="MaterialIcons"
                style={tw` rounded-lg h-[15px] mb-[5px] `}
              />
              <View style={tw`bg-[#D9D9D9] rounded-[3px] px-[5]`}>
                <Text
                  style={[tw`text-[10px]`, { fontFamily: "Poppins-SemiBold" }]}
                >
                  Required For Drivers
                </Text>
              </View>
            </View>
          </View>
          <View style={tw`flex-row items-center px-10 `}>
            <Icon
              name="credit-card"
              color="#D9D9D9"
              type="MaterialIcons"
              style={tw` rounded-lg `}
            />
            <TouchableOpacity onPress={() => navigation.navigate("IdDetails")}>
              <Text
                style={[tw` text-[14px]`, { fontFamily: "Poppins-Medium" }]}
              >
                NIN Slip *
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row items-center px-10 `}>
            <Icon
              name="credit-card"
              color="#D9D9D9"
              type="MaterialIcons"
              style={tw` rounded-lg `}
            />
            <TouchableOpacity onPress={() => navigation.navigate("IdDetails")}>
              <Text
                style={[tw` text-[14px]`, { fontFamily: "Poppins-Medium" }]}
              >
                National ID
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row items-center px-10 `}>
            <Icon
              name="credit-card"
              color="#D9D9D9"
              type="MaterialIcons"
              style={tw` rounded-lg `}
            />
            <TouchableOpacity onPress={() => navigation.navigate("IdDetails")}>
              <Text
                style={[tw` text-[14px]`, { fontFamily: "Poppins-Medium" }]}
              >
                Voter's Card
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={[
            tw`flex bg-[#FF4E00]  items-center justify-center mt-[15] mx-[20] rounded-[4] p-[15]`,
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
        </View>

        <View>
        
          <TouchableOpacity
            style={tw`justify-center items-center `}
            onPress={() => navigation.navigate("AccountVerification")}
          >
            <Text
              style={[
                tw` text-[16px] ml-[-5]`,
                { fontFamily: "Poppins-SemiBold" },
              ]}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      
    </View>
  );
};

export default IdVerification;

const styles = StyleSheet.create({});
