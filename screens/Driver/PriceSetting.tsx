import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
const PriceSetting = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "PriceSetting">
    >();

    const [price, setPrice] = useState("");

  return (
    <SafeAreaView style={tw`bg-[#FFFFFF] h-full`}>
      <ScrollView>
        <HeaderWithBackButton navigation={navigation} />
        <View style={tw`px-5`}>
          <View>
            <Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
              Pricing
            </Text>
            <Text
              style={[tw`text-[16px]  pt-2`, { fontFamily: "Poppins-Light" }]}
            >
              Set a price that each seat would pay be able to cover your fuel
              and other expenses{" "}
            </Text>
            <Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
              Prices are in naira
            </Text>
          </View>

          <View style={tw`flex mt-5 justify-center`}>
            <Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
              Prices are in naira
            </Text>
            <View
              style={tw`flex flex-row items-center border rounded-lg  my-5 py-2 px-2  justify-center w-[13rem]`}
            >
              <TextInput
                style={styles.input}
                placeholder="Enter a Price"
                keyboardType="numeric"
                value={price}
                onChangeText={(value) => setPrice(value)}
              />
              <TouchableOpacity>
                <Text style={[tw``, { fontFamily: "Poppins-Bold" }]}>
                  Naira
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={tw`rounded-[1rem] bg-[#333333] p-3 mt-[19rem] mx-5`}
          onPress={() => navigation.navigate("ManageTrips")}
        >
          <Text
            style={[
              tw`text-center text-xl text-white`,
              { fontFamily: "Poppins-Bold" },
            ]}
          >
            Post a Trip
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PriceSetting;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontFamily: "Poppins-Regular",
  },
});
