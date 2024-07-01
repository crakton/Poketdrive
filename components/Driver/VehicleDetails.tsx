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
  StatusBar,
} from "react-native";
import { CheckBox } from "@rneui/themed"; // Import CheckBox component
import tw from "twrnc";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "@rneui/base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Formik } from "formik";
import * as yup from "yup";

interface VehicleDetailsProps {
  setFormData: any;
  formData: any;
  handleNext: any;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({
  setFormData,
  formData,
  handleNext,
}) => {
  const [carImageUri, setCarImageUri] = useState<string | null>(null);
  const [OneTime, setOneTime] = useState(true);
  const [recurring, setRecurring] = useState(false);
  const [trips, setTrips] = useState([{ date: "", time: "" }]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work.");
      }
    })();
  }, []);

  const handleRideSchedule = (selectedOption: string) => {
    if (selectedOption === "OneTime") {
      setOneTime(true);
      setRecurring(false);
      setTrips([{ date: "", time: "" }]); // Reset trips for one-time schedule
    } else if (selectedOption === "recurring") {
      setOneTime(false);
      setRecurring(true);
    }
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
    if (trips.length < 2) {
      // If there are less than 2 trips, simply add a new one
      setTrips([...trips, { date: "", time: "" }]);
    } else {
      // If there are already 2 trips, replace the second one
      const updatedTrips = [...trips];
      updatedTrips[1] = { date: "", time: "" };
      setTrips(updatedTrips);
    }
  };

  const removeTrip = (index: number) => {
    const newTrips = [...trips];
    newTrips.splice(index, 1);
    setTrips(newTrips);
  };

  const handleConfirmDateTime = (date: Date, index: number) => {
    const updatedTrips = [...trips];
    updatedTrips[index] = {
      date: formatDate(date),
      time: formatTime(date),
    };
    setTrips(updatedTrips);
    setDatePickerVisibility(false);
  };
  const formatDate = (date: any) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}/${day}/${year}`;
  };

  const formatTime = (date: any) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    // Convert 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // "0" should be "12"

    return `${hours}:${minutes}${period}`;
  };

  const validationSchema = yup.object().shape({
    carNumber: yup.string().required("Car Number is required"),
    carColor: yup.string().required("Car Color is required"),
    carName: yup.string().required("Car Name is required"),
  });

  return (
    <View style={[tw`bg-[#FFFFFF]`, { paddingTop: StatusBar.currentHeight }]}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView>
        <Formik
          initialValues={{
            carNumber: formData.carNumber || "",
            carColor: formData.carColor || "",
            carName: formData.carName || "",
          }}
          onSubmit={(values) => {
            const updatedFormData = {
              ...formData,
              carNumber: values.carNumber,
              carColor: values.carColor,
              carName: values.carName,
              type: OneTime ? "One-time" : "recurring",
              departure_time: OneTime
                ? `${trips[0].date} ${trips[0].time}`
                : trips,
            };
            console.log(`${trips[0].date} ${trips[0].time}`, "val"); // Should output correct formatted date and time
            setFormData(updatedFormData);
            handleNext();
          }}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
          }) => (
            <View>
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
                      <Icon
                        name="car"
                        type="ionicon"
                        size={100}
                        color="black"
                      />
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
                    value={values.carNumber}
                    onChangeText={handleChange("carNumber")}
                    onBlur={handleBlur("carNumber")}
                  />
                  {touched.carNumber && errors.carNumber && (
                    <Text style={styles.error}>
                      {errors.carNumber as string}
                    </Text>
                  )}
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
                    value={values.carColor}
                    onChangeText={handleChange("carColor")}
                    onBlur={handleBlur("carColor")}
                  />
                  {touched.carColor && errors.carColor && (
                    <Text style={styles.error}>
                      {errors.carColor as string}
                    </Text>
                  )}
                </View>
              </View>
              <View style={tw``}>
                <Text
                  style={[
                    tw`text-16px text-center`,
                    { fontFamily: "Poppins-Light" },
                  ]}
                >
                  Car Name
                </Text>
                <TextInput
                  style={[
                    tw`w-[100%] bg-[#D9D9D9] p-2 rounded-full h-10 text-center`,
                    { fontFamily: "Poppins-Regular" },
                  ]}
                  placeholder="Car name"
                  value={values.carName} // Updated to carName
                  onChangeText={handleChange("carName")}
                  onBlur={handleBlur("carName")}
                />
                {touched.carName &&
                  errors.carName && ( // Updated to carName
                    <Text style={styles.error}>{errors.carName as string}</Text>
                  )}
              </View>
              <View style={tw`flex px-3 pt-5 items-start`}>
                <Text
                  style={[tw`text-2xl px-5`, { fontFamily: "Poppins-Bold" }]}
                >
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
                    <Text
                      style={[tw`text-[16px]`, { fontFamily: "Poppins-Bold" }]}
                    >
                      One-Time
                    </Text>
                    <CheckBox
                      checkedColor="green"
                      uncheckedColor="black"
                      size={30}
                      checked={OneTime}
                      onPress={() => handleRideSchedule("OneTime")}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                    />
                  </View>
                  <View style={tw`flex flex-row items-center justify-start`}>
                    <Text
                      style={[tw`text-[16px]`, { fontFamily: "Poppins-Bold" }]}
                    >
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
                      onChangeText={(date) => formatDate(index)}
                      editable={false}
                    />
                    <TouchableOpacity>
                      <Icon
                        name="time"
                        type="ionicon"
                        size={30}
                        color="black"
                        onPress={() => setDatePickerVisibility(true)}
                      />
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="datetime"
                      textColor="#000000"
                      minimumDate={new Date()}
                      onConfirm={(date) => handleConfirmDateTime(date, index)}
                      onCancel={() => setDatePickerVisibility(false)}
                    />

                    <TextInput
                      style={[
                        tw`w-[30%] bg-[#D9D9D9] p-2 rounded-lg h-20 text-center`,
                        { fontFamily: "Poppins-Regular" },
                      ]}
                      placeholder="00:00am"
                      value={formatTime(new Date())}
                      editable={false}
                      onChangeText={(time) => formatTime(index)}
                    />
                    {trips.length > 1 && (
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
                {recurring && trips.length < 2 && (
                  <View
                    style={tw`border-t-2 border-b-2 my-5 border-[#D9D9D9] `}
                  >
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
                onPress={handleSubmit}
                style={tw`rounded bg-[#404040] w-full rounded-lg p-3 mt-10`}
              >
                <Text style={tw`text-center text-white text-[20px] font-bold`}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
});

export default VehicleDetails;
function alert(arg0: string) {
  throw new Error("Function not implemented.");
}
