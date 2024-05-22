import React from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";

interface LoaderProps {
  size?: "small" | "large";
  color?: string;
}

const { width, height } = Dimensions.get("window");

const Loader: React.FC<LoaderProps> = ({
  size = "large",
  color = "#F25B3E",
}) => {
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
    zIndex: 999,
  },
});

export default Loader;
