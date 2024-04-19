import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Icon, Text } from "@rneui/base";
import tw from "twrnc";
import { AuthStackParamList } from "../../nav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TripForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, "TripForm">>();
  const [fromwhere, setFromWhere] = useState("");
  const [towhere, setToWhere] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleSearch = () => {
    // Basic validation
    // if (!fromwhere || !towhere || !departureTime) {
    //   Alert.alert("Please fill all fields");
    //   return;
    // }

    // Handle sign-up logic here if validation passes
    console.log("Signing up...");
    navigation.navigate("RideSelection");
  };

  const handleConfirm = (date: any) => {
    setDepartureTime(date.toLocaleString());
    setDatePickerVisibility(false);
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <Icon name="location" type="ionicon" color="red" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="From where?"
          value={fromwhere}
          onChangeText={setFromWhere}
        />
      </View>
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
      <View style={styles.inputContainerDate}>
        <Icon name="time" type="ionicon" color="red" style={styles.icon} />
        <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
          <Text style={tw``}>{departureTime || "Select Departure Time"}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          textColor="#000000"
          minimumDate={new Date()}
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </View>
      <TouchableOpacity
        style={tw`rounded-[1rem] bg-[#333333] p-3 my-2`}
        onPress={handleSearch}
      >
        <Text
          style={[
            tw`text-center text-xl text-white`,
            { fontFamily: "Poppins-Bold" },
          ]}
        >
          Search
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
  inputContainerDate: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 10,
    fontFamily: "Poppins-Regular",
  },
});

export default TripForm;
