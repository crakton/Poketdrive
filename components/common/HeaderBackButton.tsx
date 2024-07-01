// HeaderBackButton.js

import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import tw from "twrnc";

const HeaderBackButton = ({ title, onBack }: any) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "RidePreference">
    >();
  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={onBack}>
        <Icon name="arrow-back-outline" type="ionicon" color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`bg-red-500 rounded-md`}
        onPress={() => navigation.navigate("ManageTrips")}
      >
        <Text
          style={[tw`px-2 text-white py-1`, { fontFamily: "Poppins-Regular" }]}
        >
          Manage trip
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginHorizontal: "2%",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});

export default HeaderBackButton;
