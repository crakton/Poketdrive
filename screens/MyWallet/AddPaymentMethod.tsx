import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";

import { Tab } from "@rneui/base";
// import { TextInput } from 'react-native-gesture-handler';

const AddPaymentMethod = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <HeaderWithBackButton navigation={navigation} />
        <ScrollView>
          <View
            style={tw`flex-row h-[50px]  mt-1 mb-2 mx-5 items-center justify-between`}
          >
            <View>
              <Text
                style={[
                  tw`text-[25px] `,
                  { fontFamily: "Poppins-SemiBold" },
                ]}
              >
                Add Payment Method
              </Text>
            </View>
          </View>
          <View style={tw`mt-3`}>
            <Text style={[tw`mb-3 ml-6 text-[18px] `,{ fontFamily: "Poppins-SemiBold" }]}>
              Name on card
            </Text>
            <TextInput style={Styles.Input} placeholder="Enter Your Name" />
          </View>
          <View style={tw`mt-5`}>
            <Text style={[tw`mb-3 ml-6 text-[18px] `,{ fontFamily: "Poppins-SemiBold" }]}>Card number</Text>
            <TextInput
              keyboardType="numeric"
              style={Styles.Input}
              placeholder="xxxx xxxx xxxx xxxx "
            />
          </View>
          <View style={tw`flex-row`}>
            <View style={tw`mt-6`}>
              <Text style={[tw`mb-3 ml-6 text-[18px] `,{ fontFamily: "Poppins-SemiBold" }]}>
                Expiration
              </Text>
              <TextInput
                keyboardType="numeric"
                style={Styles.Input}
                placeholder="xxxx xxxx xxxx xxxx "
              />
            </View>
            <View style={tw`mt-6`}>
              <Text style={[tw`mb-3 ml-6 text-[18px] `,{ fontFamily: "Poppins-SemiBold" }]}>Cvv</Text>
              <TextInput
                keyboardType="numeric"
                style={Styles.Cvv}
                placeholder="3 4 7"
              />
            </View>
          </View>
          <View style={tw`mt-5`}>
            <Text style={[tw`mb-3 ml-6 text-[18px] `,{ fontFamily: "Poppins-SemiBold" }]}>Amount</Text>
            <TextInput
              keyboardType="numeric"
              style={Styles.Input}
              placeholder="1000"
            />
          </View>
          <TouchableOpacity
            style={tw`bg-[#FF4E00] p-4 items-center mt-3 mx-6 rounded-5`}
          >
            <Text style={[tw`text-white text-[4]`,{fontFamily:"Poppins-SemiBold"}]}>Fund wallet</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Styles = StyleSheet.create({
  Input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  Cvv: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 70,
  },
});

export default AddPaymentMethod;

