import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "@rneui/base";

interface CustomCheckboxProps {
  checked: boolean;
  onPress: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkbox}>
      {checked && <Icon name="check" type="material" color="white" size={20} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    backgroundColor: "#D9D9D9",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomCheckbox;
