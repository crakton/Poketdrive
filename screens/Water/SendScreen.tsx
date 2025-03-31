import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import ContinueButton from "../../components/ui/ContinueButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";

function SendScreen() {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(
    null
  );
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`px-5 pb-10`}>
        <View style={tw`flex gap-4 mt-2`}>
          <Text style={tw`text-[#191D31] text-[17px] pl-3 font-semibold`}>
            Senders information
          </Text>
          <TextInput
            style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4`}
            placeholder="Enter sender name"
            placeholderTextColor="#4B5563"
          />
          <TextInput
            style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4`}
            placeholder="Enter sender phone"
            placeholderTextColor="#4B5563"
          />
          <TextInput
            style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4`}
            placeholder="Enter sender email"
            placeholderTextColor="#4B5563"
          />
          <TextInput
            style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4`}
            placeholder="Pickup Address"
            placeholderTextColor="#4B5563"
          />
          <TextInput
            style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4 mt-7`}
            placeholder="Preferred Pick up time"
            placeholderTextColor="#4B5563"
          />
          <TextInput
            style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4 pb-20`}
            placeholder="Description"
            placeholderTextColor="#4B5563"
          />

          <View style={tw`flex gap-2 mt-3`}>
            <Text style={tw`text-[#101828] text-[12px] pl-3 font-semibold`}>
              Parcel Information
            </Text>
            <TextInput
              style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4`}
              placeholder="Net Weight"
              placeholderTextColor="#4B5563"
            />
          </View>

          <View>
            <Text style={tw`text-[#101828] text-[12px] pl-3 font-semibold`}>
              Dimensions
            </Text>

            <View style={tw`flex flex-row justify-start gap-5 mt-2`}>
              {["L", "B", "H"].map((dimension) => (
                <TouchableOpacity
                  key={dimension}
                  onPress={() => setSelectedDimension(dimension)}
                  style={tw`border border-[#000000] rounded-[21px] p-4 w-[54px] flex items-center justify-center ${
                    selectedDimension === dimension ? "bg-gray-300" : ""
                  }`}
                >
                  <Text
                    style={tw`${
                      selectedDimension === dimension
                        ? "text-black"
                        : "text-[#101828]"
                    }`}
                  >
                    {dimension}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={tw`flex-wrap flex-row justify-start gap-2 mt-5`}>
              {[
                "Book",
                "Goods",
                "Cosmetics",
                "Electronic",
                "Medicine",
                "Others",
              ].map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setSelectedPackage(type)}
                  style={tw`border border-[#000000] rounded-[21px] p-4 flex items-center justify-center ${
                    selectedPackage === type ? "bg-gray-300" : ""
                  }`}
                >
                  <Text
                    style={tw`${
                      selectedPackage === type ? "text-black" : "text-[#101828]"
                    }`}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <ContinueButton
            text={"Next"}
            onPress={() => navigation.navigate("RecieverInfo")}
            disabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SendScreen;
