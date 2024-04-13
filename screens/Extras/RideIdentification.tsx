import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ListItem } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Avatar, Icon, Image } from "@rneui/base";
import Map from "../../components/Map";
import RideVerification from "../../components/Extras/RideVerification";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import Overlay from "../../components/Overlay";

const RideIdentification = () => {
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
      <RideVerification  title='Identify if you at the car' classes={{ cardContainer: styles.cardContainer } } direction="RideIdentification"/>
      </View>
      <Overlay>
    
      <View style={tw` w-[200px] h-[200px] rounded-full justify-center items-center`}>
        <Image
          source={require("../../assets/accept.jpg")} // Replace with the path to your image
          style={{ width: 180, height: 180, borderRadius: 100 }} // Adjust the width, height, and borderRadius as needed
        />
      </View>
      </Overlay>
    </View>
  );
};

export default RideIdentification;
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor:"black",
    justifyContent: "center",
    alignItems:"center",
    padding:3
  },
});

