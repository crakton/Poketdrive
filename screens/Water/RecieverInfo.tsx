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
import React, { useState } from "react";

const RecieverInfo = () => {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(
    null
  );
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-1 px-5 pb-5`}>
        <ScrollView contentContainerStyle={tw`flex-grow`}>
          <View style={tw`gap-4 mt-2`}>
            <Text style={tw`text-[#191D31] text-[17px] pl-3 font-semibold`}>
              Receivers information
            </Text>
            <TextInput
              style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4`}
              placeholder="Enter receivers name"
              placeholderTextColor="#4B5563"
            />
            <TextInput
              style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4`}
              placeholder="Enter receiver phone"
              placeholderTextColor="#4B5563"
            />
            <TextInput
              style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4`}
              placeholder="Address"
              placeholderTextColor="#4B5563"
            />
            <TextInput
              style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4`}
              placeholder="Preferred delivery time"
              placeholderTextColor="#4B5563"
            />
            <TextInput
              style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4`}
              placeholder="Delivery instruction"
              placeholderTextColor="#4B5563"
            />
          </View>
        </ScrollView>
        {/* Button stays at the bottom */}
        <View style={tw`mt-5`}>
          <ContinueButton
            text={"get quote"}
            onPress={() => navigate("Onboarding")}
            disabled={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RecieverInfo;
