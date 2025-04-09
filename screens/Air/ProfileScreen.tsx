import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
	Modal,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "../../types";
import Toast from "react-native-toast-message";
import { useAppSelector } from "@redux/store";
import { IUser } from "../../types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [profileImage, setProfileImage] = useState(
		"https://randomuser.me/api/portraits/men/32.jpg"
	);
	const [user, setUser] = useState<IUser>();
	const handleImagePick = async () => {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			Toast.show({
				type: "info",
				text1: "Permission to access media library is required!",
			});
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			setProfileImage(result.assets[0].uri);
		}
	};

	useEffect(() => {
		const getUserFromStorage = async () => {
			const user = await AsyncStorage.getItem("user");
			if (user) {
				setUser(JSON.parse(user));
			}
		};
		getUserFromStorage();
	}, []);

	return (
		<SafeAreaView style={tw`flex-1 flex-grow bg-gray-100`}>
			<View style={tw`items-center justify-center flex-1 pt-6 pb-4 bg-white`}>
				<View style={tw`relative`}>
					<Image
						source={{ uri: profileImage }}
						style={tw`w-20 h-20 rounded-full`}
					/>
					<TouchableOpacity
						style={tw`absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-200`}
						onPress={handleImagePick}
					>
						<Ionicons name="pencil" size={16} color="#F05A22" />
					</TouchableOpacity>
				</View>

				<Text style={tw`text-xl font-bold mt-3`}>
					{user?.firstName} {user?.lastName[0].toLocaleUpperCase()}.
				</Text>
				<Text style={tw`text-gray-500`}>{user?.email}</Text>
			</View>

			<View style={tw`mt-4 flex-1`}>
				<TouchableOpacity
					style={tw`flex-row items-center bg-white p-4 border-b border-gray-100`}
					onPress={() => navigation.navigate("AccountVerification")}
				>
					<Text style={tw`flex-1 text-base`}>Account Verification</Text>
					<View style={tw`bg-[#F05A22] px-3 py-1 rounded-full`}>
						<Text style={tw`text-white text-xs`}>Pending</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={tw`flex-row items-center bg-white p-4 border-b border-gray-100`}
					onPress={() => navigation.navigate("CardManagement")}
				>
					<Text style={tw`flex-1 text-base`}>Card Management</Text>
					<Ionicons name="chevron-forward" size={20} color="#ccc" />
				</TouchableOpacity>

				<TouchableOpacity
					style={tw`flex-row items-center bg-white p-4 border-b border-gray-100 text-gray-300`}
				>
					<Text style={tw`flex-1 text-base text-gray-300`}>
						Account Settings
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={tw`flex-row items-center bg-white p-4 border-b border-gray-100`}
					onPress={() => navigation.navigate("MyWallet")}
				>
					<Text style={tw`flex-1 text-base`}>Wallet</Text>
					<Ionicons name="chevron-forward" size={20} color="#ccc" />
				</TouchableOpacity>

				<TouchableOpacity
					style={tw`flex-row items-center bg-white p-4 border-b border-gray-100`}
					onPress={() => navigation.navigate("Help")}
				>
					<Text style={tw`flex-1 text-base`}>Help</Text>
					<Ionicons name="chevron-forward" size={20} color="#ccc" />
				</TouchableOpacity>

				<TouchableOpacity
					style={tw`flex-row items-center bg-white p-4 border-b border-gray-100`}
					onPress={() => navigation.navigate("Address")}
				>
					<Text style={tw`flex-1 text-base`}>Address</Text>
					<Ionicons name="chevron-forward" size={20} color="#ccc" />
				</TouchableOpacity>

				<TouchableOpacity
					style={tw`flex-row items-center bg-white p-4`}
					onPress={() => navigation.navigate("Settings")}
				>
					<Text style={tw`flex-1 text-base`}>Settings</Text>
					<Ionicons name="chevron-forward" size={20} color="#ccc" />
				</TouchableOpacity>
			</View>

			<View style={tw`flex-1 justify-end items-center mb-8`}>
				<TouchableOpacity
					style={tw`border-t border-gray-200 py-4 w-full items-center`}
					onPress={() => navigation.goBack()}
				>
					<Text style={tw`text-lg font-medium`}>Back</Text>
				</TouchableOpacity>
			</View>

			<Modal
				transparent={true}
				visible={showLogoutModal}
				animationType="fade"
				onRequestClose={() => setShowLogoutModal(false)}
			>
				<View
					style={tw`absolute inset-0 bg-black bg-opacity-30 items-center justify-center`}
				>
					<View style={tw`bg-white rounded-lg w-[90%] p-4`}>
						<Text style={tw`text-lg font-medium text-center mb-8`}>
							Do you want to log out of the app?
						</Text>

						<TouchableOpacity
							style={tw`bg-[#F05A22] rounded-lg py-4 items-center mb-3`}
							onPress={() => setShowLogoutModal(false)}
						>
							<Text style={tw`text-white font-medium`}>Cancel</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={tw`border border-[#F05A22] rounded-lg py-4 items-center`}
							onPress={() => {
								setShowLogoutModal(false);
								navigation.navigate("Login");
							}}
						>
							<Text style={tw`text-[#F05A22] font-medium`}>Logout</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

export default ProfileScreen;
