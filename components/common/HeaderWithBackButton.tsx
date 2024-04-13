import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Icon } from "@rneui/base";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderWithBackButtonProps {
  navigation?: any;
  title?: string;
}

const HeaderWithBackButton: React.FC<HeaderWithBackButtonProps> = ({
  navigation,
  title,
}) => {
  return (
    <SafeAreaView style={tw`flex flex-row items-center justify-between px-5 pt-3`}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" type="ionicon" color="black" />
      </TouchableOpacity>
      {title && (
        <Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
          {title}
        </Text>
      )}
      <Text></Text>
    </SafeAreaView>
  );
};

export default HeaderWithBackButton;
