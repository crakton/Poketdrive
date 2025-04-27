import React, { useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  NavigationProp,
  useRoute,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WalletHome from "@screens/MyWallet/Home";
import Messages from "../../screens/Chat/Messages";
import ManageRide from "../../screens/RideHaling/ManageRide";
import ManageTrips from "../../screens/Driver/DriverItinerary/ManageTrips";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "nav";
import Home from "@screens/RideHaling/Home";
import Payment from "@screens/RideHaling/Payment";
import ChatListScreen from "@screens/Chat/ChatListScreen";
import { walletDetails } from "@services/walletService";

export const MyDrawer = createDrawerNavigator();

const DrawerContainer = () => {
  const { width } = useWindowDimensions();
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<any>>();
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("userData");
        if (jsonValue !== null) {
          const parsedData = JSON.parse(jsonValue);

          setUserData(parsedData);
        }
      } catch (e) {
        console.log("Error fetching user data:", e);
      }
    };

    fetchUserData();
  }, [setUserData]);

  return (
    <MyDrawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} />
      )}
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: width * 0.95,
        swipeEnabled: false,
      }}
    >
      <MyDrawer.Screen
        component={Home}
        name="Home"
        options={{
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <MyDrawer.Screen
        component={WalletHome}
        name="wallet"
        options={{
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="card-outline" size={size} color={color} />
          ),
        }}
      />

      <MyDrawer.Screen
        component={ChatListScreen}
        name="Chat"
        // options={{
        // 	headerShown: true,
        // 	header: ({ navigation }: { navigation: NavigationProp<any> }) => {
        // 		return (
        // 			<View style={tw`flex-row items-center justify-between py-2 px-3`}>
        // 				<View style={tw`flex-row items-center mt-6`}>
        // 					<TouchableOpacity onPress={() => navigation.goBack()}>
        // 						<Ionicons name="arrow-back" size={24} color="black" />
        // 					</TouchableOpacity>
        // 					<View style={tw`flex-row items-center ml-2`}>
        // 						<Image
        // 							source={require("../../assets/images/avatar.png")}
        // 							style={tw`w-10 h-10 rounded-full`}
        // 						/>
        // 						<View style={[tw`ml-2 flex flex-col`]}>
        // 							<Text style={tw`font-bold`}>
        // 								{userData?.firstName ?? "Jonny"}
        // 							</Text>
        // 							<View style={[tw`flex flex-row items-center`]}>
        // 								<Text
        // 									style={tw`h-[1.4] w-[1.4] rounded-full bg-green-700`}
        // 								></Text>
        // 								<Text style={tw`text-xs ml-1`}>Online</Text>
        // 							</View>
        // 						</View>
        // 					</View>
        // 				</View>
        // 				<TouchableOpacity style={tw`mt-6`}>
        // 					<Ionicons name="call-outline" size={24} color="black" />
        // 				</TouchableOpacity>
        // 			</View>
        // 		);
        // 	},
        // 	drawerIcon: ({ color, size }: { color: string; size: number }) => (
        // 		<Ionicons name="chatbox" size={size} color={color} />
        // 	),
        // }}
      />
      <MyDrawer.Screen
        component={ManageRide}
        name="My Rides"
        options={{
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="car-outline" size={size} color={color} />
          ),
        }}
      />
      <MyDrawer.Screen
        component={ManageTrips}
        name="Work Rides"
        options={{
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="bus-outline" size={size} color={color} />
          ),
        }}
      />
    </MyDrawer.Navigator>
  );
};

export default DrawerContainer;

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { state, navigation } = props;
  const [userData, setUserData] = useState<any>(null);
  const nav = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("userData");
        if (jsonValue !== null) {
          const parsedData = JSON.parse(jsonValue);
          setUserData(parsedData);
        }
      } catch (e) {
        console.log("Error fetching user data:", e);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      nav.reset({
        index: 0,
        routes: [{ name: "CreateAccount" }],
      });
      Alert.alert("Success", "You have been logged out.");
    } catch (e) {
      console.error("Failed to clear AsyncStorage:", e);
      Alert.alert("Error", "Logout failed. Try again.");
    }
  };

  const filteredRoutes = state.routes.filter((route) => route.name !== "Stack");

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={tw`flex-1 justify-between`}
    >
      <View>
        <View style={tw`p-4`}>
          <View style={tw`flex-row items-center`}>
            <Image
              source={require("../../assets/images/avatar.png")}
              style={tw`w-16 h-16 rounded-full`}
            />
            <View style={tw`ml-4 flex-1`}>
              <Text style={tw`font-bold text-lg`}>
                {userData?.firstName ?? "Jonny"}
              </Text>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={tw`bg-gray-200 h-[1px] my-2`} />
        {filteredRoutes.map((route, index) => (
          <DrawerItem
            key={index}
            label={route.name}
            labelStyle={[
              tw`font-bold text-slate-700 right-4`,
              { fontFamily: "Poppins-Regular" },
            ]}
            onPress={() => navigation.navigate(route.name)}
            icon={({ color, size }) => {
              switch (route.name) {
                case "Home":
                  return (
                    <Ionicons name="home-outline" size={size} color={color} />
                  );
                case "wallet":
                  return (
                    <Ionicons name="card-outline" size={size} color={color} />
                  );
                case "Chat":
                  return (
                    <Ionicons
                      name="chatbox-outline"
                      size={size}
                      color={color}
                    />
                  );
                case "My Rides":
                  return (
                    <Ionicons name="car-outline" size={size} color={color} />
                  );
                case "Work Rides":
                  return (
                    <Ionicons name="bus-outline" size={size} color={color} />
                  );
              }
            }}
          />
        ))}
      </View>

      {/* Logout Button */}
      <View style={tw`pb-10 mx-5`}>
        <TouchableOpacity
          style={tw`justify-center items-center w-full `}
          onPress={handleLogout}
        >
          <Text
            style={[
              tw`text-[14px] w-full border  text-center py-2 rounded border-[#FF4E00] text-[#FF4E00]`,
              { fontFamily: "Poppins-medium" },
            ]}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}
