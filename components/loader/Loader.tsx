import React from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";

interface LoaderProps {
  size?: "small" | "large";
  color?: string;
  isVisible: boolean;
}

const { width, height } = Dimensions.get("window");

const Loader: React.FC<LoaderProps> = ({ size = "large", color = "#F25B3E", isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={[styles.container, { width, height }]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 999,
  },
});

export default Loader;
