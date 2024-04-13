import { StyleSheet, View, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { Image } from "@rneui/base";

const SocialLinks = () => {
  const data = [
    {
      id: 1,
      name: "Google",
      icon: require("../../assets/google.png"),
      link: "#",
    },
    {
      id: 2,
      name: "Twitter",
      icon: require("../../assets/twitter.png"),
      link: "#",
    },
    {
      id: 3,
      name: "Facebook",
      icon: require("../../assets/facebook.png"),
      link: "#",
    },
  ];

  return (
    <View style={styles.container}>
      {data.map((social) => (
        <TouchableOpacity
          key={social.id}
          style={[styles.socialIcon]}
          onPress={() => Linking.openURL(social.link)}
        >
          <Image style={styles.icon} source={social.icon} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    borderRadius: 20,
    padding: 10,
  },
  icon: {
    width: 40,
    height: 30,
    resizeMode: "contain",
  },
});

export default SocialLinks;
