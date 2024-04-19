import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tailwind from "twrnc";
import { Icon } from "@rneui/base";
import { SvgXml } from "react-native-svg";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import { AuthStackParamList } from "../../nav";

interface CardProps {
  name: string;
  avatarUri: string;
  carDescription: string;
  onDelete: () => void;
  onCall: () => void;
  onChat: () => void;
}

const TripItineraryCard: React.FC<CardProps> = ({
  name,
  avatarUri,
  carDescription,
  onDelete,
  onCall,
  onChat,
}: CardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.horizontalLine} />
      <View style={tailwind`flex flex-row justify-between items-center`}>
        <View style={tailwind`flex flex-row gap-4`}>
          <View>
            <Avatar size={50} rounded source={{ uri: avatarUri }} />
          </View>
          <View>
            <Text style={[tailwind`text-lg`, { fontFamily: "Poppins-Bold" }]}>
              {name}
            </Text>
            <Text
              style={[tailwind`text-[12px]`, { fontFamily: "Poppins-Light" }]}
            >
              {carDescription}
            </Text>
          </View>
        </View>
        <View>
          <View
            style={tailwind`flex flex-row items-center justify-center gap-2`}
          >
            <TouchableOpacity
              style={tailwind`p-2 rounded-full bg-[#049813]`}
              onPress={onCall}
            >
              <Icon name="call-outline" type="ionicon" color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={tailwind`p-2 rounded-full bg-[#FF0000]`}
              onPress={onChat}
            >
              <Icon
                name="chatbubble-ellipses-sharp"
                type="ionicon"
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <Icon name="trash-outline" type="ionicon" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TripItineraryCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: "#FFF",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  verticalLine: {
    width: 1.5,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 11.3,
    height: 20,
  },
  horizontalLine: {
    height: 3,
    backgroundColor: "#D9D9D9",
    marginVertical: 15,
    marginHorizontal: 10,
  },
});
