import { useAppNavigation } from "@hooks/useAppNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItem,
} from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { Alert, View, Image, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "twrnc";

export function CustomDrawerContent(props: DrawerContentComponentProps) {
	const { state, navigation } = props;
	const [userData, setUserData] = useState<any>(null);
	const { navigate } = useAppNavigation();

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
			navigate("CreateAccount");
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
