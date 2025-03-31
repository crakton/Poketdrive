import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import ContinueButton from "../../components/ui/ContinueButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";

const QuoteScreen = () => {
  const [selectedOption, setSelectedOption] = useState("express");
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={tw`flex-1 bg-white px-5`}>
      <ScrollView contentContainerStyle={tw`flex-grow px-5`}>
        <Text style={tw`text-xl font-bold text-[#191D31] mt-3`}>Quote</Text>

        <View style={tw`mt-4 flex-row border border-[#000000] rounded-lg`}>
          <TextInput
            style={tw`flex-1 p-4 text-gray-700`}
            placeholder="Coupon"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity style={tw`px-5 py-3    rounded-r-lg`}>
            <Text style={tw`text-[#000000] font-normal`}>apply</Text>
          </TouchableOpacity>
        </View>
        <Text style={tw`text-[#101828] mt-6 text-[12px] font-normal`}>
          Shipment Date
        </Text>
        <Text style={tw`text-[#101828] text-[12px] font-normal`}>
          03 / 11 / 2025
        </Text>

        <Text style={tw`text-gray-700 mt-12 font-normal text-[14px]`}>
          Estimated Delivery Time
        </Text>

        <TouchableOpacity
          onPress={() => setSelectedOption("express")}
          style={tw`mt-2 p-5 border rounded-lg ${
            selectedOption === "express" ? "border-black" : "border-gray-300"
          }`}
        >
          <View style={tw`flex-row items-start`}>
            <View
              style={tw`w-5 h-5 rounded-full  flex items-center justify-center mt-2 ${
                selectedOption === "express" ? " bg-gray-300" : "bg-gray-300"
              } mr-3`}
            >
              <View
                style={tw`w-3 h-3 rounded-full  ${
                  selectedOption === "express" ? "border-black bg-black" : ""
                }`}
              />
            </View>
            <View>
              <Text style={tw`text-black text-[12px] font-normal`}>
                Express Cost
              </Text>

              <Text style={tw`text-[#101828] text-[12px] font-semibold mt-1`}>
                Mon, 17, March
              </Text>
              <Text style={tw`text-[#101828] text-[12px] mt-1`}>
                Latest by 5th of April
              </Text>
              <Text style={tw`text-black font-bold text-xl mt-2`}>
                NGN 345,999
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedOption("standard")}
          style={tw`mt-4 p-5 border rounded-lg ${
            selectedOption === "standard" ? "border-black" : "border-gray-300"
          }`}
        >
          <View style={tw`flex-row items-start`}>
            <View
              style={tw`w-5 h-5 rounded-full mt-2  flex items-center justify-center ${
                selectedOption === "standard" ? " bg-gray-300" : "bg-gray-400"
              } mr-3`}
            >
              <View
                style={tw`w-3 h-3 rounded-full border ${
                  selectedOption === "standard"
                    ? "border-black bg-black"
                    : "border-gray-400"
                }`}
              />
            </View>
            <View>
              <Text style={tw`text-black text-[12px] font-normal`}>
                Standard Cost
              </Text>

              <Text style={tw`text-[#101828] text-[12px] font-semibold mt-1`}>
                Mon, 17, March
              </Text>
              <Text style={tw`text-[#101828] text-[12px] mt-1`}>
                Latest by 5th of April
              </Text>
              <Text style={tw`text-black font-bold text-xl mt-2`}>
                NGN 345,999
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <View style={tw`px-5 `}>
        <ContinueButton
          text={"Proceed"}
          onPress={() => navigate("SummaryScreen")}
          disabled={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default QuoteScreen;
