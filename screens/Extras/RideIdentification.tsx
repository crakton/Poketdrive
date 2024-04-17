import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import Map from "../../components/Map";
import RideVerification from "../../components/Extras/RideVerification";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import Overlay from "../../components/Overlay";

const RideIdentification = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();

  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowOverlay(false);
      navigation.navigate('RideProgress'); // Replace 'NextScreen' with the name of the screen you want to navigate to
    }, 4000); // 5 seconds timeout

    return () => clearTimeout(timeout); // Cleanup function for useEffect
  }, [navigation]);

  return (
    <View>
      <View style={{ position: "absolute", top: 8, zIndex: 50 }}>
        <HeaderWithBackButton navigation={navigation} />
      </View>
      <View style={{ height: "65%" }}>
        <Map />
      </View>
      <View style={{ height: "35%" }}>
        <RideVerification
          title="Identify if you are at the car"
          classes={{ cardContainer: styles.cardContainer }}
          direction="RideIdentification"
        />
      </View>
      {showOverlay && (
        <Overlay>
          <View style={styles.overlayContent}>
            <Image
              source={require("../../assets/accept.jpg")}
              style={{ width: 180, height: 180, borderRadius: 100 }}
            />
          </View>
        </Overlay>
      )}
    </View>
  );
};

export default RideIdentification;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
  overlayContent: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
