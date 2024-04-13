import React, { useEffect, useState, useRef } from "react";
import {
  FlatList,
  TouchableWithoutFeedback,
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";

const { width } = Dimensions.get("window");

const CountryPhoneNumber = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, "Login">>();
  const timeoutRef = useRef<number | null>(null);
  const [areas, setAreas] = useState<any[]>([]);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        let areaData = data.map((item: any) => {
          return {
            code: item.alpha2Code,
            item: item.name,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://flagcdn.com/48x36/${item.alpha2Code.toLowerCase()}.png`,
          };
        });

        setAreas(areaData);
        if (areaData.length > 0) {
          let defaultData = areaData.filter((a: any) => a.code === "US");

          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        }
      });
  }, []);

  const debounce = (func: any, delay: number) => {
    return function (this: any, ...args: any[]) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
    delayedHandleNumberSubmit(text);
  };

  const handleNumberSubmit = (text: string) => {
    if (!text) {
      setPhoneNumberError("Phone number required");
      setIsValid(false);
      return;
    } else if (!isValidPhoneNumber(`${selectedArea?.callingCode}${text}`)) {
      setPhoneNumberError("Invalid phone number");
      setIsValid(false);
      return;
    }
    setIsValid(true);
    setPhoneNumberError("");
  };

  const delayedHandleNumberSubmit = debounce(handleNumberSubmit, 3000);

  const handleSubmit = () => {
    Alert.alert(
      "Phone Number: " + selectedArea?.callingCode + " " + phoneNumber
    );
  };

  // render countries codes modal
  function renderAreasCodesModal() {
    const renderItem = ({ item }: { item: any }) => {
      return (
        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: "row",
          }}
          onPress={() => {
            setSelectedArea(item), setModalVisible(false);
          }}
        >
          <Image
            source={{ uri: item.flag }}
            style={{
              height: 30,
              width: 30,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              color: "#fff",
              fontFamily: "Poppins-Regular",
            }}
          >
            {item?.item}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={{
                height: 400,
                width: width * 0.8,
                backgroundColor: "black",
                borderRadius: 12,
              }}
            >
              <FlatList
                data={areas}
                renderItem={renderItem}
                keyExtractor={(item) => item.code}
                style={{
                  padding: 20,
                  marginBottom: 20,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={tw`bg-[#FFFFFF] h-full`}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 10,
          }}
        >
          <View style={[{ flexDirection: "row" }]}>
            <TouchableOpacity
              style={[
                tw`px-2 rounded-md`,
                {
                  width: 75,
                  height: "full",
                  paddingTop: 10,
                  backgroundColor: "black",
                  marginHorizontal: 5,
                  flexDirection: "row",
                },
              ]}
              onPress={() => setModalVisible(true)}
            >
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Image
                  source={{ uri: selectedArea?.flag }}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
              <View style={[tw`px-1`, { justifyContent: "center" }]}>
                <Icon
                  name="chevron-down"
                  type="ionicon"
                  color="white"
                  size={20}
                />
              </View>
            </TouchableOpacity>
            {/* Country Code */}
            <View
              style={[
                tw`px-1 rounded-l-md`,
                {
                  width: 60,
                  height: "full",
                  flexDirection: "row",
                  backgroundColor: "black",
                },
              ]}
            >
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: "white",
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {selectedArea?.callingCode}
                </Text>
              </View>
            </View>
            {/* Phone Number Text Input */}
            <View
              style={[
                tw`px-2 rounded-r-md`,
                {
                  backgroundColor: "black",
                  flex: 1,
                  flexDirection: "row",
                },
              ]}
            >
              <TextInput
                style={{
                  flex: 1,
                  marginVertical: 10,
                  height: 40,
                  fontSize: 15,
                  color: "white",
                  fontFamily: "Poppins-Bold",
                }}
                placeholder="Your phone number"
                placeholderTextColor="white"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
              />

              <View style={{ justifyContent: "center" }}>
                {isValid === true ? (
                  <Icon
                    name="checkmark-outline"
                    type="ionicon"
                    color="green"
                    size={20}
                  />
                ) : isValid === false ? (
                  <Icon
                    name="close-outline"
                    type="ionicon"
                    color="red"
                    size={20}
                  />
                ) : null}
              </View>
            </View>
          </View>

          {phoneNumberError ? (
            <Text
              style={{
                color: "red",
                marginTop: 5,
                paddingLeft: 10,
                fontFamily: "Poppins-Light",
              }}
            >
              {phoneNumberError}
            </Text>
          ) : null}

          <TouchableOpacity
            disabled={isValid === false || isValid === null}
            // onPress={handleSubmit}
            onPress={() => navigation.navigate("Verification")} // Corrected
            style={[
              tw`p-3`,
              {
                backgroundColor:
                  isValid === false || isValid === null ? "#CCCCCC" : "#F25B3E",

                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                marginVertical: 32,
              },
            ]}
          >
            <Text
              style={[
                tw`text-center text-2xl text-white`,
                { fontFamily: "Poppins-Bold" },
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {renderAreasCodesModal()}
    </SafeAreaView>
  );
};

export default CountryPhoneNumber;

const styles = StyleSheet.create({});
