import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import tw, { style } from "twrnc";
import Map from "../../components/Map";
import RideVerification from "../../components/Extras/RideVerification";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";


const EndTrip = () => {
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
        title="End Trip"
        classes={{ cardContainer: styles.cardContainer }}
        direction="EndTrip"
      />
    </View>
  </View>
  )
}

export default EndTrip

const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: "#65B741",
      justifyContent: "center",
      alignItems: "center",
      padding: 3,
    },
    });
    