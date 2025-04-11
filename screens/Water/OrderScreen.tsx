import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import FromMe from "../../components/Water/FromMe";
import ToMe from "../../components/Water/ToMe";

function OrderScreen() {
  const [selectedTab, setSelectedTab] = useState("From Me");

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`bg-[#FF6633] h-[220px] px-5`}>
        <SafeAreaView style={tw`flex-1 gap-5`}>
          <View style={tw`flex-row justify-between items-center px-3`}>
            <Text style={tw`text-white text-[20px] font-bold`}>My Order</Text>
            <TouchableOpacity
              style={tw`border border-[#FFFFFF33] rounded-full h-11 w-11 flex justify-center items-center`}
            >
              <Icon
                name="filter-sharp"
                type="ionicon"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <View style={tw`flex px-3 gap-3 mt-2`}>
            <View
              style={tw`bg-[#000000] p-3 py-4 rounded-[12px] flex-row items-center`}
            >
              <Icon
                name="search"
                type="feather"
                size={20}
                color="white"
                style={tw`mr-3`}
              />
              <TextInput
                style={tw`flex-1 text-white`}
                placeholder="Enter track number"
                placeholderTextColor="#A7A9B7"
              />
              <TouchableOpacity>
                <Icon
                  name="scan1"
                  type="antdesign"
                  size={20}
                  color="white"
                  style={tw`ml-3`}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* Tabs */}
      <View
        style={tw`flex-row justify-between bg-gray-100 p-[6px] rounded-lg mx-6 mt-4 h-[52px] rounded-[50px]`}
      >
        <TouchableOpacity
          style={[
            tw`px-[18%] py-3 rounded-full`,
            selectedTab === "From Me" ? tw`bg-white` : tw`opacity-50`,
          ]}
          onPress={() => setSelectedTab("From Me")}
        >
          <Text style={tw`text-black font-medium text-[12px]`}>From Me</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw`px-[18%] py-3 rounded-full`,
            selectedTab === "To Me" ? tw`bg-white` : tw`opacity-50`,
          ]}
          onPress={() => setSelectedTab("To Me")}
        >
          <Text style={tw`text-black font-medium text-[12px]`}>To Me</Text>
        </TouchableOpacity>
      </View>

      {/* Render Component Based on Selected Tab */}
      <View style={tw`flex-1 mt-4 px-6`}>
        {selectedTab === "From Me" ? <FromMe /> : <ToMe />}
      </View>
    </View>
  );
}

export default OrderScreen;
