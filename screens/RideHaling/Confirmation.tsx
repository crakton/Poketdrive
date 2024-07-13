import { Modal, StyleSheet, Text, View, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import MapScreen from "./MapScreen";
import { Icon } from "@rneui/base";

const Confirmation = () => {
  const stack = createNativeStackNavigator();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const [modalVisible, setModalVisible] = useState(true); // Show modal immediately

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (modalVisible) {
          setModalVisible(false);
          return true; // Prevent default back press behavior
        }
        return false;
      }
    );

    // Set timeout to navigate to another screen after 5 seconds
    const timeout = setTimeout(() => {
      setModalVisible(false);
      navigation.navigate("CarIdentification");
    }, 5000);

    return () => {
      clearTimeout(timeout); // Cleanup function for useEffect
      backHandler.remove(); // Remove event listener
    };
  }, [modalVisible, navigation]); // Pass modalVisible and navigation as dependencies

  return (
    <View style={{ flex: 1 }}>
      {/* <View style={tw`h-[100%]`}>
        <stack.Navigator>
          <stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{
              headerShown: false,
            }}
          />
        </stack.Navigator>
      </View> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Icon
            name="message"
            color="black"
            type="Entypo"
            style={tw` rounded-lg `}
          />
          <Text style={styles.modalText}>Awaiting driver confirmation</Text>
        </View>
      </Modal>
      {/* Backdrop component with blur effect */}
      {modalVisible && <View style={styles.backdrop} />}
    </View>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)", // Semi-transparent white background
    width: 333,
    height: "auto",
    borderRadius: 15,
    alignSelf: "center",
    marginTop: "85%",
    marginBottom: "85%",
    elevation: 300,
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    // Add blur effect
  },
});
