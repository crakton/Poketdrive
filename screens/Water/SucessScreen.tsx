import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import tw from "twrnc";
import ContinueButton from "../../components/ui/ContinueButton";

const SuccessScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1  justify-start mt-[30%] items-center px-6`}>
      <Text style={tw`text-[22px] font-bold text-[#252B5C] text-center`}>
        Your transaction is
      </Text>
      <Text style={tw`text-[22px] font-bold text-[#252B5C] text-center`}>
        successful
      </Text>
      <Text style={tw`text-[#53587A] text-[12px] mt-6`}>congratulations!</Text>

      <View style={tw`border border-black rounded-full p-6 mt-6`}>
        <Feather name="check" size={50} color="black" />
      </View>

      <View style={tw`w-full px-8  mt-6`}>
        <ContinueButton
          text={"Explore more properties"}
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
          disabled={false}
        />
      </View>

      <TouchableOpacity style={tw`flex-row items-center`}>
        <Text style={tw`text-blue-900 text-sm`}>View Transactions</Text>
        <Feather name="share-2" size={16} color="black" style={tw`ml-2`} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SuccessScreen;
