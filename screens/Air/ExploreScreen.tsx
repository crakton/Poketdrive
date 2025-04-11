import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  useWindowDimensions,
  ImageBackground,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import BottomSheet from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import FilterBottomSheet from "../components/Air/FilterBottomSheet";
import SearchBottomSheet from "../components/Air/SearchBottomSheet";
import { RootStackParamList } from "../../types";
import ContinueButton from "@components/ui/ContinueButton";
import { useAirContext } from "../../hooks/air/useAirContext";
import { useAirService } from "../../hooks/air/useAirService";
import { useAppDispatch } from "../../redux/store";
import { setAirlineCities } from "../../redux/features/airlineSlice";

const ExploreScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState("Air");
  const [passengers, setPassengers] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { tourSearchQueries, setTourPassengers } = useAirContext();
  const dispatch = useAppDispatch();
  const { useGetAirlineCities } = useAirService();
  const {
    isLoading,
    data: airlineCities,
    isError,
    isSuccess,
    error,
  } = useGetAirlineCities();

  // get supported airline cities to support searches
  useEffect(() => {
    if (isSuccess) {
      // set to state
      dispatch(setAirlineCities(airlineCities));
    }

    // handle errors
    if (isError) {
    }
  }, [isError, isSuccess, airlineCities, error]);

  // References for bottom sheets
  const filterBottomSheetRef = useRef<BottomSheet>(null);
  const searchBottomSheetRef = useRef<BottomSheet>(null);

  // Sample data for hot offers
  const hotOffers = [
    {
      id: "1",
      title: "A Trip to Paris",
      discount: "20% OFF",
      image: require("../../assets/images/air/cassna.png"),
    },
    {
      id: "2",
      title: "Helsinki Tour",
      discount: "15% OFF",
      image: require("../../assets/images/air/helsinki.png"),
    },
  ];

  const openFilterBottomSheet = () => {
    filterBottomSheetRef.current?.expand();
  };

  const openSearchBottomSheet = () => {
    searchBottomSheetRef.current?.expand();
  };

  const handleDecreasePassenger = useCallback(() => {
    if (passengers > 1) {
      setPassengers(passengers - 1);
    }
  }, [passengers]);

  const handleIncreasePassenger = useCallback(() => {
    if (passengers < 8) {
      setPassengers(passengers + 1);
    }
    return;
  }, [passengers]);

  const handleDateChange = useCallback((event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  const { width } = useWindowDimensions();

  const handleFindTours = useCallback(() => {
    if (tourSearchQueries?.currentSearch === undefined) {
      // open search bottom sheet
      openSearchBottomSheet();
      setTourPassengers(passengers);
    } else {
    }
  }, [tourSearchQueries?.currentSearch, passengers]);

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"}
      />
      {/* {isLoading && <PageLoader />} */}
      <ScrollView>
        <View style={tw`p-4 flex`}>
          {activeTab === "Air" && (
            <Text
              style={tw`text-[20px] font-semibold text-[#FF6633] text-center`}
            >
              Explore jets and tours
            </Text>
          )}

          {/* Tab navigation */}
          {/* <View style={tw`flex-row bg-white rounded-full mt-4`}>
            {["Air", "Water", "Land"].map((tab) => (
              <TouchableOpacity
                disabled
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={tw`flex-1 py-3 ${
                  activeTab === tab ? "bg-[#FF6633] rounded-full" : ""
                }`}
              >
                <Text
                  style={tw`text-center font-medium ${
                    activeTab === tab ? "text-white" : "text-black"
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View> */}

          {/* Search bar */}
          <TouchableOpacity
            onPress={openSearchBottomSheet}
            style={tw`mt-4 bg-white p-4 rounded-lg flex-row items-center`}
          >
            <Ionicons
              name="search"
              size={20}
              color="#FF5722"
              style={tw`mr-2`}
            />
            <Text style={tw`text-gray-400 flex-1`}>Looking for tour?</Text>
            <TouchableOpacity onPress={openFilterBottomSheet}>
              <Ionicons name="options-outline" size={20} color="#000" />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Date picker */}
          <View>
            <TouchableOpacity
              style={tw`mt-2 bg-white p-4 rounded-lg flex-row items-center`}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#FF5722"
                style={tw`mr-2`}
              />
              <Text style={tw`text-gray-400`}>{formatDate(selectedDate)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          {/* Passengers selector */}
          <View
            style={tw`mt-2 bg-white p-4 rounded-lg flex-row items-center justify-between`}
          >
            <View style={tw`flex-row items-center`}>
              <Ionicons
                name="people-outline"
                size={20}
                color="#FF5722"
                style={tw`mr-2`}
              />
              <Text>Passengers</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <TouchableOpacity
                disabled={passengers === 1}
                onPress={handleDecreasePassenger}
                style={[tw`p-2 ${passengers === 1 ? "opacity-50" : ""}`]}
              >
                <Text style={tw`text-lg font-bold`}>−</Text>
              </TouchableOpacity>
              <Text style={tw`mx-4`}>{passengers}</Text>
              <TouchableOpacity
                disabled={passengers === 8}
                onPress={handleIncreasePassenger}
                style={[tw`p-2 ${passengers === 8 ? "opacity-50" : ""}`]}
              >
                <Text style={tw`text-lg font-bold`}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ContinueButton
            text={"Find tour"}
            onPress={handleFindTours}
            disabled={false}
            loading={isLoading}
          />
          <View style={tw`mt-6 flex-row justify-between items-center`}>
            <Text style={tw`text-lg font-bold`}>Hot Offers</Text>
            <TouchableOpacity>
              <Text style={tw`text-orange-500`}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* Hot offers cards */}
          <FlatList
            data={hotOffers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            style={tw`mt-2`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  tw`mr-4 rounded-lg overflow-hidden h-32 relative`,
                  { width: width * 0.8 },
                ]}
                onPress={() => navigation.navigate("TourDetails")}
              >
                <ImageBackground
                  source={item.image}
                  style={tw`w-full h-full`}
                  resizeMode="cover"
                >
                  <View
                    style={tw`absolute p-3 bg-slate-500 h-full flex-col flex items-center justify-center`}
                  >
                    <Text style={tw`text-white font-bold`}>{item.title}</Text>
                    <Text style={tw`text-white font-bold text-lg`}>
                      {item.discount}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>

      {/* Bottom sheets */}
      <FilterBottomSheet ref={filterBottomSheetRef} />
      <SearchBottomSheet ref={searchBottomSheetRef} />
    </SafeAreaView>
  );
};

export default ExploreScreen;
