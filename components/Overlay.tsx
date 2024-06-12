import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";

const Overlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <View
      style={[
        tw`absolute inset-0 bg-black bg-opacity-50 justify-center items-center z-50`,
      ]}
    >
      {children}
    </View>
  );
};

export default Overlay;

const styles = StyleSheet.create({});
