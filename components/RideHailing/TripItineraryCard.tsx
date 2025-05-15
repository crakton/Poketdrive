import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tailwind from "twrnc";
import { Icon } from "@rneui/base";
import { Avatar } from "@rneui/themed";

interface CardProps {
	name: string;
	avatarUri: string;
	carDescription: string;
	onDelete: () => void;
	onCall: () => void;
	onChat: () => void;
	isVerified: boolean; // New prop to handle verification status
}

const TripItineraryCard: React.FC<CardProps> = ({
	name,

	carDescription,
	onDelete,
	onCall,
	onChat,
	isVerified, 
}) => {
	return (
		<View style={styles.card}>
			{isVerified && (
				<Icon
					name="checkmark-circle"
					type="ionicon"
					color="green"
					size={20}
					containerStyle={tailwind`absolute top-2 right-2`}
				/>
			)}
			<View style={tailwind`flex flex-row justify-between items-center`}>
				<View style={tailwind`flex flex-row gap-4`}>
					<Avatar
						size={50}
						source={name ? { uri: name } : require("../../assets/profilepi.png")}
						title={name}
						rounded
					/>
					<View>
						<Text style={[tailwind`text-lg`, { fontFamily: "Poppins-Bold" }]}>
							{name}
						</Text>
						<Text
							style={[tailwind`text-[12px]`, { fontFamily: "Poppins-Light" }]}
						>
							{carDescription}
						</Text>
					</View>
				</View>
				<View>
					<View
						style={tailwind`flex flex-row items-center justify-center gap-2`}
					>
						<TouchableOpacity
							style={tailwind`p-2 rounded-full bg-[#049813]`}
							onPress={onCall}
						>
							<Icon name="call-outline" type="ionicon" color="white" />
						</TouchableOpacity>
						<TouchableOpacity
							style={tailwind`p-2 rounded-full bg-[#FF0000]`}
							onPress={onChat}
						>
							<Icon
								name="chatbubble-ellipses-sharp"
								type="ionicon"
								color="white"
							/>
						</TouchableOpacity>
						<TouchableOpacity onPress={onDelete}>
							<Icon name="trash-outline" type="ionicon" />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};

export default TripItineraryCard;

const styles = StyleSheet.create({
	card: {
		borderRadius: 8,
		marginHorizontal: 20,
		paddingHorizontal: 15,
		paddingBottom: 10,
		paddingTop: 10,
		backgroundColor: "#FFF",
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		position: "relative", // Make sure the card is positioned relatively
	},
});
