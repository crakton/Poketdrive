import React from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { RootStackParamList } from "../../types";

const ProfileScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const [showLogoutModal, setShowLogoutModal] = React.useState(false);

	return (
		<SafeAreaView style={tw`flex-1 bg-gray-100 my-3`}>
			<View style={tw`items-center pt-6 pb-4 bg-gray-100`}>
				<View style={tw`relative`}>
					<Image
						source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
						style={tw`w-20 h-20 rounded-full`}
					/>
					<TouchableOpacity
						style={tw`absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-200`}
					>
						<Ionicons name="pencil" size={16} color="#F05A22" />
					</TouchableOpacity>
				</View>

				<Text style={tw`text-xl font-bold mt-3`}>David J</Text>
				<Text style={tw`text-gray-500`}>+1 555 555 55 55</Text>
			</View>

			<View style={tw`bg-white rounded-lg mx-4 mt-4`}>
				<TouchableOpacity
					style={tw`flex-row items-center p-4 border-b border-gray-100`}
				>
					<Ionicons
						name="notifications-outline"
						size={24}
						color="#F05A22"
						style={tw`mr-4`}
					/>
					<Text style={tw`flex-1 text-base`}>Notifications</Text>
					<Ionicons name="chevron-forward" size={20} color="#ccc" />
				</TouchableOpacity>

				<TouchableOpacity
					style={tw`flex-row items-center p-4 border-b border-gray-100`}
				>
					<Ionicons
						name="receipt-outline"
						size={24}
						color="#F05A22"
						style={tw`mr-4`}
					/>
					<Text style={tw`flex-1 text-base`}>My tickets</Text>
					<Ionicons name="chevron-forward" size={20} color="#ccc" />
				</TouchableOpacity>

				<TouchableOpacity style={tw`flex-row items-center p-4`}>
					<Ionicons
						name="card-outline"
						size={24}
						color="#F05A22"
						style={tw`mr-4`}
					/>
					<Text style={tw`flex-1 text-base`}>My cards</Text>
					<View
						style={tw`bg-red-500 w-5 h-5 rounded-full items-center justify-center mr-2`}
					>
						<Text style={tw`text-white text-xs`}>1</Text>
					</View>
					<Ionicons name="chevron-forward" size={20} color="#ccc" />
				</TouchableOpacity>
			</View>

			{showLogoutModal && (
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
			)}
		</SafeAreaView>
	);
};

export default ProfileScreen;
