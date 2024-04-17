import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, BackHandler, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { Icon } from "@rneui/base";
import EndTrip from "./EndTrip";
import Home from "../RideHaling/Home";
import Settings from "../Settings/Settings";

const TripConfirmation = () => {
    const stack = createNativeStackNavigator();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [modalVisible, setModalVisible] = useState(true); // Show modal immediately

    const handleHomePress = () => {
        setModalVisible(false);
        navigation.navigate('Home');
    };

    const handleEndTripPress = () => {
        setModalVisible(false);
        navigation.navigate('EndTrip');
    };

    const handleSettingsPress = () => {
        setModalVisible(false);
        navigation.navigate('Settings');
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={tw`h-[100%]`}>
                <stack.Navigator>
                    <stack.Screen
                        name="EndTrip"
                        component={EndTrip}
                        options={{
                            headerShown: false,
                        }}
                    />
                </stack.Navigator>
            </View>
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
                        style={tw`rounded-lg`}
                    />
                    <Text style={styles.modalText}>Confirm you have reached </Text>
                    <Text style={styles.modalText}>your destination</Text>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={handleHomePress}>
                            <Icon
                                name="check-circle"
                                color="green"
                                type="MaterialIconss"
                                size={50} // Adjust the size as needed
                                style={tw`rounded-lg mr-5`}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleEndTripPress}>
                            <Icon
                                name="cancel"
                                color="red"
                                type="MaterialIcons"
                                size={50} // Adjust the size as needed
                                style={tw`rounded-lg`}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleSettingsPress}>
                        <Text style={styles.needHelpText}>Need help?</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* Backdrop component with blur effect */}
            {modalVisible && (
                <View style={styles.backdrop} />
            )}
        </View>
    );
}

export default TripConfirmation;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)', // Semi-transparent white background
        width: 333,
        height: 200, // Adjust the height as needed
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: '85%',
        marginBottom: '85%',
        elevation: 300,
    },
    modalText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    needHelpText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'blue',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
     // Add blur effect
    },
});
