import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withTiming,
	withSequence,
	Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";

const PageLoader = ({ message = "Loading..." }) => {
	// For the typing animation
	const [displayText, setDisplayText] = useState("");
	const [textIndex, setTextIndex] = useState(0);

	// Pulse animation for the image
	const scale = useSharedValue(1);

	// Rotation animation
	const rotation = useSharedValue(0);

	// Set up rotation animation
	useEffect(() => {
		rotation.value = withRepeat(
			withTiming(360, {
				duration: 2000,
				easing: Easing.linear,
			}),
			-1 // Infinite repetition
		);
	}, []);

	// Set up pulse animation
	useEffect(() => {
		scale.value = withRepeat(
			withSequence(
				withTiming(1.2, { duration: 800, easing: Easing.inOut(Easing.ease) }),
				withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
			),
			-1, // Infinite repetition
			true // Reverse (makes it smoother)
		);
	}, []);

	// Typing animation effect
	useEffect(() => {
		if (textIndex < message.length) {
			const typingTimeout = setTimeout(() => {
				setDisplayText((prev) => prev + message[textIndex]);
				setTextIndex(textIndex + 1);
			}, 100);

			return () => clearTimeout(typingTimeout);
		} else {
			// Reset to create continuous effect
			const resetTimeout = setTimeout(() => {
				setDisplayText("");
				setTextIndex(0);
			}, 1000);

			return () => clearTimeout(resetTimeout);
		}
	}, [textIndex, message]);

	// Animation styles
	const pulseStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		};
	});

	const rotationStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${rotation.value}deg` }],
		};
	});

	// Main color
	const mainColor = "#ff6633";

	return (
		<View
			style={tw`absolute inset-0 bg-black bg-opacity-70 items-center justify-center z-50`}
		>
			<LinearGradient
				colors={[`${mainColor}90`, `${mainColor}20`]}
				style={tw`p-8 rounded-2xl items-center shadow-lg`}
			>
				{/* Pulse animation container */}
				<Animated.View style={[pulseStyle]}>
					{/* Rotation animation for loader */}
					<Animated.View style={[rotationStyle]}>
						<View
							style={{
								width: 48,
								height: 48,
								borderRadius: 24,
								borderWidth: 3,
								borderColor: "#ffffff",
								borderTopColor: mainColor,
								borderRightColor: "rgba(255, 255, 255, 0.3)",
							}}
						/>
					</Animated.View>
				</Animated.View>

				{/* Typing animation text */}
				<View style={tw`h-6 mt-4 justify-center`}>
					<Text style={tw`text-white font-semibold text-base`}>
						{displayText}
						<Text style={tw`opacity-75`}>|</Text>
					</Text>
				</View>
			</LinearGradient>
		</View>
	);
};

export default PageLoader;
