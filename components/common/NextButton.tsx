import React from "react";
import { TouchableOpacity, Text } from "react-native";
import tw from "twrnc";

const NextButton = ({ onPress }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`rounded bg-[#404040] w-full rounded-lg p-3 mt-10`}
    >
      <Text style={tw`text-center text-white text-[20px] font-bold`}>Next</Text>
    </TouchableOpacity>
  );
};

export default NextButton;
