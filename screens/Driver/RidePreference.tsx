import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "twrnc";
import { SafeAreaView } from "react-native";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";

const RidePreference = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "RidePreference">
    >();
  const [selected, setSelected] = useState(null);
  const [twoBackRow, setTwoBackRow] = useState(false);
  const [threeBackRow, setThreeBackRow] = useState(false);
  const windowHeight = Dimensions.get("window").height;

  const HandleBackRowSeat = (selectedOption: string) => {
    if (selectedOption === "twoBackRow") {
      setTwoBackRow(true);
      setThreeBackRow(false);
    } else if (selectedOption === "threeBackRow") {
      setTwoBackRow(false);
      setThreeBackRow(true);
    }
  };

  const [carImageUri, setCarImageUri] = useState<string | null>(
    "https://avatars.githubusercontent.com/u/68823331?v=4"
  );
  // Image URL
  const imageURL = "https://avatars.githubusercontent.com/u/68823331?v=4";
  const carSeatSvg = `
    <svg width="20" height="20" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6594 2.716C12.9614 4.297 12.2984 7.588 11.0714 10.593C8.96643 15.749 8.96043 15.754 5.06743 15.232C0.517429 14.622 -0.98557 16.119 0.62743 19.658C1.54643 21.674 2.41343 22 6.86543 22C11.2464 22 12.1974 21.657 13.0944 19.75C14.8934 15.926 16.2004 9.718 16.2514 4.75C16.2944 0.59 16.0424 0 14.2204 0C12.4964 0 12.2294 0.465 12.6594 2.716Z" fill="#565656"/>
    </svg>
  `;
  const carSeatSelectedSvg = `
  <svg width="20" height="20" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6594 2.716C12.9614 4.297 12.2984 7.588 11.0714 10.593C8.96643 15.749 8.96043 15.754 5.06743 15.232C0.517429 14.622 -0.98557 16.119 0.62743 19.658C1.54643 21.674 2.41343 22 6.86543 22C11.2464 22 12.1974 21.657 13.0944 19.75C14.8934 15.926 16.2004 9.718 16.2514 4.75C16.2944 0.59 16.0424 0 14.2204 0C12.4964 0 12.2294 0.465 12.6594 2.716Z" fill="#DDDD"/>
  </svg>
`;

  return (
    <SafeAreaView style={[tw`bg-[#FFFFFF] h-full`, { paddingTop: StatusBar.currentHeight }]}>
    <StatusBar translucent backgroundColor="transparent" />
      <ScrollView>
        <HeaderWithBackButton
          navigation={navigation}
          title={"Ride Preference"}
        />
        <View>
          <ImageBackground
            source={carImageUri ? { uri: carImageUri } : { uri: imageURL }}
            style={[styles.backgroundImage, { height: windowHeight / 4 }]}
          >
            {/* Add overlay text */}
          </ImageBackground>
        </View>
        <View style={tw`flex my-5 items-start`}>
          <Text style={[tw`text-2xl px-5`, { fontFamily: "Poppins-Bold" }]}>
            Preference
          </Text>
          <Text
            style={[tw`text-[16px] px-5 pt-2`, { fontFamily: "Poppins-Light" }]}
          >
            This informs passengers of how much space you have for luggage and
            extras before they book
          </Text>
        </View>
        <View style={tw`flex px-5  `}>
          <Text style={[tw`text-lg pb-2 `, { fontFamily: "Poppins-Bold" }]}>
            Luggage
          </Text>
          <View style={tw` w-[100%] flex `}>
            <FlatList
              data={[1, 2, 3, 4]}
              keyExtractor={(item, index) => index.toString()} // Change keyExtractor to use index
              horizontal
              renderItem={({ item }) => (
                <View style={tw` flex  gap-1`}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelected(item as any);
                      console.log("Selected Seat:", item);
                    }}
                    style={[
                      tw`flex flex-row mx-1 items-center justify-center gap-5 rounded-lg border px-6 py-2`,
                      selected === item ? tw`bg-[#565656]` : tw`bg-[#FFFFFF]`,
                    ]}
                  >
                    <Icon name="briefcase" type="ionicon" color="black" />
                  </TouchableOpacity>
                  <Text style={tw`text-center`}>
                    {item === 1
                      ? "None"
                      : item === 2
                      ? "Small"
                      : item === 3
                      ? "M"
                      : "L"}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
        <View style={tw`flex px-5 py-5`}>
          <Text style={[tw`text-lg pb-2 `, { fontFamily: "Poppins-Bold" }]}>
            Back row Seating
          </Text>
          <View style={tw`flex flex-row items-center justify-center`}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  HandleBackRowSeat("twoBackRow");
                }}
                style={[
                  tw`flex flex-row ml-11 items-center justify-center px-6 py-2`,
                  twoBackRow === true ? tw`bg-[#565656]` : tw`bg-[#FFFFFF]`,
                ]}
              >
                <Text
                  style={[
                    tw`text-[14px] pt-2`,
                    { fontFamily: "Poppins-Regular" },
                    twoBackRow === true ? tw`text-white` : tw`text-black`,
                  ]}
                >
                  Max (Two)
                </Text>

                <SvgXml
                  xml={twoBackRow === true ? carSeatSelectedSvg : carSeatSvg}
                />
                <SvgXml
                  xml={twoBackRow === true ? carSeatSelectedSvg : carSeatSvg}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.verticalLine} />
            <View>
              <TouchableOpacity
                onPress={() => {
                  HandleBackRowSeat("threeBackRow");
                }}
                style={[
                  tw`flex flex-row mr-11 items-center justify-center  px-6 py-2`,
                  threeBackRow === true ? tw`bg-[#565656]` : tw`bg-[#FFFFFF]`,
                ]}
              >
                <Text
                  style={[
                    tw`text-[14px] pt-2`,
                    { fontFamily: "Poppins-Regular" },
                    threeBackRow === true ? tw`text-white` : tw`text-black`,
                  ]}
                >
                  Max (three)
                </Text>
                <SvgXml
                  xml={threeBackRow === true ? carSeatSelectedSvg : carSeatSvg}
                />
                <SvgXml
                  xml={threeBackRow === true ? carSeatSelectedSvg : carSeatSvg}
                />
                <SvgXml
                  xml={threeBackRow === true ? carSeatSelectedSvg : carSeatSvg}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={tw`rounded-[1rem] bg-[#333333] p-3 my-2 mx-5`}
          onPress={() => navigation.navigate("BackRowSeating")}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default RidePreference;

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
  },
  overlayText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  verticalLine: {
    width: 1.5,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 11.3,
    height: 20,
  },
});
