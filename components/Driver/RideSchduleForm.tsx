import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { CheckBox } from "@rneui/themed"; // Import CheckBox component
import { Icon, Text } from "@rneui/base";
import tw from "twrnc";
import { AuthStackParamList } from "../../nav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const RideSchduleForm = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "RideSchdule">
    >();
  const [fromwhere, setFromWhere] = useState("");
  const [towhere, setToWhere] = useState("");
  const [stopEnabled, setStopEnabled] = useState(false);
  const [additionalStops, setAdditionalStops] = useState<string[]>([]);

  const handleAddStop = () => {
    setAdditionalStops([...additionalStops, ""]);
  };
  const handleStopChange = (index: any, value: any) => {
    const stops = [...additionalStops];
    stops[index] = value;
    setAdditionalStops(stops);
  };

  const handleRemoveStop = (index: any) => {
    const stops = [...additionalStops];
    stops.splice(index, 1);
    setAdditionalStops(stops);
  };

  useEffect(() => {
    if (stopEnabled) {
      setAdditionalStops([""]);
    }
  }, [stopEnabled]);

  const handleSearch = () => {
    // Basic validation
    if (!fromwhere || !towhere) {
      Alert.alert("Please fill all fields");
      return;
    }

    // Handle sign-up logic here if validation passes
    console.log("Signing up...");
  };

  return (
    <View style={tw`flex gap-5`}>
      <View>
        <Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
          Ride details
        </Text>
        <View style={styles.inputContainer}>
          <Icon
            name="location"
            type="ionicon"
            color="red"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="From where?"
            value={fromwhere}
            onChangeText={setFromWhere}
          />
        </View>
      </View>
      <View>
        <Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
          Destination
        </Text>
        <View style={styles.inputContainer}>
          <Icon
            name="location"
            type="ionicon"
            color="green"
            style={styles.icon}
          />

          <TextInput
            style={styles.input}
            placeholder="To where?"
            value={towhere}
            onChangeText={setToWhere}
          />
        </View>
      </View>
      <View>
        <Text style={[tw`text-lg`, { fontFamily: "Poppins-Light" }]}>
          Stops
        </Text>
        <View
          style={tw`flex flex-row items-center justify-start border-dotted border rounded-lg`}
        >
          <CheckBox
            checkedColor="green"
            uncheckedColor="black"
            size={30}
            checked={stopEnabled}
            onPress={() => setStopEnabled(!stopEnabled)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
          <Text style={[tw`text-[12px]`, { fontFamily: "Poppins-Light" }]}>
            Add a stop to get more bookings
          </Text>
        </View>
      </View>
      <View>
        {stopEnabled &&
          additionalStops.map((stop, index) => (
            <View style={styles.inputContainer} key={index}>
              <TouchableOpacity onPress={() => handleRemoveStop(index)}>
                <Icon
                  name="remove"
                  type="ionicon"
                  color="red"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Enter a stop"
                value={stop}
                onChangeText={(value) => handleStopChange(index, value)}
              />
            </View>
          ))}
        {stopEnabled && (
          <TouchableOpacity onPress={handleAddStop}>
            <Icon name="add" type="ionicon" color="green" style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      <View>
        <Text style={[tw`text-2xl`, { fontFamily: "Poppins-Bold" }]}>
          Ride schedule
        </Text>
      </View>
      <TouchableOpacity
        style={tw`rounded-[1rem] bg-[#333333] p-3 my-2`}
        onPress={() => navigation.navigate("VehicleDetails")}
      >
        <Text
          style={[
            tw`text-center text-xl text-white`,
            { fontFamily: "Poppins-Bold" },
          ]}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
  },
  inputContainerStops: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 10,
    fontFamily: "Poppins-Regular",
  },
  inputStops: {
    flex: 1,
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontFamily: "Poppins-Regular",
  },
  inputEnabled: {
    backgroundColor: "#FFFFFF",
  },
});

export default RideSchduleForm;
