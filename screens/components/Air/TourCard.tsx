import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface TourCardProps {
	imageUrl: string;
	title: string;
	location: string;
	price: string;
	onPress: () => void;
}

const TourCard: React.FC<TourCardProps> = ({
	imageUrl,
	title,
	location,
	price,
	onPress,
}) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.card}>
			<Image source={{ uri: imageUrl }} style={styles.image} />
			<View style={styles.content}>
				<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
					{title}
				</Text>
				<Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
					{location}
				</Text>
				<Text style={styles.price}>{price}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		margin: 10,
		width: 200,
	},
	image: {
		width: "100%",
		height: 120,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	content: {
		padding: 10,
	},
	title: {
		fontWeight: "bold",
	},
	location: {
		color: "gray",
	},
	price: {
		marginTop: 5,
		color: "green",
	},
});

export default TourCard;
