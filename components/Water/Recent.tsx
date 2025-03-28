import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import React from "react";
import { SvgXml } from "react-native-svg";

const Recent = (item: any) => {
  return (
    <TouchableOpacity
      style={tw`border border-gray-200 rounded-[12px] h-[70px] p-3 flex-row gap-2 justify-between items-center m-1 mb-3`}
    >
      <View style={tw`flex-row gap-2 items-center`}>
        <View
          style={tw`flex justify-center items-center w-[50px] h-[50px] bg-gray-200 rounded-[10px]`}
        >
          <SvgXml xml={item.icon} />
        </View>
        <View style={tw`flex gap-1`}>
          <Text style={tw`text-[#191D31] text-[14px] pl-3 font-normal`}>
            {item.trackingNumber}
          </Text>
          <Text style={tw`text-[#A7A9B7] text-[14px] pl-3 font-normal`}>
            {item.status}
          </Text>
        </View>
      </View>

      <View>
        <Text style={tw`text-[#A7A9B7] text-[14px] font-normal`}>
          {item.time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Recent;

const styles = StyleSheet.create({});
