import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { CheckBox } from "@rneui/themed"; // Import CheckBox component
import tw from "twrnc";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "@rneui/base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../nav";

const VehicleDetails = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "VehicleDetails">
    >();
  const [carImageUri, setCarImageUri] = useState<string | null>(null);
  const [carNumber, setCarNumber] = useState("");
  const [carColor, setCarColor] = useState("");
  const [oneTime, setOneTime] = useState(true);
  const [recurring, setRecurring] = useState(false);
  const [trips, setTrips] = useState([{ date: "", time: "" }]);

  const handleRideSchedule = (selectedOption: string) => {
    if (selectedOption === "oneTime") {
      setOneTime(true);
      setRecurring(false);
    } else if (selectedOption === "recurring") {
      setOneTime(false);
      setRecurring(true);
    }
  };

  const printTrips = () => {
    console.log(trips);
  };

  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (result && result.assets && result.assets.length > 0) {
      setCarImageUri(result.assets[0].uri);
    }
  };

  const addTrip = () => {
    setTrips([...trips, { date: "", time: "" }]); // Add a new trip to the trips array
  };

  const removeTrip = (index: number) => {
    const newTrips = [...trips];
    newTrips.splice(index, 1);
    setTrips(newTrips);
  };

  const handleTripDateChange = (index: number, date: string) => {
    const newTrips = [...trips];
    newTrips[index].date = date;
    setTrips(newTrips);
  };

  const handleTripTimeChange = (index: number, time: string) => {
    const newTrips = [...trips];
    newTrips[index].time = time;
    setTrips(newTrips);
  };

  useEffect(() => {
    if (oneTime) {
      setTrips([{ date: "", time: "" }]);
    }
  }, [oneTime]);

  return (
    <SafeAreaView style={tw`bg-[#FFFFFF] h-full`}>
      <ScrollView>
        <View>
          <HeaderWithBackButton
            navigation={navigation}
            title={"Vehicle Details"}
          />
          <View style={tw`flex px-5 mb-5 items-start`}>
            <Text style={[tw`text-2xl`, { fontFamily: "Poppins-Bold" }]}>
              Vehicle Details
            </Text>
          </View>
          <View
            style={tw`flex flex-row items-center justify-start gap-10 px-5 pb-5 `}
          >
            {carImageUri ? (
              <View style={tw`border p-1 rounded-md w-[10rem] `}>
                <Image
                  source={{ uri: carImageUri }}
                  style={{ flex: 1 }}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View style={tw`flex flex-row items-center justify-center`}>
                <View style={tw`border rounded-lg w-[10rem]`}>
                  <Icon name="car" type="ionicon" size={100} color="black" />
                </View>
              </View>
            )}
            <View>
              <TouchableOpacity
                onPress={openImagePicker}
                style={tw`border p-1 rounded-lg w-[10rem] items-center justify-center`}
              >
                <Icon
                  name="add-outline"
                  type="ionicon"
                  size={100}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`px-5 flex flex-row gap-10 `}>
            <View style={tw`w-[10rem]`}>
              <Text
                style={[
                  tw`text-16px text-center`,
                  { fontFamily: "Poppins-Light" },
                ]}
              >
                Car No.
              </Text>
              <TextInput
                style={tw`w-[100%] bg-[#D9D9D9] p-2 rounded-full h-10 text-center`}
                placeholder="ABC 1234"
                value={carNumber}
                onChangeText={setCarNumber}
              />
            </View>
            <View style={tw`w-[10rem]`}>
              <Text
                style={[
                  tw`text-16px text-center`,
                  { fontFamily: "Poppins-Light" },
                ]}
              >
                Car Color
              </Text>
              <TextInput
                style={[
                  tw`w-[100%] bg-[#D9D9D9] p-2 rounded-full h-10 text-center`,
                  { fontFamily: "Poppins-Regular" },
                ]}
                placeholder="Red"
                value={carColor}
                onChangeText={setCarColor}
              />
            </View>
          </View>
          <View style={tw`flex px-3 pt-5 items-start`}>
            <Text style={[tw`text-2xl px-5`, { fontFamily: "Poppins-Bold" }]}>
              Ride Schedule
            </Text>
            <Text
              style={[
                tw`text-[16px] px-5 pt-2`,
                { fontFamily: "Poppins-Light" },
              ]}
            >
              Enter a precise date and time indicating (Morning)am and
              (afternoon)pm
            </Text>
            <View style={tw`flex flex-row px-5 pb-5 `}>
              <View style={tw`flex flex-row items-center justify-start`}>
                <Text style={[tw`text-[16px]`, { fontFamily: "Poppins-Bold" }]}>
                  One-Time
                </Text>
                <CheckBox
                  checkedColor="green"
                  uncheckedColor="black"
                  size={30}
                  checked={oneTime}
                  onPress={() => handleRideSchedule("oneTime")}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                />
              </View>
              <View style={tw`flex flex-row items-center justify-start`}>
                <Text style={[tw`text-[16px]`, { fontFamily: "Poppins-Bold" }]}>
                  Recurring
                </Text>
                <CheckBox
                  checkedColor="green"
                  uncheckedColor="black"
                  size={30}
                  checked={recurring}
                  onPress={() => handleRideSchedule("recurring")}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                />
              </View>
            </View>
          </View>

          {trips.map((trip, index) => (
            <View key={index}>
              <View style={tw`flex flex-row px-5 my-2 gap-2 items-center`}>
                <TextInput
                  style={tw`w-[50%] bg-[#D9D9D9] p-2 rounded-lg h-20 text-center`}
                  placeholder="Date"
                  value={trip.date}
                  onChangeText={(date) => handleTripDateChange(index, date)}
                />
                <Text style={[tw`text-[16px]`, { fontFamily: "Poppins-Bold" }]}>
                  at
                </Text>
                <TextInput
                  style={[
                    tw`w-[30%] bg-[#D9D9D9] p-2 rounded-lg h-20 text-center`,
                    { fontFamily: "Poppins-Regular" },
                  ]}
                  placeholder="00:00am"
                  value={trip.time}
                  onChangeText={(time) => handleTripTimeChange(index, time)}
                />
                {trips.length > 1 && ( // Conditionally render delete button
                  <TouchableOpacity onPress={() => removeTrip(index)}>
                    <Icon
                      name="trash-outline"
                      type="ionicon"
                      size={30}
                      color="black"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}

          <View>
            {recurring && (
              <View style={tw`border-t-2 border-b-2 my-5 border-[#D9D9D9] `}>
                <TouchableOpacity>
                  <Text
                    style={[
                      tw`p-3 text-[16px] px-[2rem]`,
                      { fontFamily: "Poppins-Bold" },
                    ]}
                    onPress={addTrip}
                  >
                    Add return trip
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={[
              tw`rounded-[1rem] bg-[#333333] p-3 mx-5`,
              recurring ? tw`my-2` : tw`my-10`,
            ]}
            onPress={() => navigation.navigate("RidePreference")}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default VehicleDetails;
