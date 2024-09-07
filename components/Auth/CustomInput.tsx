import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import tailwind from "twrnc";

type CustomInputProps = {
  label: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  style?: object;
};

const CustomInput = ({
  label,
  placeholder = "",
  onChangeText,
  secureTextEntry = false,
  style,
}: CustomInputProps) => {
  const [value, setValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChangeText = (text: string) => {
    setValue(text);
    onChangeText(text);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.inputText}>
          {value
            ? secureTextEntry
              ? "•".repeat(value.length)
              : value
            : placeholder}
        </Text>
      </TouchableOpacity>

      {/* Modal for input */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.textInput}
              value={value}
              onChangeText={handleChangeText}
              secureTextEntry={secureTextEntry}
              autoFocus={true}
              placeholder={placeholder}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    height: 50,
    borderRadius: 5,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  inputText: {
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
  modalButton: {
    backgroundColor: "#F25B3E",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomInput;
