import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import tw, { style } from "twrnc";
import Map from "../../components/Map";
import RideVerification from "../../components/Extras/RideVerification";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";

const CarIdentification = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();

  return (
    <View>
      <View style={tw`z-50 absolute top-8 `}>
        <HeaderWithBackButton navigation={navigation} />
      </View>
      <View style={tw`h-[65%]`}>
        <Map />
      </View>
      <View style={tw` h-[35%]`}>
        <RideVerification
          title="Identify if you at the car"
          classes={{ cardContainer: styles.cardContainer }}
          direction="RideIdentification"
        />
      </View>
    </View>
  );
};

export default CarIdentification;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
});
